function changeCase(str, targetCase) {
  if (str === "") return "";

  if (!["camel", "snake", "kebab"].includes(targetCase)) {
    return undefined;
  }

  const hasUnderscore = str.includes('_');
  const hasHyphen = str.includes('-');
  const hasUpperCase = /[A-Z]/.test(str);

  if (hasUnderscore && hasHyphen) {
    return undefined;
  }

  if (hasUpperCase && (hasUnderscore || hasHyphen)) {
    return undefined;
  }

  let words = [];
  
  if (hasUnderscore) {
    words = str.split('_');
  } else if (hasHyphen) {
    words = str.split('-');
  } else {
    words = str.split(/(?=[A-Z])/).filter(word => word.length > 0);
  }

  words = words.map(word => word.toLowerCase());

  switch (targetCase) {
    case "camel":
      return words[0] + words.slice(1).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join('');
    
    case "snake":
      return words.join('_');
    
    case "kebab":
      return words.join('-');
    
    default:
      return undefined;
  }
}

console.log(changeCase("snakeCase", "snake"));
console.log(changeCase("some-lisp-name", "camel"));
console.log(changeCase("map_to_all", "kebab")); 
console.log(changeCase("valid-input", "huh???")); 
console.log(changeCase("", "camel"));
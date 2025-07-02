/* A simple substitution cipher replaces one character from an alphabet with a character from 
an alternate alphabet, where each character's position in an alphabet is mapped to the 
alternate alphabet for encoding or decoding.

E.g.

var abc1 = "abcdefghijklmnopqrstuvwxyz";
var abc2 = "etaoinshrdlucmfwypvbgkjqxz";
   
var sub = new SubstitutionCipher(abc1, abc2);
sub.encode("abc") // => "eta"
sub.encode("xyz") // => "qxz"
sub.encode("aeiou") // => "eirfg"
   
sub.decode("eta") // => "abc"
sub.decode("qxz") // => "xyz"
sub.decode("eirfg") // => "aeiou"
If a character provided is not in the opposing alphabet, simply leave it as be. */

class SubstitutionCipher {
  constructor (str1, str2) {
    this.str1 = str1;
    this.str2 = str2;
  }
  decode(string) {
    const res = [];
    for (let i = 0; i < string.length; i++) {
      const index = this.str2.indexOf(string[i]);
      if (index !== -1) res.push(this.str1[index]);
      else res.push(string[i]);
    }
    return res.join('');
  } 
  encode(string) {
    const res = [];
    for (let i = 0; i < string.length; i++) {
      const index = this.str1.indexOf(string[i]);
      if (index !== -1) res.push(this.str2[index]);
      else res.push(string[i]);
    }
    return res.join('');
  } 
}

const str1 = "abcdefghijklmnopqrstuvwxyz";
const str2 = "etaoinshrdlucmfwypvbgkjqxz";

const sub = new SubstitutionCipher(str1, str2);

console.log(sub.encode('eta'));
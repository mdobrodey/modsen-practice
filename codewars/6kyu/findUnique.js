/* There is an array with some numbers. All numbers are equal except for one. Try to find it!

findUniq([ 1, 1, 1, 2, 1, 1 ]) === 2
findUniq([ 0, 0, 0.55, 0, 0 ]) === 0.55
It’s guaranteed that array contains at least 3 numbers.

The tests contain some very huge arrays, so think about performance.
 */


const findUniq = (arr) => {
  if (arr[0] === arr[1]) {
/*  arr.forEach(el => {
      if (el !== arr[0]) return el; // вспомнил, что forEach не возвращает значение 
    }); */
    for (let el of arr) {
      if (el !== arr[0]) return el;
    }
  }
  return arr[0] === arr[2] ? arr[1] : arr[0];
}

console.log(findUniq([1, 1, 0]));
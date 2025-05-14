// mergeSort.js

export function mergeSort(arr) {
  let n = arr.length;
  if (n === 1 || n === 0) {
    return arr;
  }

  const midPoint = Math.floor(n / 2);
  const leftSide = mergeSort(arr.slice(0, midPoint));

  const rightSide = mergeSort(arr.slice(midPoint, n));
  let sortedArr = [];
  let i = 0;
  let j = 0;

  while (sortedArr.length !== arr.length) {
    if (leftSide[i] < rightSide[j] || rightSide[j] === undefined) {
      sortedArr.push(leftSide[i]);
      i++;
    } else {
      sortedArr.push(rightSide[j]);
      j++;
    }
  }

  return sortedArr;
}

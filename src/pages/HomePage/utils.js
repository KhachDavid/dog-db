export function dogsCached(nextDogs) {
  return typeof nextDogs === "string";
}

export function arraysAreEqual(array1, array2) {
  // Check if the arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Check if the elements of each array are equal
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  // The arrays are equal
  return true;
}

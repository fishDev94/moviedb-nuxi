/**
 * Compares two numbers to check if they are equal.
 *
 * This function is commonly used to compare an index with an ID,
 * for example in filters like .filter((item) => !useNumberEquality(removeById.id, item.id)).
 *
 * @param {number} idx - The first number to compare.
 * @param {number} actualIdx - The second number to compare.
 * @returns {boolean} Returns 'true' if the two numbers are equal, otherwise returns 'false'.
 */
export const useNumberEquality = (idx: number, actualIdx: number): boolean => {
    return actualIdx === idx;
  };
  
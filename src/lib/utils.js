export const filterObjectArray = (arr, filterArr, attr) => (
  arr.filter(elem => !filterArr.find(filter => elem?.[attr] === filter?.[attr]))
);
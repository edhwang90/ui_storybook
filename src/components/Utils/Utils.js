export const filterObjectArray = (arr, filterArr, attr) => (
  arr.filter(elem => !filterArr.find(filter => elem?.[attr] === filter?.[attr]))
);

export const generateNumber = () => Math.floor(Math.random()*10000);

export const partial = (fn, ...args) => fn.bind(null, ...args);

const _pipe = (fn, gn) => (...args) => gn(fn(...args)); 

export const pipe = (...fns) => fns.reduce(_pipe);
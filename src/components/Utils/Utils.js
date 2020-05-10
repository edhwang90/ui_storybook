export const filterObjectArray = (arr, filterArr, attr) => (
  arr.filter(elem => !filterArr?.find(filter => elem?.[attr] === filter?.[attr]))
);

export const generateNumber = () => Math.floor(Math.random()*10000);

export const partial = (fn, ...args) => fn.bind(null, ...args);

const _pipe = (fn, gn) => (...args) => gn(fn(...args)); 

export const pipe = (...fns) => fns.reduce(_pipe);

export const traverseNodes = (evt, el, nodeType, endFn) => {
  const allOptions = el.current.querySelectorAll(nodeType);
  const list = [].slice.call(allOptions)
  const selected = list.findIndex(x => x === evt.target);

  // key: down
  if (evt.keyCode === 40 || evt.keyCode === 32) {
    evt.preventDefault();
    evt.stopPropagation();
    const next = selected >= list.length - 1 ? 0 : selected + 1
    list[next].focus();
  }
  // key: up
  else if (evt.keyCode === 38) {
    evt.preventDefault();
    evt.stopPropagation();
    const previous = selected <= 0 ? list.length - 1 : selected - 1
    list[previous].focus();
  }

  // if tab out
  if (endFn) {
    evt.target.addEventListener('blur', e => {
      if (e.relatedTarget?.nodeName !== nodeType.toUpperCase()) {
        e.preventDefault();
        endFn();
      }
    });
  }
}

export const traverseTable = (evt, el) => {
  const tds = el.current.querySelectorAll('td');
  // skip empties
  const clickable = [].slice.call(tds).filter(el => el.textContent.length > 0);
  const selected = clickable.findIndex(d => d === evt.target);

  // key: down
  if (evt.keyCode === 40 || evt.keyCode === 39) {
    evt.preventDefault();
    evt.stopPropagation();
  
    const next = selected >= clickable.length - 1 ? 0 : selected + 1
    clickable[next].focus();
  }
  // key: up
  else if (evt.keyCode === 38 || evt.keyCode === 37) {
    evt.preventDefault();
    evt.stopPropagation();
    const previous = selected <= 0 ? clickable.length - 1 : selected - 1
    clickable[previous].focus();
  }
}


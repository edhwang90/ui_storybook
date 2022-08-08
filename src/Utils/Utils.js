import { disableWorkerMessageHandler } from 'prismjs';
import React from 'react';
import { useEffect, createRef } from "react";

export const checkObjEq = (obj1, obj2) => {
  return JSON.stringify(obj1).split('').sort().toString() === JSON.stringify(obj2).split('').sort().toString();
};

export const filterObjectArray = (arr, filterObj) => {

  const filtered = arr.filter(obj => !checkObjEq(obj, filterObj));
  return filtered;
};

export const generateNumber = () => Math.floor(Math.random()*10000);

export const partial = (fn, ...args) => fn.bind(null, ...args);

const _pipe = (fn, gn) => (...args) => gn(fn(...args)); 

export const pipe = (...fns) => fns.reduce(_pipe);

export const getKeyCode = (key) => {
    switch (key) {
      case 'down':
        return 40;
      case 'up':
        return 38;
      case 'right':
        return 39;
      case 'left':
        return 37;
      case 'space':
        return 32;
      case 'tab':
        return 9;
      case 'escape':
        return 27;
      case 'enter':
        return 13;
    }
    
}

export const traverseNodes = (evt, el, nodeType, endFn, isHorizontal) => {
  const allOptions = el.current.querySelectorAll(nodeType);
  const list = [].slice.call(allOptions)

  const selected = list.findIndex(x => x === evt.target);
  let forward;
  let backward;
  
  if (!isHorizontal) {
    forward = evt.keyCode === 40; // down
    backward = evt.keyCode === 38; // up
  }
  else {
    forward = evt.keyCode === 39; // right
    backward = evt.keyCode === 37; // left;
  }

  // to next
  if (forward && selected >= 0) {
    evt.preventDefault();
    evt.stopPropagation();
    const next = selected >= list.length - 1 ? 0 : selected + 1
    if (next >= 0) list[next].focus();
  }
  // to previous
  else if (backward && selected >= 0) {
    evt.preventDefault();
    evt.stopPropagation();
    const previous = selected <= 0 ? list.length - 1 : selected - 1
    if (previous >= 0) list[previous].focus();
  }
  else if (evt.keyCode === 9) {
    if (endFn) {
      evt.preventDefault();
      endFn();
    }
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

export const OutsideClickHandler = (props) => {
  const { children, onOutsideClick } = props;
  const wrapperRef = createRef();

  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (wrapperRef.current && !wrapperRef.current.contains(evt.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    const cleanup = () => { document.removeEventListener("mousedown", handleClickOutside); }
    
    return  cleanup;
  }, []);

  return (
    <div ref={wrapperRef}>{children}</div>
  )
}


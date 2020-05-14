import React from 'react';

export const useSearch = () => {
  const search = (list, filter) => {
    return list
      .filter(option => {
        if (typeof option === 'object' && option !== null) {
          let match = false;
          for (let attr in option) {
            if (option[attr].toString().toLowerCase().startsWith(filter)) match = true;
          }
          if (match) return option;
        }
        else {
          return option.toLowerCase().startsWith(filter);
        }
      })
  }

  return {
    search
  };
}
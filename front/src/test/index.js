import pkg from 'lodash';

const { isEqual, uniq } = pkg;

const getUpdatedKeys = (oldData, newData) => {
  const data = uniq([...Object.keys(oldData), ...Object.keys(newData)]);
  const keys = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key of data) {
    if (!isEqual(oldData[key], newData[key])) {
      keys.push(key);
    }
  }
  return keys;
};

const oldObj = {
  first: 'John',
  middle: 'Montgomery',
  last: 'Smith',
};

const newObj = {
  first: 'Cédric',
  middle: 'Montgomery',
  last: 'Smith',
};

const test = getUpdatedKeys(oldObj, newObj);

console.log(test);

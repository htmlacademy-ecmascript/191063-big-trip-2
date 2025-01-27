function getRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(array.length)];
}

export {getRandomInteger, getRandomArrayElement};

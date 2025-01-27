import dayjs from 'dayjs';

const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * HOURS_IN_DAY;

function getRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

function getRandomArrayElement(array) {
  return array[getRandomInteger(array.length)];
}

function getDay(date) {
  return dayjs(date).format('MMM DD');
}

function getTime(date) {
  return dayjs(date).format('HH:mm');
}

function getEventDuration(earlierDate, laterDate) {
  const totalDifferenceInMinutes = dayjs(laterDate).diff(dayjs(earlierDate), 'minute');

  const differenceInMinutes = `${(totalDifferenceInMinutes % MINUTES_IN_HOUR).toString().padStart(2, '0')}M`;
  const differenceInHours = `${((Math.floor(totalDifferenceInMinutes / MINUTES_IN_HOUR)) % HOURS_IN_DAY).toString().padStart(2, '0')}H`;
  const differenceInDays = `${(Math.floor(totalDifferenceInMinutes / MINUTES_IN_DAY)).toString().padStart(2, '0')}D`;

  if (totalDifferenceInMinutes < MINUTES_IN_HOUR) {
    return differenceInMinutes;
  } else if (totalDifferenceInMinutes < MINUTES_IN_DAY) {
    return `${differenceInHours} ${differenceInMinutes}`;
  } else {
    return `${differenceInDays} ${differenceInHours} ${differenceInMinutes}`;
  }
}

export {
  getRandomInteger,
  getRandomArrayElement,
  getDay,
  getTime,
  getEventDuration
};

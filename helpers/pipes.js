import {date} from 'yup';

const showFormatDate = (date = new Date()) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  return date.toLocaleDateString('es-ES', options);
};

const showFormatMonth = (date = new Date()) => {
  const options = {
    weekday: 'long',
  };
  return date.toLocaleDateString('es-ES', options);
};

const comparateDates = (date1 = new Date(), date2 = new Date()) => {
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  return date1.getTime() == date2.getTime();
};

export {showFormatDate, showFormatMonth, comparateDates};

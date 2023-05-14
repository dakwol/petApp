import {translate} from './translate';

const dateLocale = 'ru-RU';

export const datetimeConvert = (MMDD: string) => {
  const monthDay = new Date(MMDD);
  const months = [
    translate('months.jan'),
    translate('months.feb'),
    translate('months.mar'),
    translate('months.apr'),
    translate('months.may'),
    translate('months.jun'),
    translate('months.jul'),
    translate('months.aug'),
    translate('months.sep'),
    translate('months.oct'),
    translate('months.nov'),
    translate('months.dec'),
  ];
  let strDate = '';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date();
  yesterday.setHours(0, 0, 0, 0);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (today.toLocaleDateString() == monthDay.toLocaleDateString(dateLocale)) {
    strDate = translate('days.today');
  } else if (yesterday.toLocaleDateString() == monthDay.toLocaleDateString(dateLocale)) {
    strDate = translate('days.yesterday');
  } else if (tomorrow.toLocaleDateString() == monthDay.toLocaleDateString(dateLocale)) {
    strDate = translate('days.tomorrow');
  } else {
    strDate = months[monthDay.getMonth()] + '-' + monthDay.getDate();
  }
  return strDate;
};

export const getTimeFromDate = (date: string) => {
  return new Date(date).toLocaleTimeString(dateLocale, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getFullDate = (date: string) => {
  return new Date(date).toLocaleDateString(dateLocale, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

export const getFullDateTime = (date: string) => {
  return new Date(date).toLocaleTimeString(dateLocale, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: '2-digit',
    minute: '2-digit',
  });
};

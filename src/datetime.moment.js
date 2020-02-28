import moment from 'moment'

/**
 * @param {Date} date 
 * @param {number} days 
 * @returns {Date}
 */
export function addDaysToDate(date, days) {
  return moment(date).add(days, 'days').toDate();
}

/**
 * @param {Date} date 
 * @param {number} slotMinutes 
 * @returns {string}
 */
export function incrementSlotTime(date, slotMinutes) {
  return moment(date).add(slotMinutes, 'minutes').format('H:mm')
}

/**
 * @param {Date} date 
 * @returns {number}
 */
export function getDayOfWeek(date) {
  return moment(date).day()
}

export default { addDaysToDate, incrementSlotTime, getDayOfWeek }
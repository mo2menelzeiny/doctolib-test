/**
 * @param {Date} date 
 * @param {number} days 
 * @returns {Date}
 */
export function addDaysToDate(date, days) {
    return new Date(date.valueOf() + 864E5 * days)
}

/**
 * @param {Date} date 
 * @param {number} slotMinutes 
 * @returns {string}
 */
export function incrementSlotTime(date, slotMinutes) {
    const newDate = new Date(date.valueOf() + (slotMinutes * 60 * 1000))
    const h = newDate.getHours()
    const m = (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes()
    return h + ':' + m
}

/**
 * @param {Date} date 
 * @returns {number}
 */
export function getDayOfWeek(date) {
    return date.getDay()
}

export default { addDaysToDate, incrementSlotTime, getDayOfWeek }
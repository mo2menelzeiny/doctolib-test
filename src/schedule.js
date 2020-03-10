/**
 * @typedef {Object} EventDTO 
 * @property {number} id  
 * @property {string} kind
 * @property {number} starts_at
 * @property {number} ends_at
 * @property {number} weekly_recurring
 */

/**
 * @typedef {Object} Event
 * @property {number} id  
 * @property {string} kind
 * @property {number} starts_at
 * @property {number} ends_at
 * @property {number} weekly_recurring
 * @property {number} dayOfWeek
 * @property {string[]} slots
 */

/**
* @typedef Day
* @property {Date} date
* @property {number} dayOfWeek
*/

/**
* @typedef {Object} Availability 
* @property {Date} date  
* @property {string[]} slots
*/

/**
 * @param {Day[]} days 
 * @param {Event[]} events 
 * @returns {Availability[]}
 */
export function build(days, events) {
    const recurrings = events.filter(event => event.weekly_recurring === 1)
    const singels = events.filter(event => event.weekly_recurring === 0)
    const appointments = events.filter(event => event.kind === 'appointment')

    return days.map(day => {
        const recurringSlots = [].concat(...recurrings
            .filter(recurring => recurring.dayOfWeek === day.dayOfWeek)
            .map(recurring => recurring.slots))

        const singleSlots = [].concat(...singels
            .filter(single => new Date(single.starts_at).toDateString() === day.date.toDateString())
            .map(single => single.slots))

        const appointmentSlots = [].concat(...appointments
            .filter(appointment => new Date(appointment.starts_at).toDateString() === day.date.toDateString())
            .map(appointment => appointment.slots))

        const slots = [].concat(singleSlots, recurringSlots)
            .filter(slot => !appointmentSlots.includes(slot))
            .sort(compareSlots)

        return { date: day.date, slots: slots }
    })
}

/**
 * @param {Date} date 
 * @param {numer} daysCount 
 * @param {function(Date, number) => Date} addDaysToDateFn 
 * @param {function(Date) => number} getDayOfWeekFn
 * @returns {Day[]}
 */
export function daysFromDate(date, daysCount, addDaysToDateFn, getDayOfWeekFn) {
    return new Array(daysCount).fill(0).map((_, index) => {
        const newDate = addDaysToDateFn(date, index)
        return {
            date: newDate,
            dayOfWeek: getDayOfWeekFn(newDate)
        }
    })
}

/**
 * @param {Events[]} events 
 * @param {number} slotMinutes 
 * @param {function(number, number) => string[]} addSlotTimeFn 
 * @param {function(Date) => number} getDayOfWeekFn
 * @returns {Event[]}
 */
export function generateSlots(events, slotMinutes, addSlotTimeFn, getDayOfWeekFn) {
    return events.map(value => {
        value.slots = calculateSlots(value.starts_at, value.ends_at, slotMinutes, addSlotTimeFn)
        value.dayOfWeek = getDayOfWeekFn(new Date(value.starts_at))
        return value
    })
}

/**
 * @param {number} startMs 
 * @param {number} endMs 
 * @param {number} slotMinutes 
 * @param {function(number, number) => string[]} addSlotTimeFn
 * @returns {string[]}
 */
export function calculateSlots(startMs, endMs, slotMinutes, addSlotTimeFn) {
    return new Array((Math.abs(endMs - startMs) / 1000 / 60 / 60) * 2).fill(0).map((_, index) => {
        return addSlotTimeFn(startMs, slotMinutes * index)
    })
}

/**
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
export function compareSlots(a, b) {
    const as = a.split(':')
    const bs = b.split(':')
    return parseInt(as[0] + as[1]) - parseInt(bs[0] + bs[1])
}

export default { build, daysFromDate, generateSlots, calculateSlots, compareSlots }
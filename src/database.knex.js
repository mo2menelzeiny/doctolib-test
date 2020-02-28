import knex from 'knexClient'

/**
 * @typedef {Object} EventDTO 
 * @property {number} id  
 * @property {string} kind
 * @property {number} starts_at
 * @property {number} ends_at
 * @property {number} weekly_recurring
 */

/**
 * @param {Date} start 
 * @param {Date} end 
 * @returns {Promise<EventDTO[]>} 
 */
export function getEventsWithinRangeAndRecurrings(start, end) {
    return knex('events').select()
        .whereBetween('starts_at', [start, end])
        .orWhere('weekly_recurring', true)
}

export default { getEvents: getEventsWithinRangeAndRecurrings }
import moment from 'moment'
import knex from 'knexClient'

import schedule from './schedule'
import database from './database.knex'
import datetime from './datetime.vanilla'

export default async function getAvailabilities(date) {
  const days = schedule.daysFromDate(date, 7, datetime.addDaysToDate, datetime.getDayOfWeek)
  const eventDtos = await database.getEvents(date, days[6].date)
  const events = schedule.generateSlots(eventDtos, 30, datetime.incrementSlotTime, datetime.getDayOfWeek)
  return schedule.build(days, events)
}

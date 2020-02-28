import knex from 'knexClient'
import { getEventsWithinRangeAndRecurrings } from './database.knex'

describe('Database', () => {
    beforeEach(() => knex('events').truncate())

    beforeEach(async () => {
        await knex('events').insert([
            {
                kind: 'opening',
                starts_at: new Date('2014-08-04 09:30'),
                ends_at: new Date('2014-08-04 12:30'),
                weekly_recurring: true,
            },
            {
                kind: 'appointment',
                starts_at: new Date('2014-08-11 10:30'),
                ends_at: new Date('2014-08-11 11:30'),
            },
            {
                kind: 'opening',
                starts_at: new Date('2014-08-20 02:30'),
                ends_at: new Date('2014-08-20 03:30'),
                weekly_recurring: false,
            },
            {
                kind: 'appointment',
                starts_at: new Date('2014-08-20 10:30'),
                ends_at: new Date('2014-08-20 08:00'),
            }
        ])
    })

    describe('getEventsWithinRangeAndRecurrings', () => {
        it('should return 1 opening within dates', async () => {
            const results = await getEventsWithinRangeAndRecurrings(
                new Date('2014-08-20 02:30'),
                new Date('2014-08-21')
            )
            expect(results.length).toBe(3)
        })

        it('should have 1 recuring opening', async () => {
            const results = await getEventsWithinRangeAndRecurrings(
                new Date('2014-08-20 02:30'),
                new Date('2014-08-21')
            )
            expect(results[0].kind).toBe('opening')
            expect(results[0].weekly_recurring).toBe(1)
        })

        it('should have 1 opening', async () => {
            const results = await getEventsWithinRangeAndRecurrings(
                new Date('2014-08-20 02:30'),
                new Date('2014-08-21')
            )
            expect(results[1].kind).toBe('opening')
            expect(results[1].weekly_recurring).toBe(0)
        })

        it('should have 1 appointment', async () => {
            const results = await getEventsWithinRangeAndRecurrings(
                new Date('2014-08-20 02:30'),
                new Date('2014-08-21')
            )
            expect(results[2].kind).toBe('appointment')
        })
    })
})
import datetime from './datetime.vanilla'
import {
    build,
    daysFromDate,
    generateSlots,
    calculateSlots,
    compareSlots
} from './schedule'

describe('Schedule', () => {
    describe('build', () => {
        const days = [
            { date: new Date('2014-08-01'), dayOfWeek: 5 },
            { date: new Date('2014-08-02'), dayOfWeek: 6 },
            { date: new Date('2014-08-03'), dayOfWeek: 0 },
            { date: new Date('2014-08-04'), dayOfWeek: 1 },
            { date: new Date('2014-08-05'), dayOfWeek: 2 },
            { date: new Date('2014-08-06'), dayOfWeek: 3 },
            { date: new Date('2014-08-07'), dayOfWeek: 4 }
        ]

        const events = [{
            kind: 'opening',
            starts_at: new Date('2014-08-04 03:30').valueOf(),
            ends_at: new Date('2014-08-04 04:30').valueOf(),
            weekly_recurring: 0,
            slots: ['3:30', '4:00'],
            dayOfWeek: 1
        },
        {
            kind: 'opening',
            starts_at: new Date('2014-08-04 02:30').valueOf(),
            ends_at: new Date('2014-08-04 03:30').valueOf(),
            weekly_recurring: 1,
            slots: ['2:30', '3:00'],
            dayOfWeek: 1
        },
        {
            kind: 'opening',
            starts_at: new Date('2014-08-04 09:30').valueOf(),
            ends_at: new Date('2014-08-04 12:30').valueOf(),
            weekly_recurring: 1,
            slots: ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00'],
            dayOfWeek: 1
        },
        {
            kind: 'appointment',
            starts_at: new Date('2014-08-04 10:30').valueOf(),
            ends_at: new Date('2014-08-04 11:30').valueOf(),
            weekly_recurring: null,
            slots: ['10:30', '11:00'],
            dayOfWeek: 1
        },
        {
            kind: 'opening',
            starts_at: new Date('2014-08-05 09:30').valueOf(),
            ends_at: new Date('2014-08-05 12:30').valueOf(),
            weekly_recurring: 1,
            slots: ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00'],
            dayOfWeek: 2
        },
        {
            kind: 'opening',
            starts_at: new Date('2014-08-07 05:00').valueOf(),
            ends_at: new Date('2014-08-07 06:30').valueOf(),
            weekly_recurring: 0,
            slots: ['5:00', '5:30', '6:00'],
            dayOfWeek: 4
        },
        {
            kind: 'appointment',
            starts_at: new Date('2014-08-06 10:30').valueOf(),
            ends_at: new Date('2014-08-06 11:30').valueOf(),
            weekly_recurring: null,
            slots: ['10:30', '11:00'],
            dayOfWeek: 3
        }]

        it('should return 7 entires', () => {
            let results = build(days, events)
            expect(results.length).toBe(7)
        })

        it('should have recurring openings slots', () => {
            let results = build(days, events)
            expect(results[3].slots.includes('9:30')).toBeTruthy()
            expect(results[3].slots.includes('10:00')).toBeTruthy()
            expect(results[3].slots.includes('11:30')).toBeTruthy()
            expect(results[3].slots.includes('12:00')).toBeTruthy()
        })

        it('should allow multiple recurring slots on the same day', () => {
            let results = build(days, events)
            expect(results[3].slots.includes('2:30')).toBeTruthy()
            expect(results[3].slots.includes('3:00')).toBeTruthy()
        })

        it('should remove appointment slots from openning slots', () => {
            let results = build(days, events)
            expect(results[3].slots.includes('10:30')).toBeFalsy()
            expect(results[3].slots.includes('11:00')).toBeFalsy()
        })

        it('should have single openings on the same day', () => {
            let results = build(days, events)
            expect(results[3].slots.includes('3:30')).toBeTruthy()
            expect(results[3].slots.includes('4:00')).toBeTruthy()
        })
    })

    describe('daysFromDate', () => {
        it('should list first day', () => {
            const days = daysFromDate(new Date('2014-08-10'), 2, datetime.addDaysToDate, datetime.getDayOfWeek)
            expect(String(days[0].date)).toBe(String(new Date('2014-08-10')))
        })

        it('should list last day', () => {
            const days = daysFromDate(new Date('2014-08-10'), 2, datetime.addDaysToDate, datetime.getDayOfWeek)
            expect(String(days[1].date)).toBe(String(new Date('2014-08-11')))
        })

        it('should list day of week', () => {
            const days = daysFromDate(new Date('2014-08-10'), 2, datetime.addDaysToDate, datetime.getDayOfWeek)
            expect(days[1].dayOfWeek).toBe(1)
        })
    })

    describe('calculateSlots', () => {
        const result = calculateSlots(
            new Date('2014-08-04 09:30'),
            new Date('2014-08-04 12:30'),
            30, datetime.incrementSlotTime
        )
        expect(result).toEqual([
            '9:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00'
        ])
    })

    describe('generateSlots', () => {
        const events = [{
            kind: 'opening',
            starts_at: new Date('2014-08-04 09:30').valueOf(),
            ends_at: new Date('2014-08-04 12:30').valueOf(),
            weekly_recurring: 1
        },
        {
            kind: 'opening',
            starts_at: new Date('2014-08-05 09:30').valueOf(),
            ends_at: new Date('2014-08-05 12:30').valueOf(),
            weekly_recurring: 1
        },
        {
            kind: 'appointment',
            starts_at: new Date('2014-08-11 10:30').valueOf(),
            ends_at: new Date('2014-08-11 11:30').valueOf(),
        }]

        it('should return 3 items', () => {
            let results = generateSlots(events, 30, datetime.incrementSlotTime, datetime.getDayOfWeek)
            expect(results.length).toBe(3)
        })

        it('should return correct day of week', () => {
            let results = generateSlots(events, 30, datetime.incrementSlotTime, datetime.getDayOfWeek)
            expect(results[0].dayOfWeek).toBe(1)
        })

        it('should return correct slots', () => {
            let results = generateSlots(events, 30, datetime.incrementSlotTime, datetime.getDayOfWeek)
            expect(results[0].slots).toEqual([
                '9:30',
                '10:00',
                '10:30',
                '11:00',
                '11:30',
                '12:00'
            ])
        })
    })

    describe('compareSlots', () => {
        it('should return a value greater than 0', () => {
            expect(compareSlots('3:30', '3:00')).toBeGreaterThan(0)
        })

        it('should return a value less than 0', () => {
            expect(compareSlots('3:00', '3:30')).toBeLessThan(0)
        })
    })
})
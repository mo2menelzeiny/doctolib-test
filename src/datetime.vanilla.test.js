import {
    addDaysToDate,
    incrementSlotTime,
    getDayOfWeek
} from "./datetime.vanilla"

describe('Datetime Vanilla', () => {
    describe('addDaysToDate', () => {
        it('should add one day only', () => {
            expect(String(addDaysToDate(new Date('2014-08-10'), 1)))
                .toBe((String(new Date('2014-08-11'))))
        })

        it('should increment month if last day', () => {
            expect(String(addDaysToDate(new Date('2014-09-30'), 1)))
                .toBe((String(new Date('2014-10-01'))))
        })
    })

    describe('incrementSlotTime', () => {
        it('should return correct time after increment', () => {
            const result = incrementSlotTime(new Date('2014-08-04 09:30'), 30)
            expect(result).toBe('10:00')
        })

        it('should reset after midnight case', () => {
            const result = incrementSlotTime(new Date('2014-08-04 23:30'), 30)
            expect(result).toBe('0:00')
        })
    })

    describe('getDayOfWeek', () => {
        it('should return correct day number', () => {
            expect(getDayOfWeek(new Date('2014-08-10'))).toBe(0)
        })
    })

    describe('getDayOfWeek', () => {
        it('should return correct day number', () => {
            expect(getDayOfWeek(new Date('2014-08-10'))).toBe(0)
        })
    })
})
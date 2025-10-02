import moment from 'moment'

export const countDays = () => {
    let now = moment()
    const month = now.month()
    let daysToWork = 0;
    while (month === now.month()) {
        if (now.weekday() <= 5 && now.weekday() > 0) {
            daysToWork++;
        }
        now = now.add(1, 'day')
    }
    return daysToWork
}

export const countWorkdays = () => {
    let current = moment().startOf('month')
    const month = current.month()
    let daysToWork = 0
    while(month === current.month()) {
        if (current.weekday() <= 5 && current.weekday() > 0) {
            daysToWork++;
        }
        current = current.add(1, 'day')
    }
    return daysToWork
}

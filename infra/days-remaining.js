import moment from 'moment'

export const countDays = () => {
    let now = moment()
    const month = now.month()
    let daysToWork = 0;
    now = now.add(1, 'day')
    while (month === now.month()) {
        if (now.weekday() < 5) {
            daysToWork++;
        }
        now = now.add(1, 'day')
    }
    return daysToWork
}


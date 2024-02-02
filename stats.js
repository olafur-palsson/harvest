import { countDays, countWorkdays } from './infra/days-remaining.js'
import { calculateHours } from './infra/hours-remaining.js'
import moment from 'moment'

const hoursWorkedToday = () => {
  const date = process.argv[2]
  const time = process.argv[3]
  const datetime = `${date}T${time}`
  const jsdate = new Date(datetime)
  const diff = moment().diff(moment(jsdate))
  const MINUTE_IN_MS = 60 * 1000
  const HOUR_IN_MS = 60 * MINUTE_IN_MS
  return diff / HOUR_IN_MS
}

const main = async () => {
    const hours = await calculateHours()
    const daysLeft = countDays()
    const hoursWorked = await hoursWorkedToday()
    const hoursPerDayRemaining = (hours + hoursWorked) / (daysLeft)
    const workDays = countWorkdays()

    const hPerDayRemaining = Math.floor(hoursPerDayRemaining).toFixed(0)
    const mPerDayRemaining = ((hoursPerDayRemaining - Math.floor(hoursPerDayRemaining)) * 60).toFixed(0)

    const hToday = Math.floor(hoursWorked).toFixed(0)
    const mToday = ((hoursWorked - Math.floor(hoursWorked)) * 60).toFixed(0)

    console.log(`DAY: ${workDays - daysLeft}/${workDays}`)
    console.log(`PAR: ${hPerDayRemaining}:${mPerDayRemaining.padStart(2, '0')}`)
    console.log(`NOW: ${hToday}:${mToday.padStart(2, '0')}`)
    console.log('')
    let surplus = hoursWorked - hoursPerDayRemaining 
    let status = 'Unknown'
    if (surplus < -1.25) {
        status = 'Behind'
    } else if (surplus < -0.75) {
        status = 'Eagle+'
    } else if (surplus < -0.25) {
        status = 'Eagle'
    } else if (surplus < 0.5) {
        status = 'Par'
    } else if (surplus < 1) {
        status = 'Birdie'
    } else if (surplus < 1.5) {
        status = 'Birdie+'
    } else {
        status = 'Ahead'
    }
    console.log(`Status: ${status}`)
}

main()
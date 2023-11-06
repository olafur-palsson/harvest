import { countDays } from './infra/days-remaining.js'
import { calculateHours } from './infra/hours-remaining.js'
import moment from 'moment'

const getHoursWorked = () => {
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
    const hoursPerDayRemaining = hours / countDays()
    const hoursWorked = await getHoursWorked()

    console.log(`PAR: ${hoursPerDayRemaining.toFixed(2)}`)
    console.log(`NOW: ${hoursWorked.toFixed(2)}`)
    console.log('')
    const surplus = hoursWorked - hoursPerDayRemaining
    let status = 'Unknown'
    if (surplus < -1) {
        status = 'Behind'
    } else if (surplus < 0) {
        status = 'Eagle'
    } else if (surplus < 1) {
        status = 'Par'
    } else if (surplus < 2) {
        status = 'Birdie'
    } else {
        status = 'Ahead'
    }
    console.log(`Status: ${status}`)
}

main()
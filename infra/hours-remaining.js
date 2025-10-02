import moment from 'moment'
import { Harvest } from '../infra/harvest-api.js'



const date = process.argv[2]
const time = process.argv[3]
const datetime = `${date}T${time}`
const jsdate = new Date(datetime)
const diff = moment().diff(moment(jsdate))
const MINUTE_IN_MS = 60 * 1000
const HOUR_IN_MS = 60 * MINUTE_IN_MS
const hours = diff / HOUR_IN_MS

export const hoursLogged = async () => {
  const now = moment()
  const start = now.startOf('month').format('YYYY-MM-DD')
  const end = now.startOf('month').add(1, 'month').format('YYYY-MM-DD')
  const harvest = new Harvest()
  const entries = await harvest.getEntries(start, end)
  // ignore this one { id: 37577431, name: 'B2B lausn uniconta', code: 'UniB2B' },

  const B2BLausn = 37577431
  let sum = 0
  entries.time_entries
    .filter(entry => entry.project.id != B2BLausn)
    .map(entry => entry.rounded_hours)
    .forEach(h => sum += h)
  // console.log('SUM', sum)
  // console.log('entries', entries)
  return sum
}


export const calculateHoursRemaining = async () => {
  const now = moment()
  const start = now.startOf('month').format('YYYY-MM-DD')
  const end = now.startOf('month').add(1, 'month').format('YYYY-MM-DD')
  const harvest = new Harvest()
  const entries = await harvest.getEntries(start, end)
  // ignore this one { id: 37577431, name: 'B2B lausn uniconta', code: 'UniB2B' },

  const B2BLausn = 37577431
  let sum = 0
  entries.time_entries
    .filter(entry => entry.project.id != B2BLausn)
    .map(entry => entry.rounded_hours)
    .forEach(h => sum += h)
  return 120 - hours - sum
}

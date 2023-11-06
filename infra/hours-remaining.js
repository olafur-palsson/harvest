import moment from 'moment'
import { Harvest } from '../infra/harvest-api.js'

const now = moment()


const date = process.argv[2]
const time = process.argv[3]
const datetime = `${date}T${time}`
const jsdate = new Date(datetime)
const diff = moment().diff(moment(jsdate))
const MINUTE_IN_MS = 60 * 1000
const HOUR_IN_MS = 60 * MINUTE_IN_MS
const hours = diff / HOUR_IN_MS

export const calculateHours = async () => {
  const start = now.startOf('month').format('YYYY-MM-DD')
  const end = now.startOf('month').add(1, 'month').format('YYYY-MM-DD')
  const harvest = new Harvest()
  const entries = await harvest.getEntries(start, end)
  let sum = 0
  entries.time_entries.map(entry => entry.rounded_hours).forEach(h => sum += h)
  return 120 - hours - sum
}

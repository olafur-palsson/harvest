import moment from 'moment'
import { Cubus as CUBUS } from './projects.js'
import { Harvest } from './infra/harvest-api.js'

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
  const harvest = new Harvest()
  const hours = getHoursWorked()
  await harvest.createEntry(CUBUS, hours)
}

main().catch(err => {
  console.error(err)
  if (err.response) {
    console.error(err.response)
  } else {
    console.error(err)
  }
  process.exit(1)
})

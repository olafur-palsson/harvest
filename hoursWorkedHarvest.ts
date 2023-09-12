import os from 'os'
import moment from 'moment'
import axios from 'axios'

const now = moment()


const PROJECT_ID = 8577980
const TASK_ID = 9275841
const USER_ID = 3965920
const auth = require(`${__dirname}/../../harvest.json`)
const date = process.argv[2]
const time = process.argv[3]
const datetime = `${date}T${time}`
const jsdate = new Date(datetime)
const diff = moment().diff(moment(jsdate))
const MINUTE_IN_MS = 60 * 1000
const HOUR_IN_MS = 60 * MINUTE_IN_MS
const hours = diff / HOUR_IN_MS

const getEntries = async (from: string, to: string) => {
    const result = await axios.request({
        url: `https://api.harvestapp.com/v2/time_entries?project_id=${PROJECT_ID}&from=${from}&to=${to}`,
        method: 'get',
        headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Harvest-Account-Id': auth.account_id,
            'User-Agent': 'MyApp (yourname@example.com)'
        }
    })
    return result.data;
}

const calculateHours = async () => {
  const start = now.startOf('month').format('YYYY-MM-DD')
  const end = now.startOf('month').add(1, 'month').format('YYYY-MM-DD')
  const entries: any = await getEntries(start, end)
  let sum = 0
  entries.time_entries.map(entry => entry.rounded_hours).forEach(h => sum += h)
  console.log((120 - hours - sum).toFixed(2));
}

calculateHours()

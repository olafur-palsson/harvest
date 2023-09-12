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

const PROJECTS = {
    tri: {
        PROJECT_ID: 25062015
    }
}

const createEntry = async () => {
    await axios.request({
        url: 'https://api.harvestapp.com/v2/time_entries',
        data: {
            project_id: PROJECT_ID,
            user_id: USER_ID,
            task_id: TASK_ID,
            spent_date: now.format('YYYY-MM-DD'),
            hours: `${hours}`,
            notes: 'Sjalfvirk skraning'
        },
        method: 'post',
        headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Harvest-Account-Id': auth.account_id,
            'User-Agent': 'MyApp (yourname@example.com)'
        }
    })
    console.log(`Successfully logged ${Math.floor(hours)} hours and ${Math.floor((hours % 1) * 60)} minutes.`)
}

createEntry().catch(err => {
  console.error(err)
  if (err.response) {
    console.error(err.response)
  } else {
    console.error(err)
  }
  process.exit(1)
})

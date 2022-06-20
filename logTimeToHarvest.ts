import os from 'os'
import moment from 'moment'
import axios from 'axios'

const now = moment()


const PROJECT_ID = 8577980
const TASK_ID = 9275841
const USER_ID = 3965920
const auth = require(`${__dirname}/../../harvest.json`)
const hours = parseInt(process.argv[2])
const minutes = parseInt(process.argv[3])

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
            hours: `${hours + minutes / 60}`,
            note: 'Sjalfvirk skraning'
        },
        method: 'post',
        headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Harvest-Account-Id': auth.account_id,
            'User-Agent': 'MyApp (yourname@example.com)'
        }
    })
    console.log(`Successfully logged ${hours} hours and ${minutes} minutes`)
}

createEntry().catch(err => process.exit(1))

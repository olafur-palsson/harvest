import moment from 'moment'
import axios from 'axios'
import { Project } from '../projects'
const auth = require(`${__dirname}/../../../harvest.json`)

export class Harvest {
  async createEntry (project: Project, hours: number) {
    const now = moment()
    await axios.request({
      url: 'https://api.harvestapp.com/v2/time_entries',
      data: {
        project_id: project.projectId,
        user_id: 3965920,
        task_id: project.taskId,
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
}

import moment from 'moment'
import axios from 'axios'
import auth from './../../../harvest.json' assert { type: 'json' }

export class Harvest {
  async createEntry (project, hours, message) {
    const now = moment()
    await axios.request({
      url: 'https://api.harvestapp.com/v2/time_entries',
      data: {
        project_id: project.projectId,
        user_id: 3965920,
        task_id: project.taskId,
        spent_date: now.format('YYYY-MM-DD'),
        hours: `${hours}`,
        notes: message
      },
      method: 'post',
      headers: {
        'Authorization': `Bearer ${auth.token}`,
        'Harvest-Account-Id': auth.account_id,
        'User-Agent': 'MyApp (yourname@example.com)'
      }
    })
    console.log(hours)
    console.log(`${project.name} Logged ${Math.floor(hours)} hours and ${Math.floor((hours % 1) * 60)} minutes.`)
  }
}

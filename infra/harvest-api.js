import moment from 'moment'
import axios from 'axios'
import auth from './../../../harvest.json' assert { type: 'json' }

export class Harvest {
  async getEntries (from, to) {

    const PROJECT_ID = 8577980
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

  async createEntry (project, hours, message = 'Sjalfvirk skraning') {
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
    console.log(`${project.name} Logged ${Math.floor(hours)} hours and ${Math.floor((hours % 1) * 60)} minutes.`)
  }
}

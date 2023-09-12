import axios from 'axios'
import { WakaResponse } from './types.ts'
import moment from 'moment'
import { PROJECTS } from '../projects.ts'
const auth = require(`${__dirname}/../../../harvest.json`)

export class WakaApi {
  async getProjectsWorked() {
    const result = await this.getData()
    const projects = result.data[0]?.projects || []
    console.log(projects)
    return projects.filter(project => PROJECTS.find(proj => proj.wakaIds.includes(project.name)))
  }

  async getData(): WakaResponse {
    const today = moment().format('YYYY-MM-DD')
    const url = `https://wakatime.com/api/v1/users/current/summaries?start=${today}&end=${today}&api_key=${auth.wakaApiKey}`
    const result = await axios.get(url)
    return result.data
  }
}

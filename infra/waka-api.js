import axios from 'axios'
import moment from 'moment'
import { PROJECTS } from '../projects.js'
import auth from './../../../harvest.json'

export class WakaApi {
  async getProjectsWorked() {
    const result = await this.getData()
    const projects = result.data[0]?.projects || []
    return projects.filter(project => PROJECTS.find(proj => proj.wakaIds.includes(project.name)))
  }

  async getData() {
    const today = moment().format('YYYY-MM-DD')
    const url = `https://wakatime.com/api/v1/users/current/summaries?start=${today}&end=${today}&api_key=${auth.wakaApiKey}`
    const result = await axios.get(url)
    return result.data
  }
}

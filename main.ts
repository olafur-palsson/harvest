import { WakaProject } from './infra/types.ts'

const prompts = require('prompts')
import { Harvest } from './infra/harvest-api'
import { WakaApi } from './infra/waka-api'
import { PROJECTS } from './projects.ts'


const harvest = new Harvest()
const waka = new WakaApi()

const result = await waka.getProjectsWorked()

console.log(result)

if (result.length) {
  const answer = await prompts([{
    type: 'multiselect',
    name: 'value',
    message: 'Veldu verkefni',
    choices: result.map(proj => {
      return {
        title: `${proj.name} - ${proj.text}`,
        value: proj
      }
    }),
    hint: '- Space to select. Return to submit'
  }])
  const projects: WakaProject[] = answer.value
  projects.forEach(project => {
    const proj = PROJECTS.find(p => p.wakaIds.includes(project.name))
    harvest.createEntry(proj, project.hours)
  })
} else {
  console.log('No projects matched')
}

import './projects.js'
import prompts from 'prompts'
import {Harvest} from './infra/harvest-api.js'
import {WakaApi} from './infra/waka-api.js'
import {PROJECTS} from './projects.js'

const index = async () => {
  const harvest = new Harvest()
  const waka = new WakaApi()

  const result = await waka.getProjectsWorked()

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
    const projects = answer.value

    // const messages = await prompts(projects.map(proj => {
    //   return {
    //     type: 'text',
    //     name: proj.name,
    //     message: `Skilaboð f. ${proj.name}?`
    //   }
    // }))

    for (let project of projects) {
      const proj = PROJECTS.find(p => p.wakaIds.includes(project.name))
      let hours = Number(project.decimal)
      if (hours < 0.25) {
        // Low starting price
        hours += 0.5
      } else if (hours < 1) {
        // Standard starting price
        hours = 1
      } else {
        // Round up to next half hour
        hours = Math.ceil(hours * 2) / 2
      }
      const res = await prompts([{
        type: 'text',
        name: 'msg',
        message: project.name + '?',
        initial: 'Sjálfvirk skráning'
      }, {
        type: 'number',
        message: 'Tímar',
        float: true,
        increment: 0.11,
        name: 'hours'
      }])
      await harvest.createEntry(proj, Number(res.hours || hours), res.msg)
    }
  } else {
    console.log('No projects matched')
  }
}

index()

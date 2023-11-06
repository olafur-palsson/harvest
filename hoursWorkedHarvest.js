import { calculateHours } from './infra/hours-remaining.js'

const main = async () => {

  console.log((await calculateHours()).toFixed(2))
}

main()

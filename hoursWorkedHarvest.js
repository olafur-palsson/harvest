import { calculateHoursRemaining } from './infra/hours-remaining.js'

const main = async () => {

  console.log((await calculateHoursRemaining()).toFixed(2))
}

main()

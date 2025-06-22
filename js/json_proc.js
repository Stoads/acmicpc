import { home_pos } from './home_pos.js'
export const problem = fetch(`${home_pos}/json/problem.json`).then(res=>res.json())
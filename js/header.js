import { createEL } from "./create_element.js"
import { home_pos } from './home_pos.js'
import { problem } from './json_proc.js'
const header = createEL('header','p-3 mb-3 border-bottom')
const div = createEL('div','d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start',null,
    createEL('ul','nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0',null,
        createEL('li',null,null,
            createEL('a','nav-link px-2 link-body-emphasis',{'id':'home','href':home_pos},
                'HOME'
            )
        )
    )
)
const input = createEL(
    'input',
    'col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 form-control',
    {
        'role':'p_id',
        'placeholder':'problem id',
        'aria-label':'p_id',
        'id':'p_id',
        'type':'text',
    }
)
problem.then( (problem_dat) =>
    input.addEventListener('keydown', (event)=>{
        if(event.key==='Enter'){
            const value=input.value
            if(value in problem_dat)
                location.href = (location.pathname.endsWith('/') ? './problem/' : './')+value+'.html'
            else
                input.classList.add('border-danger')
        }
    })
)
input.addEventListener('input',()=>input.classList.contains('border-danger')&&input.classList.remove('border-danger'))
header.appendChild(div).appendChild(input)
export { header }
export const bind_scroll_event = () => window.addEventListener('scroll',()=>header.classList.toggle('border-bottom',window.scrollY < 10))
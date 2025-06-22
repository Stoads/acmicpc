import { get_difficulty_img } from "./level_icon.js"
import { createEL } from "./create_element.js"
import { EL } from "./selector.js"
import { problem } from './json_proc.js'
import { header, bind_scroll_event } from './header.js'
import { footer } from './footer.js'
document.body.insertBefore(header,document.body.firstChild);
bind_scroll_event();
document.body.appendChild(footer);
let get_list_node = (id,difficulty,title)=>{
    let li = createEL('li','list-group-item',null,
        createEL('a','nav-link fs-4 link-body-emphasis',{'href':`problem/${id}.html`},
            [
                get_difficulty_img(difficulty),
                `${id}-${title}`
            ]
        )
    )
    return li
}
const problem_list = createEL('ul',
    'list-group',
    null
)

problem.then(problem_dat=>Object.entries(problem_dat).forEach(([id,dat]) => problem_list.appendChild(get_list_node(id,dat.difficulty,dat.title))))
window.addEventListener('load',()=>{
    document.body.style.visibility = 'visible';
    let contents=EL('#contents')
    contents.appendChild(problem_list)
})
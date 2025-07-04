import { get_difficulty_img, difficulty_map } from "./level.js"
import { createEL } from "./create_element.js"
import { EL } from "./selector.js"
import { problem } from './json_proc.js'
import { header, bind_scroll_event } from './header.js'
import { footer } from './footer.js'

document.body.insertBefore(header,document.body.firstChild);
bind_scroll_event();
let problem_dat
const problem_difficulty_group={}
const problem_list = createEL('ul','list-group')
const problem_diff = createEL('div','list-group')
Object.keys(difficulty_map).forEach(el=>{
    problem_difficulty_group[el]={'1':[],'2':[],'3':[],'4':[],'5':[]}
    problem_diff.appendChild(
        createEL('a',`list-group-item list-group-item-action collapsed fs-4 ${el}-color`,
            {'data-bs-toggle':'collapse','href':`#${el}-collapse`,'role':'button','aria-expended':'false','aria-controls':`${el}-collapse`},
            createEL('b',null,null,el.charAt(0).toUpperCase() + el.slice(1))
        )
    )
    problem_diff.appendChild(
        createEL('div','collapse list-group',{'id':`${el}-collapse`})
    )
})

document.body.appendChild(footer);
let get_list_node = (id,difficulty,title)=>{
    let li = createEL('li','list-group-item list-group-item-action',null,
        createEL('a','nav-link fs-4 link-body-emphasis',{'href':`problem/${id}.html`},
            [
                get_difficulty_img(difficulty),
                `${id}-${title}`
            ]
        )
    )
    return li
}


problem.then(p_dat=>{
    problem_dat=p_dat
    Object.entries(p_dat).forEach(([id,dat]) => problem_list.appendChild(get_list_node(id,dat.difficulty,dat.title)))
    Object.entries(p_dat).forEach(([id,dat])=>{
        const diff=dat.difficulty.split(' ')
        const obj = {}
        obj[id]=dat
        problem_difficulty_group[diff[0]][diff[1]].push(obj)
    })
    Object.entries(problem_difficulty_group).forEach(([ekey,evalue])=>{
        const collapse_item=problem_diff.querySelector(`#${ekey}-collapse`)
        Object.values(evalue).forEach((p)=>{
            p.forEach((t)=>{
                Object.entries(t).forEach(([k,v])=>{
                    collapse_item.appendChild(get_list_node(k,v.difficulty,v.title))
                })
            })
        })
    })
})

window.addEventListener('load',()=>{
    document.body.style.visibility = 'visible'
    const contents=EL('#contents')
    contents.appendChild(problem_list)

    const pr_list=EL('#pr_list')
    const pr_diff=EL('#pr_diff')
    pr_list.addEventListener('change',(e)=>{
        if(e.target.checked){
            contents.replaceChild(problem_list,contents.lastElementChild);
        }
    })
    pr_diff.addEventListener('change',(e)=>{
        if(e.target.checked){
            contents.replaceChild(problem_diff,contents.lastElementChild);
        }
    })
})
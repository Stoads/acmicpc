import { get_difficulty_img } from "./level_icon.js"
import { createEL } from "./create_element.js"
import { EL, ELA } from "./selector.js"
import { problem } from './json_proc.js'
import { header, bind_scroll_event } from './header.js'
import { footer } from './footer.js'
document.body.insertBefore(header,document.body.firstChild);
bind_scroll_event();
document.body.appendChild(footer);
let p_id=window.location.pathname.split('/').slice(-1)[0].split('.')[0]
window.addEventListener('load',()=>{
    document.body.style.visibility = 'visible';
    problem.then(problem_dat=>problem_dat[p_id]).then(
        ({difficulty,title})=>{
            const contents=EL('#contents')
            const h1=EL('.title')
            console.log(h1)
            const children = [
                get_difficulty_img(difficulty),
                document.createTextNode(`${p_id} - ${title}(`),
                createEL('a','nav-link',{'href':`https://www.acmicpc.net/problem/${p_id}`},
                    '백준으로 이동'
                ),
                document.createTextNode(')')
            ]
            children.forEach((child)=>h1.appendChild(child))
            contents.insertBefore(h1,contents.firstChild)
        }
    )

    let page_title=EL('head title')
    page_title.appendChild(document.createTextNode(p_id))

    let codes=Array.from(ELA('code'))
    console.log(codes)
    codes.forEach((code)=>{
        while(true){
            let str=code.firstChild.wholeText
            if(!str||!' \n\t'.includes(str[0]))break;
            let i
            for(i=0;i<str.length;i++)
                if(!' \n\t'.includes(str[i]))
                    break;
            if(i==str.length)
                code.removeChild(code.firstChild)
            else 
                code.replaceChild(document.createTextNode(str.substr(i)),code.firstChild)
        }
    //}
    })
})
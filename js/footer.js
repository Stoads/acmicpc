import { createEL } from "./create_element.js"
import { home_pos } from './home_pos.js'
const footer = createEL('footer','py-3')
const ul = createEL('ul','nav justify-content-center border-top pb-3 mb-3',null,
    createEL('li','nav-item',null,
        createEL('a','nav-link px-2 text-body-secondary',{'href':home_pos},
            'HOME'
        )
    )
)
footer.appendChild(ul)
const p = createEL(
    'p',
    'text-center text-body-secondary',
    null,
    'Stoads가 플래티넘의 벽을 넘어 다이아몬드 문제들을 도전하기 앞서, 내용 정리 및 복습을 겸해서 이 블로그를 만들었다'
)
footer.appendChild(p)
export { footer }
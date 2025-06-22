const push_child = (el,child)=>{
    if(typeof child === 'string' || typeof child === 'number')
        el.appendChild(document.createTextNode(String(child)))
    else if (child instanceof Node)
        el.appendChild(child)
    else if (child !== null)
        console.warn(`child type error : ${typeof child}`,child)
}

export const createEL = (tag,classList=null,attrs=null,children=null) =>{
    const el=document.createElement(tag)

    if(typeof classList === 'string')
        classList=classList.trim().split(/\s+/).filter(Boolean)
    if(Array.isArray(classList))
        classList.forEach(c => typeof c ==='string' && c ? el.classList.add(c) : console.warn('Invalid class name in Classlsit:',c))
    else if(classList !== null)
        console.warn(`classList type error : it should be string(with space) or array got ${typeof classList}`)


    if(attrs && typeof attrs === 'object')
        Object.entries(attrs).forEach(([name, value]) => value !== null && value !== undefined && el.setAttribute(name,value))
    

    if(Array.isArray(children))
        children.forEach((child)=>push_child(el,child))
    else 
        push_child(el,children)
    return el
}
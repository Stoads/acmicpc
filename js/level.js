import { createEL } from "./create_element.js"
let svg_flag=0

export const difficulty_map={
    bronze:0,
    silver:5,
    gold:10,
    platinum:15,
    diamond:20,
    ruby:25
}

const img_caching={}        //for image caching
const MAX_TIER=5

if(svg_flag){
    const path_value=[
        ['M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm7.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383z'],
        ['M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm4.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306'],
        ['M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318'],
        ['M6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218','M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5.519 5.057q.33-.527.657-1.055h1.933v5.332h1.008v1.107H10.11V12H8.85v-1.559H4.978V9.322c.77-1.427 1.656-2.847 2.542-4.265Z'],
        ['M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5.994 12.158c-1.57 0-2.654-.902-2.719-2.115h1.237c.14.72.832 1.031 1.529 1.031.791 0 1.57-.597 1.57-1.681 0-.967-.732-1.57-1.582-1.57-.767 0-1.242.45-1.435.808H5.445L5.791 4h4.705v1.103H6.875l-.193 2.343h.064c.17-.258.715-.68 1.611-.68 1.383 0 2.561.944 2.561 2.585 0 1.687-1.184 2.806-2.924 2.806Z']
    ]

    const color_map={
        bronze:'#ad5600',
        silver:'#435f7a',
        gold:'#ec9a00',
        platinum:'#27e2a4',
        diamond:'#00b4fc',
        ruby:'#ff0062'
    }
}
else{
    //No level or wrong level
    img_caching['default']=createEL('img','difficulty-img',{'src':'https://d2gd6pc034wcta.cloudfront.net/tier/-1.svg'})
    Object.entries(difficulty_map).forEach(([color,base])=>{
        for(let i=1;i<=MAX_TIER;i++)
            img_caching[`${color} ${MAX_TIER+1-i}`]=createEL('img','difficulty-img',{'src':`https://d2gd6pc034wcta.cloudfront.net/tier/${base+i}.svg`})
    })
}
export const get_difficulty_img = (dat) => {
    if(typeof dat !== 'string')
        return img_caching['default'].cloneNode(true)
    const normalized = dat.trim().toLowerCase()
    if(!(normalized in img_caching)) return img_caching['default'].cloneNode(true)
    return img_caching[dat].cloneNode(true)
}
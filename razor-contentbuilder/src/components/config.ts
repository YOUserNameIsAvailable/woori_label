const baseBuilderUrl = "http://localhost:3003/"
const baseRazorUrl = "http://localhost:3004/"
const serverUrl = 'http://localhost:8081/'

const baseBuilderUrlProd = "https://react-contentbuilder-phi.vercel.app/" // prod
const baseRazorUrlProd = "https://razor-contentbuilder.vercel.app/" // prod
const serverUrlProd = 'https://builder.smart-ui.pro/'

export const CONFIG_RAZOR= {
    baseBuilderUrl,
    baseRazorUrl,
    serverUrl,

    baseBuilderUrlProd,
    baseRazorUrlProd,
    serverUrlProd,
}


export const onlyForBuilder = ()=>{
    return  !!process.env.IN_API_CONTEXT
}


type TCustomProps={
    [key: string]: "src"|"textContent"|"href";
}


export const IsEditable = (params :TCustomProps )=>{
    return {"data-propsname":JSON.stringify(params)}
}

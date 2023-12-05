const baseBuilderUrl = "http://localhost:3003/"
const baseRazorUrl = "http://localhost:3004/"
const serverUrl = 'http://localhost:8081/'

const baseBuilderUrlProd = "https://react-contentbuilder-phi.vercel.app/"
const baseRazorUrlProd = "https://razor-contentbuilder.vercel.app/"
const serverUrlProd = 'https://builder.smart-ui.pro/'



export const CONFIG = {
    getBlockUrl: `${baseRazorUrl}api/custom-builder`,
    serverUrl,
    baseRazorUrl,
    baseBuilderUrl,

    serverUrlProd,
    baseRazorUrlProd,
    baseBuilderUrlProd
}

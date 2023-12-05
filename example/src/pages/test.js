
import dynamic from "next/dynamic";

const templateFolder = "auto/"
export const toCamelCase= (name)=>{
    return name.charAt(0).toUpperCase() + name.slice(1)
}
const componentGen =(name)=>{
    return dynamic(() => import('../../auto/'+name).then(mod => {
        return mod[name.charAt(0).toUpperCase() + name.slice(1)]
    }), {
        loading: () => <p> name Loading...</p>,
        ssr: false,
    });
}

export default function Home( props) {
    const apiData =  ["com", "component3"  ]
    const Component1=  componentGen(apiData[0])
   const Component2 = componentGen(apiData[1])

        const All = [Component1, Component2]
    // "Мэппинг" компонентов

    const Components = apiData.map((componentName) => {

        return dynamic(() =>
            import(`../../auto/${componentName}.js`).then(mod => {
                return mod[componentName]
            }),{loading:()=><div>  lol</div>}
        )
    });

    return (
        <main  className="container" >

            {All.map((Com ,i)=>{
                return <Com key={i}/>
            })}
        </main>
    )
}


import fs from 'fs';
import path from 'path';

export async function getStaticProps(context) {
    // Путь до файла, имя которого вы получили с бэкенда
    const filePath = path.join(process.cwd(), templateFolder, 'com.js');

    const fileContents = fs.readFileSync(filePath, 'utf8');
    console.log(fileContents)
    // Здесь можно извлечь нужную константу из fileContents
    // Это зависит от формата, в котором хранятся данные в файле

    return {
        props: {
            filePath:JSON.stringify(filePath)
        }
    }
}

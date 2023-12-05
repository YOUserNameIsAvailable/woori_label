

export default async function handler(req, res) {
    try {
       //нерабочий код
            const path2 = "auto/com"
            const component = require(path2).default ;
        //рфбочий код
        //             const component = require("auto/com").default ;
             res.status(200).send(component().props);
        }
     catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при рендеринге компонентов');
    }
}

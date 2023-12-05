import React, {useEffect, useState} from 'react';


const loaderSize= {
    width:100,
    height:20
}

 const Com = () => {
const [counter , setCoutner] = useState(25*3)
     useEffect(()=>{
         setCoutner(33/22)
     },[])
    return <div  >
                hi i am com {counter}
    </div>
};

export default Com

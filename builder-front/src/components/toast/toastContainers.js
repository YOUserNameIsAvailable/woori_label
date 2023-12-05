import React, {useEffect} from "react";
import {ToastContainer, toast} from "react-toastify";
import { useLocation } from 'react-router-dom';



const autoCloseContainersList = [
  "modalWithClose"
]

const closeToastBgClick=(e)=>{

  const target =e?.target;
  const isBg =target?.className?.includes("Toastify__toast-container")
  if(isBg){
    toast.dismiss('singleToast')
  }
}



export const ToastContainers = () => {
  const pathname = useLocation()

  useEffect(()=>{
    toast.dismiss('singleToast')
  },[pathname.pathname])

  useEffect(()=>{
    const elems =[]
    autoCloseContainersList.forEach((id)=>{
      const elem=  document.querySelector("#"+id);

      if(elem){
        elems.push(elem);
        elem.addEventListener("mousedown",closeToastBgClick );
        elem.addEventListener("touchstart",closeToastBgClick );
      }
    })

    return ()=> {
      elems.forEach((elem) => {
        elem.removeEventListener("mousedown",closeToastBgClick);
        elem.removeEventListener("touchstart",closeToastBgClick);
      })
    }
  },[])

  return (
    <>
      <ToastContainer
        enableMultiContainer
        style={{zIndex: "10005"}}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        theme="light"
        limit={6}
      />
    </>
  )
}
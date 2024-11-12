import { createContext } from "react";

export let ScrollTopContext = createContext()
export default function ScrollTopContextProvider(props){

    function scrollTop(){
        window.scrollTo({top: 0 , behavior: "smooth"})
      }
      
      return <ScrollTopContext.Provider value={{scrollTop}}>
       { props.children}
      </ScrollTopContext.Provider>
}
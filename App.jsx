import React from "react";
import { useEffect } from "react";
import Dictaphone from "./components/listner";
import './App.css'


const App = ()=>{

  const loadOnce = ()=>{
        const text = 'hello, i am an AI created by sonu rawal, write something or speak something so that i can help you with it. As per my latest version i only supports english so try to talk in  english'
        const value = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(value)
    }
  
    useEffect(()=>{
      loadOnce();
  
    },[])

  return(
    <>
    <Dictaphone></Dictaphone>
    </>
  )
}
export default App;
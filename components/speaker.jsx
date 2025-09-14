import React, { useEffect, useState } from "react";
import { useSpeech } from "react-text-to-speech";
import { Context } from "../context/context";
import './speaker.css'

export default function Speaker({respose}) {
  const values = respose.slice(0,600)
  let result = values.replace(/[!?:]/g, ',')


  const stops =()=>{
    result === ''
  }
  const loadOnce = ()=>{
          const text = result;
          const value = new SpeechSynthesisUtterance(text);
          window.speechSynthesis.speak(value)
      }
    
      useEffect(()=>{
        loadOnce();
    
      },[])
  
  
const {
  Text, // Component that renders the processed text
  speechStatus, // Current speech status
  isInQueue, // Indicates whether the speech is currently playing or waiting in the queue
  start, // Starts or queues the speech
  pause, // Pauses the speech
  stop, // Stops or removes the speech from the queue
} = useSpeech({ text: result});


  return (
    <center>  
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      {/* <Text /> */}
      <div style={{ display: "flex", columnGap: "0.5rem" }}>
        {speechStatus !== "started" ? <button onClick={start}>Start</button> : <button onClick={pause}>Pause</button>}
        <button onClick={stops}>Break</button>
        <button onClick={stop}>Stop</button>

      </div>
    </div></center>
  )

}
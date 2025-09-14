import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import geneateAnswer from "../config/AI";
import Speaker from "./speaker";
import Loader from "./loader";

const Dictaphone = () => {
  const [have, setHave] = useState(false);
  const [respose, setRespose] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [input, setInput] = useState("");

  async function onSent(prompt) {
    if (isRequesting) {
      console.warn("Request already in progress. Please wait.");
      return;
    }
    setIsRequesting(true);
    try {
      let result = await geneateAnswer(prompt);
      let responseArray = result.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("</br>");
      return setRespose(newResponse2.slice(0, 500));
    } catch (error) {
      console.error("API Error:", error.message);
      if (error.response?.status === 429) {
        alert("Too many requests. Please wait a few seconds.");
      }
    } finally {
      // Release the lock after 2 seconds
      setTimeout(() => {
        setIsRequesting(false);
      }, 2000);
    }
  }

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const onHandleClick = () => {
    SpeechRecognition.startListening({ language: "en-IN" });
    // SpeechRecognition.startListening({ continuous: true });
  };
  const stopListen = () => {
    SpeechRecognition.stopListening;
    setInput(transcript);
    console.log(input);
  };
  const rest = async () => {
    resetTranscript;

    setFetching(true);
    await onSent(input);
    setHave(true);
    setFetching(false);
    setInput("");
  };
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div className="dictaphone-container">
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={onHandleClick}>Start</button>
      <button onClick={stopListen}>Stop</button>
      <button onClick={rest}>Answer</button>
      <p>{input}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      {have ? (
        <>
          <p dangerouslySetInnerHTML={{ __html: respose }}></p>
          <Speaker respose={respose}></Speaker>
        </>
      ) : null}
      {fetching ? <Loader /> : null}
    </div>
  );
};
export default Dictaphone;


import React,{useState, useEffect, useRef} from "react"
import useHook from "./useHook"

function App(){
    const {textBoxRef,start,input,timerValue,startGame,count,print} = useHook()
    return(
        <div>
            <h1>How fast do you type?</h1>
            <textarea ref={textBoxRef} disabled={!start} value={input} onChange={print} />
            <h4>Time remaining: {timerValue}</h4>
            <button disabled={start} onClick={()=>startGame()}>Start</button>
            <h1>Word count: {count}</h1>
        </div>
    )
}
export default App
import React,{useState, useEffect, useRef} from "react"
 function useHook(startingTime = 10){
    const [input, setInput] = useState("");
    const [timerValue, setTimerValue] = useState(startingTime);
    const [start, playGame] = useState(false)
    const [count, setCount]= useState("0")
    const textBoxRef = useRef(null)

    useEffect(
       ()=>{ 
        
        if(start&&timerValue>0){
            setTimeout(()=>{setTimerValue(time=>time-1)},1000)

        }
        else if(timerValue===0){
            endGame()

        }
    
        
    }
    ,[timerValue, start]
    )
    function print(e){
        setInput(e.target.value)
    }
    function countWords(text){
        const wordsArr= text.trim().split(' ')
        const filterdVersion = wordsArr.filter(word=> word!== "")
        return filterdVersion.length

    }
    console.log(start)
    function startGame(){
        playGame(true)
        setTimerValue(startingTime)
        setInput("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()



    }
    function endGame(){
        playGame(false)
        setCount(countWords(input) )
    }
    return {textBoxRef,start,input,timerValue,startGame,count,print}
 }
 export default useHook
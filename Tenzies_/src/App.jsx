import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


export default function App() {
  const checkArr = a => a.every( val => val === a[0] )


    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    React.useEffect(()=>{

      let arrValues = dice.map(el=>el.value)
      let heldValue = dice.every(die => die.isHeld)
      console.log(arrValues)
      console.log(checkArr(arrValues))
      if(checkArr(arrValues) && heldValue){
        console.log("Game!")
        setTenzies(true)
        console.log("it's winning!")
        
      }

      
    },[dice])

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }
    
    function rollDice() {
      if(tenzies){
        setTenzies(false)
        setDice(allNewDice())

      }
      else{
        setDice(oldDies => oldDies.map(function(ele){
          return ele.isHeld === true? ele:{
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
          }
        }))
      }
      
        
    }
    

    function holdDice(id) {
        console.log(id)
       setDice(prev=> prev.map(function(ele){
        return ele.id === id? {...ele, isHeld: !ele.isHeld}:ele
       }))

        
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    return (
        <main>
           {tenzies && <Confetti width="1500px"/>}
           <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies? "New Game":"Roll"}</button>
        </main>
    )
}

import React from "react"
import Question from "./Question"
import { nanoid } from 'nanoid'
import { DOMParser } from 'xmldom'

function App() {
  const [checked, setCheck] = React.useState(false)
  const [result, increaseRes] = React.useState(0)
  const [questions, setQuestions] = React.useState([])
  const [answers, setAnswerID]=React.useState("")
  console.log(answers)

  function startQuiz(){
    let quiz = []   
    
    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => res.json())
    .then(data =>{
      data.results
          .map(ele=>{
            const allAnswers = [...ele.incorrect_answers, ele.correct_answer]
            const shuffledAnswers = shuffleArray(allAnswers)
            quiz.push({
              id : nanoid(),
              category: ele.category,
              incorrect_answers: ele.incorrect_answers,
              correct_answer:ele.correct_answer,
              all_answers: shuffledAnswers,
              type:ele.type,
              question: ele.question,
              btnColor: {backgroundColor: "transparent"},
              selected:""
              
      
            })
          }
            
     )
      
      setQuestions(quiz)

    })

  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array // be sure to return the array!
  }

  console.log(questions)

  // setQuestions(prev=> {
  //   if(!prev.includes(checked)){
  //     prev.push(checked)
  //   }
  //   return prev
  // })
  function setAnswer(id,val){
    // questions.map(ele=>{
    
    // })
    setAnswerID(id)

    console.log("clicked!")
    setQuestions(prevQuestions => {
      const updatedQuestions = prevQuestions.map(question => {
        if(question.id === id) {
          return {
            ...question,
            selected: val
          }
        } else return question
      })
      
      return updatedQuestions
    })

  }
  function checkAnswer(){
    console.log("Checked!")
    questions.map(ele=>{
      console.log(ele)
      if(ele.correct_answer == ele.selected){
        increaseRes(prev=> prev+1)

      }
      
      
      console.log(questions)

      // if(!questions.includes(checked)){
      //   questions.push(checked)
      // }
      // console.log(questions)
      // setQuestions(questions)
      setCheck(true)
   

    })
  }
  function tryAgain(){

    startQuiz()
    increaseRes(0)
    setCheck(false)


  }
  
  return (
    <main>
      {questions.length>0?
      <div className="btn-parent">
        {questions && questions.length && questions.map((question,id)=>{
      return <div className="questions_page" key={id}>
              <Question 
              key = {question.id}
              category={question.category} 
              question ={question.question}
                correct_answer ={question.correct_answer}
                incorrect_answers = {question.incorrect_answers}
                all_answers = {question.all_answers}
                id={question.id}
                toggle = {question.toggle}
                setAnswer = {setAnswer}
                color = {question.btnColor}
                selected= {question.selected}
                checked= {checked}
                setQuestions = {setQuestions}
                />
      </div>
    })}
            {checked?
              <div className="quest_query checking">
                <h3 >You scored {result}/5 correct answers </h3>
               <button className="first-btn btn try" onClick={tryAgain}>Try again</button>
              </div>:
            <button className="first-btn btn" onClick={checkAnswer}>Check answers</button>


             

               }
            

      </div>:
     
        <div className="no-quiz">
          <h1>Quizzical</h1>
          <p>Some description if needed</p>
          <button className="first-btn " onClick={startQuiz}>Start quiz</button>
      </div>
    }

    </main>

  )
}
// onClick={startQuiz}
export default App
//https://opentdb.com/api.php?amount=5 API link
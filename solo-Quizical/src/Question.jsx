import React from "react"
import { DOMParser } from 'xmldom'
import { nanoid } from 'nanoid'
let userAnswers = []

export default function Question(props){
    let answer = [...props.incorrect_answers, props.correct_answer]
    // let answers =  answer.sort(() => 0.5 - Math.random())  
    // function shuffleArray(array) {
    //     for (var i = array.length - 1; i > 0; i--) {
    //         var j = Math.floor(Math.random() * (i + 1));
    //         var temp = array[i];
    //         array[i] = array[j];
    //         array[j] = temp;
    //     }
    // }
    // console.log(answer)
    // answer = 
    // shuffleArray(answer)
      function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
      }
    //   function setAns(props, val)  {
    //     props.selected=val
    //     console.log(props.selected)


    //    }
    //    console.log(props)
    function setSelected(val, ele){
        console.log(val)
        val = ele
        console.log(val)
        return val

    }
      
    
    return (
        <div className="quest_query">
           { props.checked?
           
           
           <div>
  <h3>{
               decodeHtml( props.question)
            }</h3>
            <div className="answers"> 
              
              {answer.map(ele=> {
                let color= {backgroundColor:"transparent"}
                if(props.selected == ele){
                    if(props.correct_answer == ele){
                        color ={backgroundColor:"#94D7A2"}
                    }
                    else{
                        color ={backgroundColor:"#F8BCBC"}
                    }
                }
                // else{
                //     color = {backgroundColor:"#F8BCBC"}
                // }
          
                return   <p className="answer" style={color}   >
                    <p className={props.correct}>{ele}</p></p>
            }
          
           )}

              
            
            </div>


           </div>
           
           
           :<div>

           <h3>{
               decodeHtml( props.question)
            }</h3>
            <div className="answers"> 
              
              {answer.map(ele=> {
                let color= {backgroundColor:"transparent"}
                if(props.selected == ele){
                    color ={backgroundColor:"#D6DBF5"}
                }
                return   <p className={`answer`} style={color} onClick={()=> props.setAnswer(props.id, ele)} >{ele}</p>
            }
          
           )}

              
            
            </div>
        


           </div> }

          
        
        </div>
        
    )
}

import React from "react"
import { DOMParser } from 'xmldom'
import { nanoid } from 'nanoid'
let userAnswers = []

export default function Question(props){
    let answer = props.all_answers
      function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
      }

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
              
              {answer.map((ele,index)=> {
                let color= {backgroundColor:"transparent"}
                if(props.selected == ele){
                    if(props.correct_answer == ele){
                        color ={backgroundColor:"#94D7A2"}
                    }
                    else{
                        color ={backgroundColor:"#F8BCBC"}
                    }
                }
                else {
                    if (props.correct_answer === ele) {
                        color = { backgroundColor: "#94D7A2" }
                    }
                }
                

                // else{
                //     color = {backgroundColor:"#F8BCBC"}
                // }
          
                return   (
                    <p className="answer" style={color} key={index}  >
                    {ele}</p>
                )
            }
          
           )}

              
            
            </div>


           </div>
           
           
           :<div>

           <h3>{
               decodeHtml( props.question)
            }</h3>
            <div className="answers"> 
              
              {answer.map((ele,index)=> {
                let color= {backgroundColor:"transparent"}
                if(props.selected == ele){
                    color ={backgroundColor:"#D6DBF5"}
                }
                return   <p className={`answer`} style={color} key={index} onClick={()=> props.setAnswer(props.id, ele)} >{ele}</p>
            }
          
           )}

              
            
            </div>
        


           </div> }

          
        
        </div>
        
    )
}

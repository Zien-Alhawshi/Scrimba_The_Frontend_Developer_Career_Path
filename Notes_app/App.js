import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"

   
export default function App() {

    const [notes, setNotes] = React.useState(
        // Lazy state initialization
        ()=> JSON.parse(localStorage.getItem("note"))||[]
    )
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    React.useEffect(function(){
        localStorage.setItem('note', JSON.stringify(notes));

    },[notes])
    function createNewNote() {
        
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        
        setCurrentNoteId(newNote.id)
        console.log(findCurrentNote())
    }
    
    function updateNote(text) {
        // Put the most recently-modified note at the top
        setNotes(oldNotes => {
            const newArray = []
            for(let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i]
                if(oldNote.id === currentNoteId) {
                    newArray.unshift({ ...oldNote, body: text })
                } else {
                    newArray.push(oldNote)
                }
            }
            return newArray
        })
    }
       
    function deleteNote(event, noteId) {
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId ))

        // let newArr = []
        // notes.forEach(ele =>{
        //     if( ele.id != currentNoteId){
        //         newArr.push(ele)
        //     }
        // })
        // setNotes(newArr)
        console.log(newArr)
        event.stopPropagation()
    }
    function update(){
        let currentNote = findCurrentNote()

        let newArray =[]
        notes.forEach(element => {
            if(element.id == currentNote.id){
                newArray.unshift(element)
            }
            else{
                newArray.push(element)
            }
            
        });
        setNotes(newArray)
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote = {deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}

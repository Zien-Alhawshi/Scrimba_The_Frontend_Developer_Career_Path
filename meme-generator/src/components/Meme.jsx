
import React from 'react'

export default function Meme(){
    let url;
    const [meme, setSrc] = React.useState({
        topText:"",
        bottomText:"",
        randomImage:"http://i.imgflip.com/1bij.jpg"
    })
    const [allMeme, setAllImages] = React.useState([])
    React.useEffect(function(){
        fetch("https://api.imgflip.com/get_memes")
        .then(res=> res.json())
        .then(data =>setAllImages(data.data.memes) )
    }, [])

    function getURL(){
        
        const random = Math.floor(Math.random()*allMeme.length)

        url = allMeme[random].url
        
        setSrc(prevMeme =>{
            return {
                ...prevMeme,
                randomImage:url
            }
        })
       
    }
    function handleChange(event){
        const {name, value} = event.target
        setSrc(prev=> {
            return{
                ...prev,
                [name]:value

            }
        })
    }
    return(
        <main id="main">
        <p>{url}</p>

        <div className="form">
            <input 
                type="text"
                placeholder="Top text"
                className="form--input"
                name="topText"
                value={meme.topText}
                onChange ={handleChange}
            />
            <input 
                type="text"
                placeholder="Bottom text"
                className="form--input"
                name="bottomText"
                value={meme.bottomText}
                onChange ={handleChange}

            />
            <button onClick={getURL}
                className="form--button"
            >
                Get a new meme image 🖼
            </button>
        </div>
        <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
    </main>
    )
}
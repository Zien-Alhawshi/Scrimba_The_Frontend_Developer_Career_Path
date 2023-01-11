import React,{useContext} from "react"
import Image from "../components/Image"
import {Context} from "../ContextProvider"
import {getClass} from "../utils"

function Photos() {
    const {allPhotos,toggleFavorite} = useContext(Context)
    const pictures=
    allPhotos.map((img,idx)=><Image key={img.id} img={img} className={getClass(idx)} />)

    
    return (
        <main className="photos">
           {pictures}
            
        </main>
    )
}

export default Photos
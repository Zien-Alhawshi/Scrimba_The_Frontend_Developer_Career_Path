import github from "../assets/images/GitHub Icon.png"
import linked from "../assets/images/Linkedin Icon.png"
import twitter from "../assets/images/Twitter Icon.png"

export default function footer(){
    return(
    <div className="footer">
        <img src={github}/>
        <img src={linked}/>
        <img src={twitter}/>


    </div>
    )
}
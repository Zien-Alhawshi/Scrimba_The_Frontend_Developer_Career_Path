
import img from "../assets/images/profile_picture.jpg"
import email from "../assets/images/icon.png"
import linked from "../assets/images/linkedin.png"
export default function Info(){
    return(
        <div className="info">
            <img src={img} className="info--prof_picture" />
            <h1 className="info--name">Zien Alhawshi</h1>
            <p className="info--role">Frontend Developer</p>
            <p>Zien.website</p>
            <div className="info--bts" >
                <button className="info--role_email"><img src={email} /> Email</button>
                <button className="info--linkedin"><img src={linked} /> LinkedIn</button>
            </div>
        </div>
    )
}
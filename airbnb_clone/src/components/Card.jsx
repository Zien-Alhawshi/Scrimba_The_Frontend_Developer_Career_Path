
import star from "../assets/images/star.png"
// import img from "../assets/images/katie-zaferes.png"
export default function Card(props){

    const img = `/src/assets/images/${props.coverImg}`
    console.log(typeof img)
    console.log(img)
    let badgeText
    if (props.openSpots === 0) {
        badgeText = "SOLD OUT"
    } else if (props.location === "Online") {
        badgeText = "ONLINE"
    }
    return(
        <div className="card">
       {badgeText && <div className="card--badge">{badgeText}</div>}
        <img src={img} className="card--image" />
        <div className="card--stats">
            <img src={star} className="card--star" />
            <span>{props.stats.rating}</span>
            <span className="gray">({props.stats.reviewCount}) • </span>
            <span className="gray">{props.location}</span>
        </div>
        <p>{props.title}</p>
        <p><span className="bold">From ${props.price}</span> / person</p>
    </div>

    )
}
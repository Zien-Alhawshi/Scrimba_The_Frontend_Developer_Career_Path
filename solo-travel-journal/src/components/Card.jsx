
import location from "../assets/location.png"
export default function Card(props){

    console.log(props.item)
    const img = `${props.item.imageUrl}`
    console.log(img)
    return(
        <>
        <div className="card">
            <img src={img} className="card--img"/>
            <div>
                <div className="card-intro">
                   
                    <p> <img src={location} /> {props.item.location}</p>
                    <a href={props.item.googleMapsUrl}>View on google maps</a>
                </div>
                <h1 className="title">{props.item.title}</h1>
                <p className="date">{props.item.startDate} - {props.item.endDate}</p>
                <div className="desc">
                <p className="description">{props.item.description}</p>

                </div>

            </div>

        </div>
        </>
    )
}
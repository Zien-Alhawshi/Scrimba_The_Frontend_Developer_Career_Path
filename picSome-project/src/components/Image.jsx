import React,{useState,useContext} from "react"
import {Context} from "../ContextProvider"
import PropTypes from 'prop-types';
import useHover from "../hoocs/useHover";
//Saving the favorite to Local storage!

function Image({className, img}) {
    const {toggleFavorite, addImageToCart,cartItems,removeFromCart} = useContext(Context)

    // const [isHovered, setIsHovered] = useState()
        const [isHovered, ref] = useHover()

    // const heartIcon = isHovered && <i onClick={()=>toggleFavorite(img.id)} className="ri-heart-line favorite"></i>
    // const cartIcon = isHovered && 
    // const filledHeartIcon = img.isFavorite && <i className="ri-heart-fill favorite"></i>
    function cartIcon(){
        const alreadyInCart = cartItems.some(item => item.id === img.id)

        if(alreadyInCart){
            return <i className="ri-shopping-cart-fill cart" onClick={()=>removeFromCart(img.id)}></i>
        }
        else{
            if(isHovered){
                return <i className="ri-add-circle-line cart" onClick={()=>addImageToCart(img)}></i>
            }
        }
    }
    function heartIcon() {
        if(img.isFavorite) {
            return <i className="ri-heart-fill favorite" onClick={() => toggleFavorite(img.id)}></i>
        } else if(isHovered) {
            return <i className="ri-heart-line favorite" onClick={() => toggleFavorite(img.id)}></i>
        }
    }
    return (
        <div 
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
         className={`${className} image-container`}
         ref={ref}
         >
            <img src={img.url} className="image-grid"/>
            {/* {img.isFavorite?filledHeartIcon:isHovered?heartIcon:""} */}
            {heartIcon()}
            {cartIcon()}
        </div>
    )
}
Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    })
}
export default Image

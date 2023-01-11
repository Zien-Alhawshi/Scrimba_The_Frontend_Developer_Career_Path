import React,{useContext, useState} from "react"
import {Context} from "../ContextProvider"
import PropTypes from 'prop-types';
import useHover from "../hoocs/useHover"
function CartItem({item}) {
    // const [cartHover, setCartHover]  = useState()
    const [cartHover, ref] = useHover()
    const {cartItems,removeFromCart} = useContext(Context)
    const iconClassName = cartHover ? "ri-delete-bin-fill" : "ri-delete-bin-line"

    return (
        <div className="cart-item" 
      
        >
        
           
        <i 
        
        onClick={()=>removeFromCart(item.id)}  
        className={iconClassName}
        ref={ref}></i>
       

        <img src={item.url} width="130px" />
        <p>$5.99</p>
    </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        url: PropTypes.string.isRequired
    })
}
export default CartItem
import React,{useContext, useState} from "react"
import {Context} from "../ContextProvider"
import CartItem from "../components/CartItem"
function Cart() {
    const {cartItems,emptyCart} = useContext(Context)
    const [btnText, setBtnText] = useState("Place Order")
    const totalCost = 5.99 * cartItems.length
    const totalCostDisplay = totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"})
    const cartItemElements = cartItems.map(item => {
        
        return <CartItem key={item.id} item={item} />
    })
    function order(){
        setBtnText("Ordering...")
        setTimeout(() => {
            console.log("Order placed!")
            setBtnText("Place Order")
            emptyCart()
        }, 3000)
       

    }
    return (
        <main className="cart-page">
            {cartItemElements}
            <p className="total-cost">Total: {totalCostDisplay}</p>
            <div className="order-button">
                {cartItems.length?<button onClick={()=>order()}>{btnText}</button>:<p>You have no items in your cart.</p>}
            </div>
        </main>
    )
}

export default Cart
import React, {useState,useEffect} from "react"
const Context = React.createContext()
function ContextProvider({children}){
    const [allPhotos, setPhotos] = useState([])
    let [cartItems, setCartItems] = useState([])
    useEffect(()=>{
        fetch('https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json')
            .then(response => response.json())
            .then(data=>setPhotos(data));
    }, []);
    // const toggleFavorite = (id) => {
    //     console.log("toggled")
    //     setPhotos(current =>
    //       current.map(obj => {
    //         if (obj.id === id) {
    //           return {...obj,isFavorite:!obj.isFavorite};
    //         }
    //         console.log(obj)
    
    //         return obj;
    //       }),
    //     );
    //   };
    function toggleFavorite(id) {

        const updatedArr = allPhotos.map(photo => {
            if(photo.id === id) {
                console.log(id)
                console.log(!photo.isFavorite)
                return {...photo, isFavorite: !photo.isFavorite}
            }
            return photo
        })
        setPhotos(updatedArr)
    }
    function emptyCart() {
        setCartItems([])
    }
    function addImageToCart(img){
            setCartItems(prevItems => [...prevItems, img])
        }
        console.log(cartItems)
    function removeFromCart(id){
        console.log("Removed!")
        // const newCart = cartItems.filter((item) => item.id !== img.id);
        // setCartItems(newCart)
        setCartItems(prevItems => prevItems.filter(item => item.id !== id))

    }
    
    
    return(
        <Context.Provider value={{allPhotos,toggleFavorite,addImageToCart,cartItems,removeFromCart,emptyCart}}>
            {children}
        </Context.Provider >
    )
}
export {ContextProvider,Context }
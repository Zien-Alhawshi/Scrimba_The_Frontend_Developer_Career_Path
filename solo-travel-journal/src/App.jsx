
import Navbar from "./components/Navbar"
import data from "./data"
import Card from "./components/Card"

function App() {
  const cards = data.map(ele=>{
    return <Card item ={ele}/>
    
  })
  return (
    <>
      <Navbar />
      <section className="card-parent">
        {cards}
      </section>
    </>
  )
}

export default App

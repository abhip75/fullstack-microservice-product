
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Products from './componets/Products'
import Cart from './componets/Cart'

function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<Products/>}/>
      <Route path="/cart" element={<Cart/>}/>
     </Routes>
    </>
  )
}

export default App

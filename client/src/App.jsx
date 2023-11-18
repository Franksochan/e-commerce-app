import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/nav-bar'
import { Auth } from './pages/auth'
import { Shop } from './pages/shop'
import { Cart } from './pages/cart'
import { Profile } from './pages/profile'
import { Checkout } from './pages/checkout'
import { SuccessfulPurchase } from './pages/checkout/succesful-purchased'
import { PurchasedItems } from './pages/profile/profile-components/purchased-items'
import { ChangeUsername } from './pages/profile/profile-components/changeUsername'
import { ChangePassword } from './pages/profile/profile-components/changePassword'

function App() {
  return (
    <div className='container'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />}/>
          <Route path='/auth' element={<Auth />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/success' element={<SuccessfulPurchase />} />
          <Route path='/purchased-items' element={<PurchasedItems />} />
          <Route path='/change-username' element={<ChangeUsername />}/>
          <Route path='/change-password' element={<ChangePassword />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

import { Register } from './register'
import { Login } from './login'
import { useState } from 'react'
import './styles.css'

export const Auth = () => {
  const [form, setForm] = useState(false)

  return (
    <div className='form-body'>
      {form ? (
        <Register />
      ) : (
        <Login />
      )}
      <button
       className='nav-button'
       onClick={() => setForm(!form)}>
        {form ? 'Go to login page' : 'Create an account'}
      </button>
    </div>
  )
}

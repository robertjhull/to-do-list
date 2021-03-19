import { useState } from 'react'
import Login from '../components/Login'
import Registration from '../components/Registration'

const Index = () => {
  let [registered, setRegistered] = useState(false)

  const registrationForm = {
    username: '',
    password: '',
    confirm_password: ''
  }

  const loginForm = {
    username: '',
    password: ''
  }

  const toggleForm = () => {
    console.log("toggled")
    setRegistered(!registered);
  }

  if (registered) {
    return <Login loginForm={loginForm} toggleForm={toggleForm} />
  } else {
    return <Registration registrationForm={registrationForm} toggleForm={toggleForm} />
  }
}

export default Index;

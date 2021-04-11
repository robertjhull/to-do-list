import { useState } from 'react'
import { useRouter } from 'next/router'
import Login from '../components/Login'
import Registration from '../components/Registration'

const Index = () => {
  const router = useRouter()
  const contentType = 'application/json'

  let [registered, setRegistered] = useState(true)

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

  const postData = async (form) => {
    try {
        const res = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                Accept: contentType,
                'Content-Type': contentType,
            },
            body: JSON.stringify(form),
        })
        .then(res => { return res.json() })
        .then(res => {
            router.push({
              pathname: "/notes",
              query: {
                username: res.username,
                id: res._id
              }
          }, "/notes")
        })
    } catch(err) {
      console.log(err)
    }
  }

  if (registered) {
    return (
      <Login 
        loginForm={ loginForm }
        toggleForm={ toggleForm }
        loginHandler={ postData }
      />)
  } else {
    return (
      <Registration 
        registrationForm={ registrationForm }
        toggleForm={ toggleForm }
        registrationHandler={ postData }
      />)
  }
}

export default Index;

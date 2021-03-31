import { useState } from 'react'
import { useRouter } from 'next/router'
import Login from '../components/Login'
import Registration from '../components/Registration'

const Index = () => {
  const router = useRouter()
  const contentType = 'application/json'

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

  const postData = async (form) => {
    try {
        const res = await fetch('/api/user', {
            method: 'POST',
            headers: {
                Accept: contentType,
                'Content-Type': contentType,
            },
            body: JSON.stringify(form),
        })
        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
            throw new Error(res.status)
        }
        router.push({
            pathname: "/notes",
            query: { username: form.username}
        })
    } catch (error) {
        console.log(error)
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

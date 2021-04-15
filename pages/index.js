import { useState } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import Login from '../components/Login'
import Registration from '../components/Registration'

const Index = () => {
  const router = useRouter()
  const contentType = 'application/json'

  let [registered, setRegistered] = useState(true)
  let [message, setMessage] = useState("")
  const [cookie, setCookie] = useCookies(["user"])

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
    setMessage("")
    setRegistered(!registered);
  }

  const loginUser = async (form) => {
    try {
        const res = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                Accept: contentType,
                'Content-Type': contentType,
            },
            body: JSON.stringify(form),
        })
        .then(res => {
          return res.json()
        })
        .then(res => {
            if (!res.success) {
              setMessage("Something went wrong.")
            } else {
              setCookie("user", {
                username: res.username,
                id: res.id
              }, {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
              })
              router.push({
                pathname: "/notes",
                query: {
                  username: res.username,
                  id: res.id
                }
            }, "/notes")
            }
        })
    } catch(err) {
      console.log(err)
    }
  }

  const registerUser = async (form) => {
    try {
        const res = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                Accept: contentType,
                'Content-Type': contentType,
            },
            body: JSON.stringify(form),
        })
        .then(res => {
          return res.json()
        })
        .then(res => {
            if (!res.success) {
              setMessage("Something went wrong.")
            } else {
              setCookie("user", {
                username: JSON.stringify(res.username),
                id: JSON.stringify(res.id)
              }, {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
              })
              router.push({
                pathname: "/notes",
                query: {
                  username: res.username,
                  id: res.id
                }
            }, "/notes")
            }
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
        loginHandler={ loginUser }
        message={ message }
      />)
  } else {
    return (
      <Registration 
        registrationForm={ registrationForm }
        toggleForm={ toggleForm }
        registrationHandler={ registerUser }
        message={ message }
      />)
  }
}

export default Index;

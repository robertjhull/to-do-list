import { useState } from 'react'
import { useRouter } from 'next/router'

const Login = ({ loginForm, toggleForm }) => {
    const router = useRouter()
    const contentType = 'application/json'

    let [form, setForm] = useState({
        username: loginForm.username,
        password: loginForm.password,
    })
    let [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setForm({
            ...form,
            [name]: value
        })
    }

    const getUser = async (form) => {
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
            setErrors({error: error})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
          getUser(form)
        } else {
          setErrors(errs)
        }
    }
    
    const formValidate = () => {
        let err = {}
        if (!form.username) err.username = 'Username is required'
        if (!form.password) err.password = 'Password is required'
        return err
    }

    return (
        <>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <p>Or <a onClick={toggleForm}>register here.</a></p>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    maxLength="20"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    maxLength="20"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <div className="btn-container">
                    <button type="submit" className="btn">Sign In</button>
                </div>
                <div>
                    {/* {Object.values(errors).map((err, index) => (
                        <li key={index} className="error">{err}</li>
                    ))} */}
                </div>
            </form>
        </>
    )

}

export default Login;
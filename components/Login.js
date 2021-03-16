import { useState } from 'react'

const Login = ({ loginForm, toggleForm }) => {
    
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
          console.log('validated!')
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
                <button type="submit" className="btn">Sign In</button>
                <div>
                    {Object.values(errors).map((err, index) => (
                        <li key={index} className="error">{err}</li>
                    ))}
                </div>
            </form>
        </>
    )

}

export default Login;
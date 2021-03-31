import { useState } from 'react'
import { useRouter } from 'next/router'

const Registration = ({ registrationForm, toggleForm }) => {
    const router = useRouter()
    const contentType = 'application/json'

    let [form, setForm] = useState({
        username: registrationForm.username,
        password: registrationForm.password,
        confirm_password: registrationForm.confirm_password
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
          postData(form)
        } else {
          setErrors(errs)
        }
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
            setErrors({error: error})
        }
    }
    
    const formValidate = () => {
        let err = {}
        if (!form.username) err.username = 'Username is required'
        if (!form.password) err.password = 'Password is required'
        if (form.password.length < 8) err.password = 'Password must be at least 8 characters'
        if (!form.confirm_password) err.confirm_password = 'Password is required'
        if (form.confirm_password != form.password) err.confirm_password = 'Password does not match'
        return err
    }

    return (
        <>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <p>Already registered? <a onClick={toggleForm}>Login here.</a></p>
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

                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                    type="password"
                    maxLength="20"
                    name="confirm_password"
                    value={form.confirm_password}
                    onChange={handleChange}
                    required
                />
                <div className="btn-container">
                    <button type="submit" className="btn">Register</button>
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

export default Registration;
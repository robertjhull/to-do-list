import React, { ChangeEvent, FormEvent, useState } from 'react'

export default function LoginForm(): JSX.Element {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e: ChangeEvent) => {
    console.log(typeof e);
    // setForm({});
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      console.log(form)
    } else {
      setErrors(errs);
    }
  }
  
  const formValidate = () => {
    let err = {}
    // if (!form.username) err.username = 'Username is required'
    // if (!form.password) err.password = 'Password is required'
    return err
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <p>Or <button>register here.</button></p>
        <label htmlFor="username">Username</label>
        <input
            type="text"
            maxLength={20}
            name="username"
            onChange={handleChange}
            required
        />
        <label htmlFor="password">Password</label>
        <input
            type="password"
            maxLength={20}
            name="password"
            onChange={handleChange}
            required
        />
        <div>
            {Object.values(errors).map((err, index) => (
              <li key={index} className="error">error</li>
            ))}
        </div>
        <span className="error">message</span>
        <div className="btn-container">
            <button type="submit" className="btn">Sign In</button>
        </div>
      </form>
    </>
  )
}
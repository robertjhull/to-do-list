import { ChangeEvent, FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function RegistrationForm(): JSX.Element {
  const history = useHistory();
  let [form, setForm] = useState({
    username: '',
    password: '',
    confirm_password: '',
  });
  let [errors, setErrors] = useState({})

  const handleChange = (e: ChangeEvent) => {
    // const { name, value } = e.target;
    // setForm()
  }

  const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
      const errs = formValidate()
      if (Object.keys(errs).length === 0) {
        console.log(form)
      } else {
        setErrors(errs)
      }
  }

  const formValidate = () => {
      let err = {}
      // if (!form.username) err.username = 'Username is required'
      // if (!form.password) err.password = 'Password is required'
      // if (form.password.length < 8) err.password = 'Password must be at least 8 characters'
      // if (!form.confirm_password) err.confirm_password = 'Password is required'
      // if (form.confirm_password != form.password) err.confirm_password = 'Passwords do not match'
      return err
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <p>Already registered? <button onClick={() => history.push('/login')}>Login here.</button></p>
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
        <label htmlFor="confirm_password">Confirm Password</label>
        <input
            type="password"
            maxLength={20}
            name="confirm_password"
            onChange={handleChange}
            required
        />
        <div>
            {Object.values(errors).map((err, index) => (
                <li key={index} className="error">err</li>
            ))}
        </div>
        <span className="error">message</span>
        <div className="btn-container">
            <button type="submit" className="btn">Register</button>
        </div>
      </form>
    </>
  )
}
import { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';

interface Props {
  toggleForm: () => void;
}

export default function RegistrationForm({ toggleForm }: Props): JSX.Element {
  const history = useHistory();
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState({})

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
    <Form className="login-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <Form.Text>Already registered?
        <Button variant="link" onClick={toggleForm}>Login here.</Button>
      </Form.Text>
      <Form.Group>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          maxLength={20}
          name="username"
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          maxLength={20}
          name="password"
          onChange={handleChange}
          required
        />
        <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
        <Form.Control
          type="password"
          maxLength={20}
          name="confirmPassword"
          onChange={handleChange}
          required
          aria-describedby="passwordHelp"
        />
        <Form.Text id ="passwordHelp">
          Password must be 8-20 characters long
        </Form.Text>
      </Form.Group>
      <Form.Group>
        {errors && Object.values(errors).map((message: any, idx) => (
          <Alert key={idx} variant="danger">{message}</Alert>
        ))}
        <Button variant="primary">Register</Button>
      </Form.Group>
    </Form>
  )
}
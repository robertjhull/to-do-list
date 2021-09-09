import React, { ChangeEvent, FormEvent, ReactNode, useState } from 'react';
import { Alert, Button, Form, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function LoginForm(): JSX.Element {
  const history = useHistory();
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
    <Form className="login-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <Form.Text>Or
        <Button variant="link" onClick={() => history.push('/login')}>register here.</Button>
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
      </Form.Group>
      {errors && Object.values(errors).map((message: any, idx: number): ReactNode => {
        return (<Alert key={idx} variant="danger">{message}</Alert>)
      })}
      <Button variant="primary">Sign In</Button>
    </Form>
  )
}
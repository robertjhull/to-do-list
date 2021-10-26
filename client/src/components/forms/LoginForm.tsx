import React, { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { Alert, Button, Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/useAuthContext";
import loginUser from "../../helpers/loginUser";

interface Props {
  toggleForm: () => void;
}

export default function LoginForm({ toggleForm }: Props): JSX.Element {
  const history = useHistory();
  const { updateLoginContext } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLButtonElement;
    setForm({
      ...form,
      [name]: value
    });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = formValidate();
    if (!errs.username && !errs.password) {
      const { username, password } = form;
      const data = await loginUser(username, password);
      if (data.success) {
        updateLoginContext(data.success.user);
        history.push("/dashboard");
      }
    } else {
      setErrors(errs);
    }
  }
  
  const formValidate = () => {
    const errs = { username: "", password: "" }
    if (!form.username) errs.username = "Username is required";
    if (!form.password) errs.password = "Password is required";
    return errs
  }

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <Form.Text>Or
        <Button variant="link" onClick={toggleForm}>register here.</Button>
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
      <Button variant="primary" type="submit">Sign In</Button>
    </Form>
  )
}
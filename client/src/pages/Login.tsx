import { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import RegistrationForm from "../components/forms/RegistrationForm";
import { Col, Container, Row } from "react-bootstrap";

export default function Login(): JSX.Element {
  const [isNewUser, setIsNewUser] = useState(true);

  const toggle = () => setIsNewUser(prevState => !prevState);

  return (
    <Container>
      <Row className="justify-content-sm-center">
        <Col sm={6}>
          {isNewUser ? (
            <RegistrationForm toggleForm={ toggle } />
          ) : (
            <LoginForm toggleForm={ toggle } />
          )}
        </Col>
      </Row>
    </Container>
  )
}
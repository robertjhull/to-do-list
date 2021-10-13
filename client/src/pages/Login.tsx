import LoginForm from "../components/forms/LoginForm";
import RegistrationForm from "../components/forms/RegistrationForm";
import { Col, Container, Row } from "react-bootstrap";

export default function Login(): JSX.Element {
  const loggingIn = true;
  return (
    <Container>
      <Row className="justify-content-sm-center">
        <Col sm={6}>
          { loggingIn? <LoginForm /> : <RegistrationForm /> }
        </Col>
      </Row>
    </Container>
  )
}
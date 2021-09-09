import ReminderForm from "../components/forms/ReminderForm";
import Navigation from "../components/dashboard/Navigation";
import { Col, Container } from "react-bootstrap";

export default function Dashboard(): JSX.Element {
  return (
    <Container>
      <Navigation />
      <Col>
        <h2>{''}'s reminders</h2>
        <ReminderForm userId={'userId'}/>
      </Col>
    </Container>
  )
}
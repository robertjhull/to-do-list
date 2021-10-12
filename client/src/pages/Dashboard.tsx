import ReminderForm from "../components/forms/ReminderForm";
import Navigation from "../components/dashboard/Navigation";
import { Col, Container } from "react-bootstrap";
import ReminderList from "../components/dashboard/ReminderList";
import { useAuth } from "../context/useAuthContext";

export default function Dashboard(): JSX.Element {
  const { user, reminders } = useAuth();

  return (
    <>
      <Navigation {...user} />
      <Container>
        <Col>
          <ReminderForm userId={user.id} />
          <ReminderList {...reminders}/>
        </Col>
      </Container>
    </>
  )
}
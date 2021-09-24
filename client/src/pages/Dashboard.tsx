import ReminderForm from "../components/forms/ReminderForm";
import Navigation from "../components/dashboard/Navigation";
import { Col, Container } from "react-bootstrap";
import ReminderList from "../components/dashboard/ReminderList";
import { useAuth } from "../context/UseAuthContext";

export default function Dashboard(): JSX.Element {
  const { user, reminders } = useAuth();

  return (
    <>
      <Navigation {...user} />
      <Container>
        <Col>
          <h2>{user.username}'s reminders</h2>
          <ReminderForm userId={user.id} />
          <ReminderList {...reminders}/>
        </Col>
      </Container>
    </>
  )
}
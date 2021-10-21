import ReminderForm from "../components/forms/ReminderForm";
import Navigation from "../components/dashboard/Navigation";
import { Col, Container } from "react-bootstrap";
import ReminderList from "../components/dashboard/ReminderList";
import { useAuth } from "../context/useAuthContext";
import { Redirect } from "react-router";

export default function Dashboard(): JSX.Element {
  const { loggedInUser } = useAuth();

  if (loggedInUser) {
    return (
      <>
        <Navigation {...loggedInUser} />
        <Container>
          <Col>
            <ReminderForm userId={loggedInUser.id} />
            <ReminderList {...loggedInUser.reminders}/>
          </Col>
        </Container>
      </>
    )
  } else {
    return <Redirect to="/login" />
  }
}
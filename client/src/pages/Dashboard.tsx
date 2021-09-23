import ReminderForm from "../components/forms/ReminderForm";
import Navigation from "../components/dashboard/Navigation";
import { Col, Container } from "react-bootstrap";
import ReminderList from "../components/dashboard/ReminderList";

export default function Dashboard(): JSX.Element {
  const reminders = [
    { id: "id1", title: "Do laundry", date: new Date(), completed: false, priority: 1 },
    { id: "id2", title: "Buy groceries", date: new Date(), completed: false, priority: 2 },
    { id: "id3", title: "Pay rent", date: new Date(), completed: true, priority: 0 },
    { id: "id4", title: "Finish programming project", date: new Date(), completed: false, priority: 3 }
  ];

  const user = "Robert";

  return (
    <>
      <Navigation />
      <Container>
        <Col>
          <h2>{user}'s reminders</h2>
          <ReminderForm userId={'userId'} />
          <ReminderList {...reminders}/>
        </Col>
      </Container>
    </>
  )
}
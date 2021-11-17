import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from '../../context/useAuthContext';
import { User } from "../../interface/User";

export default function Navigation({ id, username }: User): JSX.Element {
  const { logout } = useAuth();

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Reminders</Navbar.Brand>
      </Container>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Welcome back, {username}
        </Navbar.Text>
        <Nav.Link onClick={logout}>
          Logout
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
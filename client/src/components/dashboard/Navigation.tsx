import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { User } from "../../interface/User";

export default function Navigation({ id, username }: User): JSX.Element {
  const history = useHistory();
  const logout = () => {
    history.push("/")
  }

  return (
    <Navbar expand="lg" variant="dark" bg="primary" className="justify-content-end">
      <Nav>
        <Navbar.Text>
          Hello {username}
        </Navbar.Text>
        <Nav.Link onClick={ logout }>Logout</Nav.Link>
      </Nav>
    </Navbar>
  )
}
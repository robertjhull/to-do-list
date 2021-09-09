import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Navigation() {
  const history = useHistory();
  const logout = () => {
    history.push("/")
  }

  return (
    <Navbar>
      <Nav>
        <Nav.Link onClick={ logout }>Logout</Nav.Link>
      </Nav>
    </Navbar>
  )
}
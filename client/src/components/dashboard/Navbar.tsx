import { useHistory } from 'react-router-dom';

export default function Navbar() {
  const history = useHistory();
  const logout = () => {
      history.push("/")
  }

  return (
      <nav>
          <button onClick={ logout } className="btn delete">Logout</button>
      </nav>
  )
}
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

export default function Navbar() {
    const router = useRouter();
    const [cookie, setCookie, removeCookie] = useCookies(["user"])

    const logout = () => {
        removeCookie("user")
        router.push("/")
    }

    return (
        <nav>
            <a onClick={ logout } className="btn delete">Logout</a>
        </nav>
    )
}
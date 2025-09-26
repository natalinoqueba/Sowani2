import { useAuth } from "../../context/AuthContext"
import { useUserType } from "../../context/UserTypeContext"
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
  const { user, logout } = useAuth()
  const { userType } = useUserType()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const renderLinks = () => {
    if (!user) return null

    switch (userType) {
      case "agricultor":
        return (
          <>
            <Link to="/agricultor" className="px-3 py-2 hover:bg-gray-200 rounded">Dashboard</Link>
            <Link to="#" onClick={handleLogout} className="px-3 py-2 hover:bg-gray-200 rounded">Sair</Link>
          </>
        )
      case "transportador":
        return (
          <>
            <Link to="/transportador" className="px-3 py-2 hover:bg-gray-200 rounded">Dashboard</Link>
            <Link to="#" onClick={handleLogout} className="px-3 py-2 hover:bg-gray-200 rounded">Sair</Link>
          </>
        )
      case "comprador":
        return (
          <>
            <Link to="/comprador" className="px-3 py-2 hover:bg-gray-200 rounded">Dashboard</Link>
            <Link to="#" onClick={handleLogout} className="px-3 py-2 hover:bg-gray-200 rounded">Sair</Link>
          </>
        )
      default:
        return null
    }
  }

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">SOWANI</h1>
      <nav className="flex space-x-2">
        {renderLinks()}
      </nav>
    </header>
  )
}

export default Header

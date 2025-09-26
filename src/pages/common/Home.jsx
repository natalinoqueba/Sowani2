import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo ao SOWANI</h1>
      <p className="mb-6">Usuário logado: <span className="font-semibold">{user?.email}</span></p>
      <button 
        onClick={handleLogout} 
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Sair
      </button>
    </div>
  )
}

export default Home

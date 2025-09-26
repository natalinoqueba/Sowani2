import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase"
import { FaUser, FaGlobe, FaBell, FaLock, FaQuestionCircle, FaCog, FaSignOutAlt } from "react-icons/fa"

const Settings = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await auth.signOut()
    navigate("/login")
  }

  const sections = [
    { name: "Perfil", desc: "Gerir informações pessoais", icon: <FaUser />, onClick: () => navigate("/profile") },
    { name: "Idioma", desc: "Atual: Português", icon: <FaGlobe />, onClick: () => {} },
    { name: "Notificações", desc: "Configurar alertas e avisos", icon: <FaBell />, onClick: () => navigate("/notifications") },
    { name: "Privacidade", desc: "Controlar dados e privacidade", icon: <FaLock />, onClick: () => navigate("/privacy") },
    { name: "Ajuda", desc: "Manual e suporte técnico", icon: <FaQuestionCircle />, onClick: () => navigate("/help") }
  ]

  return (
    <div className="min-h-screen bg-[#05291C] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 p-4 rounded-2xl bg-gradient-to-r from-green-700 via-green-900 to-green-700 shadow-lg">
        <h1 className="text-2xl font-bold text-[#FE9300]">Definições</h1>
        <button
          onClick={() => navigate("/settings")}
          className="p-2 bg-[#112C25]/70 rounded-xl hover:bg-[#112C25]/90 transition"
        >
          <FaCog className="text-white" />
        </button>
      </div>

      {/* Saudação */}
      <p className="mb-6 text-lg">
        Olá, {auth.currentUser?.displayName || "Usuário"}
      </p>

      {/* Seções */}
      <div className="space-y-4">
        {sections.map((sec) => (
          <div
            key={sec.name}
            className="bg-[#112C25]/70 p-4 rounded-xl flex justify-between items-center cursor-pointer hover:bg-[#112C25]/90 transition"
            onClick={sec.onClick}
          >
            <div className="flex items-center space-x-3">
              <div className="text-[#FE9300] text-xl">{sec.icon}</div>
              <div>
                <span className="font-medium">{sec.name}</span>
                <p className="text-gray-400 text-sm">{sec.desc}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Terminar sessão */}
        <div
          className="bg-red-600 p-4 rounded-xl flex justify-center items-center cursor-pointer hover:bg-red-700 transition font-semibold space-x-2"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Terminar sessão</span>
        </div>
      </div>
    </div>
  )
}

export default Settings

import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const HeaderAgricultor = ({ userData }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-900 via-green-900 to-green-900 shadow-lg">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">
            {auth.currentUser?.displayName?.[0] || userData?.name?.[0] || "U"}
          </span>
        </div>

        {/* Nome e avaliação */}
        <div>
          <h1 className="text-xl font-semibold text-white">
            {auth.currentUser?.displayName || userData?.name || "Usuário"}
          </h1>
          <div className="flex space-x-1 text-yellow-400">⭐⭐⭐⭐☆</div>
        </div>
      </div>

      {/* Botão de Configurações */}
      <button
        onClick={() => navigate("settings")}
        className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition"
        title="Configurações"
      >
        ⚙️
      </button>
    </div>
  );
};

export default HeaderAgricultor;

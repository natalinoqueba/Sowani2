import React from "react";
import { auth } from "../../../firebase"; // caminho corrigido
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login"); // redireciona para a tela de login
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Terminar Sessão</h2>
      <p className="text-white/70 mb-6">
        Tem a certeza que deseja sair da aplicação?
      </p>
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
      >
        Sair da Conta
      </button>
    </div>
  );
};

export default Logout;

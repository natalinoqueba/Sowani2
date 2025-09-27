import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { logo } from "../../assets/assets";

const Landing = () => {
  const navigate = useNavigate();
  const [showSupport, setShowSupport] = useState(false);

  const downloadManual = () => {
    window.open("/manual.pdf", "_blank");
  };

  const callSupport = () => {
    window.location.href = "tel:+258840000000"; // número fictício
  };

  return (
    <div className="min-h-screen bg-[#02241B] text-white flex flex-col items-center justify-center text-center p-8 relative">
      {/* Logo */}
      <div className="w-32 h-32 rounded-full mb-5">
        <img src={logo} alt="Logo" className="w-full h-full rounded-full" />
      </div>  

      {/* Títulos */}
      <h1 className="text-3xl font-bold mb-2">SoWani</h1>
      <p className="text-md opacity-90 mb-8 text-[#B4CD89]">
        Conectar para crescer
      </p>
      {/* Card de idiomas */}
      <div className="bg-[#112C25]/30 backdrop-blur-md p-8 rounded-4xl max-w-md w-full mb-8 shadow-lg border border-white/20">
        <h2 className="text-2xl mb-4">Escolha o idioma</h2>
        <div className="flex flex-col gap-4 mt-8">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-4xl bg-[#FE9300] font-semibold transition transform hover:scale-105 hover:bg-[#E38004]/90"
          >
            Português
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-4xl bg-[#FE9300] font-semibold transition transform hover:scale-105 hover:bg-[#415651]"
          >
            Emakhuwa
          </button>
        </div>
      </div>

      {/* Botão de Suporte */}
      <button
        onClick={() => setShowSupport(!showSupport)}
        className="bg-[#DC2626] text-white font-bold w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-110 hover:bg-red-700"
      >
        ?
      </button>

      {/* Popup de Suporte */}
      {showSupport && (
        <>
          {/* Fundo escuro */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowSupport(false)}
          />

          {/* Popup */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-[#112C25]/70 backdrop-blur-md p-8 rounded-3xl w-[90%] max-w-md shadow-lg border border-white/20 relative text-center">
              {/* Botão fechar */}
              <button
                onClick={() => setShowSupport(false)}
                className="absolute top-4 right-4 text-white transition transform hover:scale-125 hover:rotate-90 hover:text-red-400"
              >
                <FaTimes size={20} />
              </button>

              <h3 className="text-xl font-semibold mb-6">Ajuda</h3>

              <div className="flex flex-col gap-4">
                <button
                  onClick={downloadManual}
                  className="px-6 py-3 rounded-4xl bg-[#FE9300] font-semibold transition transform hover:scale-105 hover:bg-[#E38004]/90"
                >
                  📄 Baixar Manual (PDF)
                </button>
                <button
                  onClick={callSupport}
                  className="px-6 py-3 rounded-4xl bg-[#FE9300] font-semibold transition transform hover:scale-105 hover:bg-[#415651]"
                >
                  📞 Ligar para Suporte
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;

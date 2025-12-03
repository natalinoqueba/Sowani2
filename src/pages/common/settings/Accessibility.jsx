import { /*useState*/ } from "react";
import { ArrowLeft, Volume2, Eye, Type } from "lucide-react";
import { useAccessibility } from "../../../context/AccessibilityContext";

const Accessibility = ({ onBack }) => {
  const { settings, toggle } = useAccessibility();

  return (
    <div className="p-4 text-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 px-2">
        <button
          onClick={onBack}
          className="text-white hover:bg-white/10 p-2 rounded-full w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">Acessibilidade</h2>
      </div>

      {/* Cards individuais */}
      <div className="space-y-4">
        {[
          { key: "screenReader", label: "Leitor de Tela", desc: "Ativar narração de elementos da tela", icon: <Volume2 className="w-6 h-6 text-orange-500" /> },
          { key: "audioPortuguese", label: "Áudio em Português", desc: "Narração em português", icon: <Volume2 className="w-6 h-6 text-orange-500" /> },
          { key: "audioEmakhuwa", label: "Áudio em Emakhuwa", desc: "Narração em Emakhuwa", icon: <Volume2 className="w-6 h-6 text-orange-500" /> },
          { key: "highContrast", label: "Alto Contraste", desc: "Aumentar contraste para melhor visualização", icon: <Eye className="w-6 h-6 text-orange-500" /> },
          { key: "largeText", label: "Texto Grande", desc: "Aumentar tamanho dos textos", icon: <Type className="w-6 h-6 text-orange-500" /> },
        ].map((item) => (
          <div key={item.key} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">{item.label}</h3>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            </div>
            {/* Switch */}
            <div
              onClick={() => toggle(item.key)}
              className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${settings[item.key] ? "bg-orange-500" : "bg-gray-600"}`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${settings[item.key] ? "translate-x-6" : ""}`}
              />
            </div>
          </div>
        ))}

        {/* Botões */}
        <div className="space-y-3 pt-6">
          <button
            onClick={() => alert("Configurações salvas!")}
            className="w-full bg-[#E18003] hover:bg-[#335048] h-14 rounded-2xl text-lg font-semibold"
          >
            Salvar
          </button>
          <button
            onClick={onBack}
            className="w-full bg-[#E18003] hover:bg-[#335048] h-14 rounded-2xl text-lg font-semibold"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;

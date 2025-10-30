import React, { useState } from "react";
import { ArrowLeft, MapPin } from "lucide-react";

const Privacy = ({ onBack }) => {
  const [shareLocation, setShareLocation] = useState(true);

  return (
    <div className="p-4 text-white">
      {/* Header interno - seta do card */}
      <div className="flex items-center gap-4 mb-6 px-2">
        <button
          onClick={onBack}
          className="text-white hover:bg-white/10 p-2 rounded-full w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">Privacidade</h2>
      </div>

      {/* Conteúdo */}
      <div className="space-y-4">
        {/* Card - Compartilhar Localização */}
        <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 rounded-lg bg-green-500/20">
              <MapPin className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">
                Compartilhar Localização
              </h3>
              <p className="text-white/70 text-sm">
                Compartilhar localização para entregas
              </p>
            </div>
          </div>

          {/* Switch */}
          <div
            onClick={() => setShareLocation(!shareLocation)}
            className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-colors ${
              shareLocation ? "bg-[#E18003]" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                shareLocation ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* Nota de Privacidade */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <p className="text-white/90 text-sm">
            <span className="font-bold">Nota:</span> Suas informações são protegidas e nunca serão compartilhadas sem sua permissão. Leia nossa política de privacidade completa para mais detalhes.
          </p>
        </div>

        {/* Botões */}
        <div className="space-y-3 pt-4">
          <button className="w-full bg-[#E18003] hover:bg-[#335048] h-14 rounded-2xl text-lg font-semibold">
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

export default Privacy;

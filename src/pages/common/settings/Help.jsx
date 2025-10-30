import { ArrowLeft, Download, Phone } from "lucide-react";

const Help = ({ onBack }) => {
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
        <h2 className="text-2xl font-bold-forced">Manual e Suporte</h2>
      </div>

      {/* Card único */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6">
        {/* Seção 1 - Como usar */}
        <div>
          <h3 className="text-orange-400 text-lg font-semibold mb-4">Como usar o SoWani:</h3>
          <ul className="space-y-3 text-white/90">
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold">•</span>
              <div>
                <span className="font-semibold">Vendedores:</span> Adicione produtos, gerencie pedidos e conecte-se com compradores
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold">•</span>
              <div>
                <span className="font-semibold">Compradores:</span> Descubra produtos locais, faça pedidos e conecte-se com fornecedores
              </div>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold">•</span>
              <div>
                <span className="font-semibold">Transportadores:</span> Ofereça serviços de entrega e conecte vendedores aos compradores
              </div>
            </li>
          </ul>
        </div>

        {/* Seção 2 - Recursos principais */}
        <div>
          <h3 className="text-orange-400 text-lg font-semibold mb-4">Recursos principais:</h3>
          <ul className="space-y-3 text-white/90">
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold">•</span>
              <div>Chat integrado para comunicação</div>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold">•</span>
              <div>Sistema de avaliações e comentários</div>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold">•</span>
              <div>Localização GPS para entregas</div>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400 font-bold">•</span>
              <div>IA para preenchimento automático de produtos</div>
            </li>
          </ul>
        </div>
      </div>

      {/* Botões */}
      <div className="space-y-3 pt-4">
        <button
          onClick={() => alert("Baixando manual completo...")}
          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white h-14 rounded-2xl text-lg font-semibold border border-white/10 transition"
        >
          <Download className="w-5 h-5" />
          Baixar Manual Completo
        </button>

        <button
          onClick={() => (window.location.href = 'tel:+258842422090')}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white h-14 rounded-2xl text-lg font-semibold transition"
        >
          <Phone className="w-5 h-5" />
          Ligar para Suporte: +258 84 242 2090
        </button>
      </div>
    </div>
  );
};

export default Help;

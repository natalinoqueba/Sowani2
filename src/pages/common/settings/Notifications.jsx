import React, { useState } from "react";
import { ArrowLeft, Package, Truck } from "lucide-react";

const Notifications = ({ onBack }) => {
  // Estados para controlar cada switch
  const [newOrdersEnabled, setNewOrdersEnabled] = useState(true);
  const [deliveryUpdatesEnabled, setDeliveryUpdatesEnabled] = useState(true);

  return (
    <div className="p-4 text-white">
      {/* Header - seta de voltar */}
      <div className="flex items-center gap-4 mb-6 px-2">
        <button
          onClick={onBack}
          className="text-white hover:bg-white/10 p-2 rounded-full w-10 h-10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">Notificações</h2>
      </div>

      {/* Conteúdo */}
      <div className="space-y-4">
        {/* Card - Novos Pedidos */}
        <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Package className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">
                Novos Pedidos
              </h3>
              <p className="text-white/70 text-sm">
                Alertas sobre novos pedidos recebidos
              </p>
            </div>
          </div>
          {/* Switch */}
          <div
            onClick={() => setNewOrdersEnabled(!newOrdersEnabled)}
            className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-colors ${
              newOrdersEnabled ? "bg-[#E18003]" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                newOrdersEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* Card - Atualizações de Entrega */}
        <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Truck className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">
                Atualizações de Entrega
              </h3>
              <p className="text-white/70 text-sm">
                Status das entregas em andamento
              </p>
            </div>
          </div>
          {/* Switch */}
          <div
            onClick={() =>
              setDeliveryUpdatesEnabled(!deliveryUpdatesEnabled)
            }
            className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-colors ${
              deliveryUpdatesEnabled ? "bg-[#E18003]" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                deliveryUpdatesEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
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

export default Notifications;

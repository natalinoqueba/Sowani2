const OrderCard = ({ order, selectedOrder, onSelect, onAccept, onPickup, onDeliver }) => (
  <div
    className={`bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden cursor-pointer transition-all ${
      selectedOrder?.id === order.id ? "ring-2 ring-green-500" : ""
    }`}
    onClick={() => onSelect(order)}
  >
    <div className="flex items-center p-4">
      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-2xl mr-4 flex-shrink-0">
        {order.image || "📦"}
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-1">{order.productName}</h3>
        <div className="text-sm text-gray-300 mb-2">Quantidade: {order.quantity} unidades</div>
        <div className="text-xl font-bold text-orange-400">Comissão: {order.commission || 0} MZN</div>
      </div>

      <div className="ml-4">
        {order.status === "pendente" && <span className="badge-pending">Pendente</span>}
        {order.status === "aceito" && <span className="badge-accepted">Aceito</span>}
        {order.status === "coletado" && <span className="badge-picked">Coletado</span>}
        {order.status === "entregue" && <span className="badge-delivered">Aguardando Confirmação</span>}
      </div>
    </div>

    {/* Action Buttons */}
    <div className="p-4 pt-0">
      {order.status === "pendente" && (
        <button
          onClick={(e) => { e.stopPropagation(); onAccept(order.id); }}
          className="w-full bg-orange-500 text-white py-3 rounded-2xl font-bold hover:bg-orange-600 transition"
        >
          Assumir Transporte
        </button>
      )}
      {order.status === "aceito" && (
        <button
          onClick={(e) => { e.stopPropagation(); onPickup(order.id); }}
          className="w-full bg-blue-500 text-white py-3 rounded-2xl font-bold hover:bg-blue-600 transition"
        >
          Peguei
        </button>
      )}
      {order.status === "coletado" && (
        <button
          onClick={(e) => { e.stopPropagation(); onDeliver(order.id); }}
          className="w-full bg-purple-500 text-white py-3 rounded-2xl font-bold hover:bg-purple-600 transition"
        >
          Entregue
        </button>
      )}
      {order.status === "entregue" && (
        <div className="w-full bg-orange-500/20 text-orange-400 py-3 rounded-2xl font-bold text-center">
          Aguardando confirmação do comprador
        </div>
      )}
    </div>
  </div>
);

export default OrderCard;

import OrderCard from "./OrderCard";

const OrderList = ({ orders, selectedOrder, onSelect, onAccept, onPickup, onDeliver }) => (
  <div className="px-4 mb-24">
    <h2 className="text-2xl font-bold text-white mb-6">Entregas Pendentes</h2>
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-8 text-center">
          <div className="text-4xl mb-4">🚛</div>
          <p className="text-gray-300 text-lg">Nenhuma entrega pendente no momento</p>
          <p className="text-gray-400 text-sm mt-2">Volte mais tarde para novas oportunidades</p>
        </div>
      ) : (
        orders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            selectedOrder={selectedOrder}
            onSelect={onSelect}
            onAccept={onAccept}
            onPickup={onPickup}
            onDeliver={onDeliver}
          />
        ))
      )}
    </div>
  </div>
);

export default OrderList;

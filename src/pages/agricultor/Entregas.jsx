const Entregas = () => {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Entregas</h2>
      <p className="text-gray-300">Acompanhe suas entregas e status dos pedidos.</p>
      <div className="mt-6 space-y-4">
        <div className="bg-black/20 p-4 rounded-xl border border-white/20">
          <h3 className="font-semibold">Pedido #001</h3>
          <p className="text-gray-300 text-sm">Status: Pendente</p>
        </div>
        <div className="bg-black/20 p-4 rounded-xl border border-white/20">
          <h3 className="font-semibold">Pedido #002</h3>
          <p className="text-gray-300 text-sm">Status: Entregue</p>
        </div>
      </div>
    </div>
  )
}

export default Entregas

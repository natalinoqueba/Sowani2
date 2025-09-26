const Stats = ({ products }) => {
  const totalProducts = products.length
  const totalSold = products.reduce((sum, p) => sum + (p.sold || 0), 0)
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * (p.sold || 0)), 0)

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Estatísticas</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/20 rounded-2xl p-6 border border-white/30 text-center">
          <div className="text-orange-400 text-2xl mb-2">📦</div>
          <div className="text-3xl font-bold">{totalProducts}</div>
          <div className="text-gray-300 text-sm">Produtos</div>
        </div>
        <div className="bg-black/20 rounded-2xl p-6 border border-white/30 text-center">
          <div className="text-orange-400 text-2xl mb-2">📈</div>
          <div className="text-3xl font-bold">{totalSold}</div>
          <div className="text-gray-300 text-sm">Vendas</div>
        </div>
        <div className="bg-black/20 rounded-2xl p-6 border border-white/30 text-center">
          <div className="text-green-400 text-2xl mb-2">💰</div>
          <div className="text-3xl font-bold">{totalRevenue} MZN</div>
          <div className="text-gray-300 text-sm">Receita</div>
        </div>
      </div>
    </div>
  )
}

export default Stats

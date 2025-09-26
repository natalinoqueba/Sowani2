const Feed = ({ products, onEdit, onDelete }) => (
  <div className="px-4">
    {/* Título do Feed */}
    <h2 className="text-2xl font-bold text-white mb-4">Meus Produtos</h2>

    {/* Lista de Produtos */}
    <div className="space-y-4">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-black/20 rounded-2xl border border-white/20 overflow-hidden p-4 flex justify-between items-center hover:shadow-lg transition"
        >
          <div>
            <h3 className="text-lg font-semibold text-white">{p.name}</h3>
            <p className="text-gray-300">Qtd: {p.quantity}</p>
            <p className="text-gray-300">Preço: {p.price} MZN</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(p)}
              className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(p.id)}
              className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition"
            >
              🗑
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default Feed

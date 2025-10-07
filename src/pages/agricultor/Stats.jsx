import { useState } from "react";
import { FaStar, FaUser, FaTruck, FaMapMarkerAlt } from "react-icons/fa";

const Stats = ({ products = [], pedidosRecentes = [] }) => {
  const [activeTab, setActiveTab] = useState("pedidos");

  // Proteção caso products seja undefined/null
  const totalProducts = products.length;
  const totalSold = products.reduce((sum, p) => sum + (p?.sold || 0), 0);
  const totalRevenue = products.reduce((sum, p) => sum + ((p?.price || 0) * (p?.sold || 0)), 0);

  // Top 3 produtos mais vendidos
  const topProducts = [...products]
    .sort((a, b) => (b?.sold || 0) - (a?.sold || 0))
    .slice(0, 3);

  return (
    <div className="text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Estatísticas</h2>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
        {/* Avaliação por estrelas */}
        <div className="bg-black/20 rounded-2xl p-6 border border-white/30 text-center">
          <div className="text-yellow-400 text-2xl mb-2">⭐</div>
          <div className="flex justify-center mb-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 mx-0.5" />
            ))}
          </div>
          <div className="text-gray-300 text-sm">Avaliação</div>
        </div>
      </div>

      {/* Tabs slider */}
      <div className="flex space-x-4 overflow-x-auto mb-4">
        <button
          onClick={() => setActiveTab("pedidos")}
          className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition ${
            activeTab === "pedidos"
              ? "bg-indigo-500 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          Pedidos Recentes
        </button>
        <button
          onClick={() => setActiveTab("topProdutos")}
          className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition ${
            activeTab === "topProdutos"
              ? "bg-indigo-500 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          Top Produtos
        </button>
      </div>

      {/* Conteúdo do slider */}
      <div className="space-y-4">
        {activeTab === "pedidos" && (
          <div className="space-y-3">
            {pedidosRecentes.length === 0 && (
              <p className="text-gray-300">Nenhum pedido recente.</p>
            )}
            {pedidosRecentes.map((pedido) => (
              <div
                key={pedido.id}
                className="bg-black/20 p-4 rounded-xl border border-white/20"
              >
                {/* Topo: Pedido nº e Status */}
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Pedido #{pedido.id}</span>
                  <span className="text-gray-300">{pedido.status}</span>
                </div>

                {/* Produto + quantidade */}
                <div className="flex justify-between text-gray-300 mb-2">
                  <span>{pedido.produto}</span>
                  <span>{pedido.quantidade}</span>
                </div>

                {/* Ícones de info */}
                <div className="flex items-center gap-4 text-gray-300 text-sm mb-2">
                  <div className="flex items-center gap-1">
                    <FaUser />
                    <span>{pedido.comprador}</span>
                  </div>
                  {pedido.transportador && (
                    <div className="flex items-center gap-1">
                      <FaTruck />
                      <span>{pedido.transportador}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt />
                    <span>
                      {pedido.origem} → {pedido.destino}
                    </span>
                  </div>
                </div>

                <hr className="border-white/20 my-1" />

                {/* Data e valor */}
                <div className="flex justify-between text-gray-300 text-sm">
                  <span>{pedido.data}</span>
                  <span>{pedido.preco}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "topProdutos" && (
          <div className="space-y-2">
            {topProducts.length === 0 && (
              <p className="text-gray-300">Nenhum produto disponível.</p>
            )}
            {topProducts.map((p, index) => (
              <div
                key={p.id}
                className="flex justify-between bg-black/20 p-3 rounded-xl border border-white/20"
              >
                <span className="font-semibold">{index + 1}.</span>
                <span className="flex-1 mx-2">{p.produto}</span>
                <span className="text-gray-300">{p.sold || 0} vendidos</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;

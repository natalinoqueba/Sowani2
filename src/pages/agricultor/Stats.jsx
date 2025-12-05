import { useState } from "react";
import { FaStar, FaUser, FaTruck, FaMapMarkerAlt, FaBox } from "react-icons/fa";

const Stats = ({ products = [], pedidosRecentes = [] }) => {
  const [activeTab, setActiveTab] = useState("pedidos");

  // Proteção caso products seja undefined/null
  const totalProducts = products.length;
  const totalSold = products.reduce((sum, p) => sum + (p?.sold || 0), 0);
  const totalRevenue = products.reduce((sum, p) => sum + ((p?.price || 0) * (p?.sold || 0)), 0);
  const totalVisualizations = products.reduce((sum, p) => sum + (p?.views || 0), 0);

  // Top 3 produtos MENOS vendidos (ordem crescente)
  const topProducts = [...products]
    .sort((a, b) => (a?.sold || 0) - (b?.sold || 0))
    .slice(0, 3);

  // Dados fictícios para pedidos recentes
  const mockPedidosRecentes = pedidosRecentes.length > 0 ? pedidosRecentes : [
    {
      id: 1001,
      produto: "Tomate Fresco",
      quantidade: "50 kg",
      comprador: "João Silva",
      transportador: "Carlos Santos",
      origem: "Matosinhos",
      destino: "Lourenço Marques",
      data: "2024-01-15",
      preco: "1500 MZN",
      status: "Entregue"
    },
    {
      id: 1002,
      produto: "Milho Amarelo",
      quantidade: "100 kg",
      comprador: "Maria Costa",
      transportador: "João Ferreira",
      origem: "Inhambane",
      destino: "Xai-Xai",
      data: "2024-01-14",
      preco: "2000 MZN",
      status: "Em Transit"
    },
    {
      id: 1003,
      produto: "Batata Doce",
      quantidade: "75 kg",
      comprador: "Pedro Oliveira",
      transportador: "Manuel Dias",
      origem: "Gaza",
      destino: "Beira",
      data: "2024-01-13",
      preco: "1800 MZN",
      status: "Pendente"
    }
  ];

  // Contar entregas concluídas e pendentes
  const entregasConcluidas = mockPedidosRecentes.filter(
    (p) => p.status === "Entregue"
  ).length;
  const entregasPendentes = mockPedidosRecentes.filter(
    (p) => p.status === "Pendente" || p.status === "Em Transit"
  ).length;

  return (
    <div className="h-fit text-white p-6">
      <h2 className="text-2xl font-bold mb4">Estatísticas</h2>

      {/* Cards de estatísticas */}
      <div className="h-fit grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Vendas Totais */}
        <div className="bg-black/20 rounded-2xl p-6 border border-white/30 text-center">
          <div className="text-orange-400 text-2xl mb-2">📈</div>
          <div className="text-3xl font-bold">{totalRevenue}</div>
          <div className="text-gray-300 text-sm">Vendas Totais (MZN)</div>
        </div>

        {/* Pedidos */}
        <div className="bg-black/20 rounded-2xl p-6 border border-white/30 text-center">
          <div className="text-green-400 text-2xl mb-2">📦</div>
          <div className="text-3xl font-bold">{totalSold}</div>
          <div className="text-gray-300 text-sm">Pedidos</div>
        </div>

        {/* Visualizações */}
        <div className="bg-black/20 rounded-2xl p-6 border border-white/30 text-center">
          <div className="text-blue-400 text-2xl mb-2">👁</div>
          <div className="text-3xl font-bold">{totalVisualizations}</div>
          <div className="text-gray-300 text-sm">Visualizações</div>
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
      <div className="space-y-3">
        {activeTab === "pedidos" && (
          <div className="space-y-3">
            {mockPedidosRecentes.length === 0 && (
              <p className="text-gray-300">Nenhum pedido recente.</p>
            )}
            {mockPedidosRecentes.map((pedido) => (
              <div
                key={pedido.id}
                className="bg-black/20 p-4 rounded-xl border border-white/20"
              >
                {/* Topo: Pedido nº e Status */}
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Pedido #{pedido.id}</span>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      pedido.status === "Entregue"
                        ? "bg-green-500/30 text-green-300"
                        : pedido.status === "Em Transit"
                        ? "bg-blue-500/30 text-blue-300"
                        : "bg-yellow-500/30 text-yellow-300"
                    }`}
                  >
                    {pedido.status}
                  </span>
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
                <span className="flex-1 mx-2">{p.name || p.produto}</span>
                <span className="text-gray-300">{p.sold || 0} vendidos</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Seção de status de entregas */}
      <div className="mt-8 bg-black/20 rounded-2xl p-6 border border-white/30">
        <h3 className="text-lg font-bold mb-4 text-white">Status de Entregas</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/40 rounded-xl p-4 border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Concluídas</span>
            </div>
            <div className="text-3xl font-bold text-green-400">{entregasConcluidas}</div>
          </div>
          <div className="bg-black/40 rounded-xl p-4 border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-300">Pendentes</span>
            </div>
            <div className="text-3xl font-bold text-yellow-400">{entregasPendentes}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

import { useState } from "react";
import { FaUser, FaTruck, FaMapMarkerAlt } from "react-icons/fa";

const pedidos = [
  {
    id: "12344",
    produto: "Batata Doce",
    quantidade: "30kg",
    status: "pending",
    comprador: "Ana Silva",
    transportador: null,
    origem: "Nampula",
    destino: "Nacala",
    data: "2024-10-05",
    preco: "900 MZN",
  },
  {
    id: "12345",
    produto: "Tomates Frescos",
    quantidade: "50kg",
    status: "inTransit",
    comprador: "Maria Santos",
    transportador: "Carlos Moreira",
    origem: "Maputo",
    destino: "Matola",
    data: "2024-10-05",
    preco: "2500 MZN",
  },
  {
    id: "12343",
    produto: "Milho",
    quantidade: "100kg",
    status: "delivered",
    comprador: "José Machado",
    transportador: "Carlos Moreira",
    origem: "Chimoio",
    destino: "Beira",
    data: "2024-10-03",
    preco: "3000 MZN",
  },
];

const Entregas = () => {
  const [statusFiltro, setStatusFiltro] = useState("pending");

  const filteredPedidos = pedidos.filter((p) => p.status === statusFiltro);

  return (
    <div className="text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Entregas</h2>
      <p className="text-gray-300">Acompanhe suas entregas e status dos pedidos.</p>

      {/* Slider / Tabs */}
      <div className="flex space-x-3 overflow-x-auto py-4 mb-6">
        {["pending", "inTransit", "delivered"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFiltro(status)}
            className={`flex-shrink-0 px-3 py-2 rounded-full font-medium transition ${
              statusFiltro === status
                ? "bg-indigo-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {status === "pending" && "Pendentes"}
            {status === "inTransit" && "Em Trânsito"}
            {status === "delivered" && "Entregues"}
          </button>
        ))}
      </div>

      {/* Lista de pedidos */}
      <div className="space-y-4">
        {filteredPedidos.map((p) => (
          <div
            key={p.id}
            className="bg-black/20 p-4 rounded-xl border border-white/20"
          >
            {/* Topo: Pedido nº e Status */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">Pedido #{p.id}</h3>
              <span
                className={`font-semibold ${
                  p.status === "pending"
                    ? "text-yellow-400"
                    : p.status === "inTransit"
                    ? "text-indigo-400"
                    : "text-green-400"
                }`}
              >
                {p.status === "pending"
                  ? "Pendente"
                  : p.status === "inTransit"
                  ? "Em Trânsito"
                  : "Entregue"}
              </span>
            </div>

            {/* Produto + quantidade */}
            <div className="flex space-x-1 items-center mb-2">
              <h4 className="font-medium">{p.produto} -</h4>
              <span className="text-gray-300 text-sm">{p.quantidade}</span>
            </div>

            {/* Ícones de info */}
            <div className="flex flex-col  gap-4 text-gray-300 text-sm mb-2">
              <div className="flex items-center gap-1">
                <FaUser />
                <span>{p.comprador}</span>
              </div>
              {p.transportador && (
                <div className="flex items-center gap-1">
                  <FaTruck />
                  <span>{p.transportador}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt />
                <span>
                  {p.origem} → {p.destino}
                </span>
              </div>
            </div>

            <hr className="border-white/20 my-2" />

            {/* Data e valor */}
            <div className="flex justify-between text-gray-300 text-sm">
              <span>{p.data}</span>
              <span>{p.preco}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entregas;

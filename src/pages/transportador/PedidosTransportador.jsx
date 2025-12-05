import { useState } from "react";
import { FaUser, FaTruck, FaMapMarkerAlt } from "react-icons/fa";

const samplePedidos = [
  {
    id: "T-9001",
    produto: "Caixa de Tomate",
    quantidade: "200 kg",
    status: "pending",
    comprador: "António Gomes",
    transportador: null,
    origem: "Maputo",
    destino: "Xai-Xai",
    data: "2024-11-01",
    preco: "4500 MZN",
  },
  {
    id: "T-9002",
    produto: "Saco de Milho",
    quantidade: "500 kg",
    status: "inTransit",
    comprador: "Catarina Melo",
    transportador: "Rui Pereira",
    origem: "Beira",
    destino: "Chimoio",
    data: "2024-10-28",
    preco: "12000 MZN",
  },
  {
    id: "T-9003",
    produto: "Palhete de Batata",
    quantidade: "300 kg",
    status: "delivered",
    comprador: "Miguel Santos",
    transportador: "Rui Pereira",
    origem: "Nampula",
    destino: "Nacala",
    data: "2024-10-20",
    preco: "7500 MZN",
  },
];

const PedidosTransportador = () => {
  const [statusFiltro, setStatusFiltro] = useState("pending");

  const filtered = samplePedidos.filter((p) => p.status === statusFiltro);

  return (
    <div className="text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
      <p className="text-gray-300">Lista de pedidos que você pode assumir e acompanhar.</p>

      <div className="flex space-x-3 overflow-x-auto py-4 mb-6">
        {[
          { key: "pending", label: "Pendentes" },
          { key: "inTransit", label: "Em Trânsito" },
          { key: "delivered", label: "Entregues" },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setStatusFiltro(s.key)}
            className={`flex-shrink-0 px-3 py-2 rounded-full font-medium transition ${
              statusFiltro === s.key
                ? "bg-indigo-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((p) => (
          <div key={p.id} className="bg-black/20 p-4 rounded-xl border border-white/20">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">Pedido #{p.id}</h3>
              <span className={`font-semibold ${
                p.status === "pending" ? "text-yellow-400" : p.status === "inTransit" ? "text-indigo-400" : "text-green-400"
              }`}>
                {p.status === "pending" ? "Pendente" : p.status === "inTransit" ? "Em Trânsito" : "Entregue"}
              </span>
            </div>

            <div className="flex space-x-1 items-center mb-2">
              <h4 className="font-medium">{p.produto} -</h4>
              <span className="text-gray-300 text-sm">{p.quantidade}</span>
            </div>

            <div className="flex flex-col gap-4 text-gray-300 text-sm mb-2">
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

export default PedidosTransportador;

import { useState } from "react";

const Transport = () => {
  const [deliveries] = useState([
    {
      id: "#12344",
      product: "Batata Doce - 30kg",
      seller: "Pedro Costa",
      transporter: null,
      route: "Nampula → Nacala",
      date: "2024-10-05",
      amount: 900,
      status: "pendente",
    },
    {
      id: "#12345",
      product: "Tomates Frescos - 50kg",
      seller: "João Silva",
      transporter: "Transportes Rápidos Lda",
      route: "Matola → Maputo",
      date: "2024-10-06",
      amount: 1200,
      status: "em_transito",
    },
    {
      id: "#12346",
      product: "Cenouras - 25kg",
      seller: "Maria Santos",
      transporter: "LogiMovel Express",
      route: "Boane → Maputo Centro",
      date: "2024-10-04",
      amount: 750,
      status: "em_transito",
    },
    {
      id: "#12347",
      product: "Alface Fresca - 15kg",
      seller: "Carlos Oliveira",
      transporter: "Veloz Transportes",
      route: "Xai-Xai → Maputo",
      date: "2024-10-07",
      amount: 600,
      status: "em_transito",
    },
    {
      id: "#12348",
      product: "Mandioca - 40kg",
      seller: "Ana Machel",
      transporter: "Express Cargo Moçambique",
      route: "Chimoio → Beira",
      date: "2024-10-03",
      amount: 850,
      status: "entregue",
    },
  ]);

  const [activeTab, setActiveTab] = useState("pendentes");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { id: "pendentes", label: "Pendentes" },
    { id: "em_transito", label: "Em Trânsito" },
    { id: "entregues", label: "Entregues" },
  ];

  const getFilteredDeliveries = () => {
    let filtered = deliveries;

    // Filtra por aba
    if (activeTab === "pendentes") filtered = filtered.filter(d => d.status === "pendente");
    else if (activeTab === "em_transito") filtered = filtered.filter(d => d.status === "em_transito");
    else if (activeTab === "entregues") filtered = filtered.filter(d => d.status === "entregue");

    // Filtra por pesquisa
    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.route.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getStatusBadge = (status) => {
    const badges = {
      pendente: { text: "Pending", color: "text-yellow-400" },
      em_transito: { text: "In Transit", color: "text-blue-400" },
      entregue: { text: "Delivered", color: "text-green-400" },
    };
    return badges[status] || badges.pendente;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white pb-24">
      {/* Search Bar */}
      <div className="p-4 pt-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar entregas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 border border-white/10 rounded-2xl bg-black/20 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 rounded-2xl font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white"
                  : "bg-black/20 text-gray-300 hover:bg-black/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Deliveries List */}
      <div className="px-4 pb-6 space-y-4">
        {getFilteredDeliveries().map((delivery) => (
          <div
            key={delivery.id}
            className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm">Pedido {delivery.id}</span>
                <span className={`text-sm font-medium ${getStatusBadge(delivery.status).color}`}>
                  {getStatusBadge(delivery.status).text}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{delivery.product}</h3>

              <div className="flex items-center space-x-2 text-gray-300 mb-2">
                <span className="text-sm">Vendedor: {delivery.seller}</span>
              </div>

              {delivery.transporter && (
                <div className="flex items-center space-x-2 text-gray-300 mb-2">
                  <span className="text-sm">Transportadora: {delivery.transporter}</span>
                </div>
              )}

              <div className="flex items-center space-x-2 text-gray-300 mb-4">
                <span className="text-sm">{delivery.route}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-gray-400 text-sm">{delivery.date}</span>
                <span className="text-xl font-bold text-orange-400">{delivery.amount} MZN</span>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {getFilteredDeliveries().length === 0 && (
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-gray-300 text-lg mb-2">Nenhuma entrega encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transport;

import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, onSnapshot, updateDoc, doc } from "firebase/firestore";

import HeaderTransportador from "./HeaderTransportador";
import StatsCards from "./StatsCards";
import OrderList from "./OrderList";
import BottomTabsTransportador from "./BottomTabsTransportador";
import SettingsPanel from "../common/settings/SettingsPanel";
import ChatTransportador from "./ChatTransportador";
import PedidosTransportador from "./PedidosTransportador";
import { home, chatIcon, entregasIcon, statsIcon, settingsIcon } from "../../assets/assets";

const DashboardTransportador = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("Entregas");
  const [settingsOpen, setSettingsOpen] = useState(false); // ✅ controla o painel

  useEffect(() => {
    const q = query(collection(db, "orders"));
    const unsubscribe = onSnapshot(q, snapshot => {
      const fetchedOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(fetchedOrders);
      if (!selectedOrder && fetchedOrders.length > 0) setSelectedOrder(fetchedOrders[0]);
    });
    return () => unsubscribe();
  }, [selectedOrder]);

  const completedDeliveries = orders.filter(o => o.status === "entregue_confirmado").length;
  const totalEarnings = orders
    .filter(o => o.status === "entregue_confirmado")
    .reduce((sum, o) => sum + (o.commission || 0), 0);

  const handleAcceptDelivery = async (id) => {
    await updateDoc(doc(db, "orders", id), { status: "aceito" });
    alert("Transporte assumido!");
  };
  const handlePickup = async (id) => {
    await updateDoc(doc(db, "orders", id), { status: "coletado" });
    alert("Produto coletado!");
  };
  const handleDelivery = async (id) => {
    await updateDoc(doc(db, "orders", id), { status: "entregue" });
    alert("Entrega realizada!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white pb-24">
      {/* ✅ Passa a função para o header */}
      <HeaderTransportador name="Joaquim" onOpenSettings={() => setSettingsOpen(true)} />

      {/* Aba Entregas */}
      {activeTab === "Entregas" && (
        <>
          <StatsCards completedDeliveries={completedDeliveries} totalEarnings={totalEarnings} />
          <OrderList
            orders={orders.filter(o => o.status !== "entregue_confirmado")}
            selectedOrder={selectedOrder}
            onSelect={setSelectedOrder}
            onAccept={handleAcceptDelivery}
            onPickup={handlePickup}
            onDeliver={handleDelivery}
          />
        </>
      )}

      {/* Aba Pedidos */}
      {activeTab === "Pedidos" && <PedidosTransportador />}

      {/* Aba Chat */}
      {activeTab === "Chat" && <ChatTransportador />}

      <BottomTabsTransportador
        tabs={[
          { name: "Entregas", icon: home },
          { name: "Pedidos", icon: entregasIcon },
          { name: "Chat", icon: chatIcon },
          { name: "Configurações", icon: settingsIcon },
        ]}
        activeTab={activeTab}
        onTabClick={(tabName) => {
          if (tabName === "Configurações") setSettingsOpen(true);
          else setActiveTab(tabName);
        }}
      />

      {/* ✅ O painel aparece sobre o dashboard */}
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
};

export default DashboardTransportador;

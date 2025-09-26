import { useState, useEffect } from "react"
import { db } from "../../firebase"
import { collection, query, onSnapshot, updateDoc, doc } from "firebase/firestore"

import HeaderTransportador from "./HeaderTransportador"
import StatsCards from "./StatsCards"
import OrderList from "./OrderList"
import BottomTabsTransportador from "./BottomTabsTransportador"

const DashboardTransportador = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [activeTab, setActiveTab] = useState("Entregas")

  useEffect(() => {
    const q = query(collection(db, "orders"))
    const unsubscribe = onSnapshot(q, snapshot => {
      const fetchedOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setOrders(fetchedOrders)
      if (!selectedOrder && fetchedOrders.length > 0) setSelectedOrder(fetchedOrders[0])
    })
    return () => unsubscribe()
  }, [selectedOrder])

  const completedDeliveries = orders.filter(o => o.status === "entregue_confirmado").length
  const totalEarnings = orders.filter(o => o.status === "entregue_confirmado").reduce((sum, o) => sum + (o.commission || 0), 0)

  const handleAcceptDelivery = async (id) => { await updateDoc(doc(db, "orders", id), { status: "aceito" }); alert("Transporte assumido!") }
  const handlePickup = async (id) => { await updateDoc(doc(db, "orders", id), { status: "coletado" }); alert("Produto coletado!") }
  const handleDelivery = async (id) => { await updateDoc(doc(db, "orders", id), { status: "entregue" }); alert("Entrega realizada!") }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white pb-24">
      <HeaderTransportador transporterName="Joaquim" completedDeliveries={completedDeliveries} />
      <StatsCards completedDeliveries={completedDeliveries} totalEarnings={totalEarnings} />
      <OrderList
        orders={orders.filter(o => o.status !== "entregue_confirmado")}
        selectedOrder={selectedOrder}
        onSelect={setSelectedOrder}
        onAccept={handleAcceptDelivery}
        onPickup={handlePickup}
        onDeliver={handleDelivery}
      />
      <BottomTabsTransportador
        tabs={[
          { name: "Entregas", icon: "🚛" },
          { name: "Pedidos", icon: "📦" },
          { name: "Chat", icon: "💬" }
        ]}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
    </div>
  )
}

export default DashboardTransportador

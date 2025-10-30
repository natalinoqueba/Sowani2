import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { Outlet } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import Feed from "./Feed";
import Chat from "./Chat";
import Entregas from "./Entregas";
import Stats from "./Stats";
import AddProductPopup from "./AddProductPopup";
import EditProductModal from "./EditProductModal";
import HeaderAgricultor from "./HeaderAgricultor";
import TabsAgricultor from "./TabsAgricultor";
import SettingsPanel from "../common/settings/SettingsPanel"; // Painel de definições

const DashboardAgricultor = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Feed");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [userData, setUserData] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false); // Estado do painel de configurações

  // Busca produtos do agricultor
  const fetchProducts = async () => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "products"),
      where("ownerId", "==", auth.currentUser.uid)
    );
    const snapshot = await getDocs(q);
    setProducts(
      snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }))
    );
  };

  // Busca dados do usuário
  const fetchUserData = async () => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      setUserData(userSnap.data());
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUserData();
  }, []);

  // Adicionar produto
  const handleAdd = async (product) => {
    await addDoc(collection(db, "products"), {
      ...product,
      ownerId: auth.currentUser.uid,
      sold: 0,
    });
    fetchProducts();
  };

  // Deletar produto
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  // Atualizar produto
  const handleUpdate = async (product) => {
    await updateDoc(doc(db, "products", product.id), product);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white">
      {/* Header com botão de configurações */}
      <HeaderAgricultor 
        userData={userData} 
        onOpenSettings={() => setSettingsOpen(true)} 
      />

      {/* Conteúdo das abas */}
      <div className="px-4 mb-32 mt-6">
        {activeTab === "Feed" && (
          <Feed
            products={products}
            onEdit={setEditingProduct}
            onDelete={handleDelete}
          />
        )}
        {activeTab === "Chat" && <Chat />}
        {activeTab === "Entregas" && <Entregas />}
        {activeTab === "Stats" && <Stats products={products} />}
        <Outlet />
      </div>

      {/* Botão flutuante para adicionar produto */}
      {activeTab === "Feed" && (
        <button
          onClick={() => setShowAddPopup(true)}
          className="fixed bottom-24 right-6 w-16 h-16 bg-green-600 rounded-full text-2xl flex items-center justify-center shadow-lg hover:bg-green-700"
        >
          ➕
        </button>
      )}

      {/* Tabs com função para abrir painel de configurações */}
      <TabsAgricultor 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenSettings={() => setSettingsOpen(true)} 
      />

      {/* Popups */}
      <AddProductPopup
        isOpen={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        onAdd={handleAdd}
      />
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onUpdate={handleUpdate}
        />
      )}

      {/* Painel de Configurações */}
      <SettingsPanel 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />
    </div>
  );
};

export default DashboardAgricultor;

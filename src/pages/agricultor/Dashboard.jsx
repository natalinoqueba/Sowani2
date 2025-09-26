import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { useNavigate, Outlet } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Feed from "./Feed";
import Chat from "./Chat";
import Entregas from "./Entregas";
import Stats from "./Stats";
import AddProductPopup from "./AddProductPopup";
import EditProductModal from "./EditProductModal";

const DashboardAgricultor = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Feed");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate();

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (product) => {
    await addDoc(collection(db, "products"), {
      ...product,
      ownerId: auth.currentUser.uid,
      sold: 0,
    });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const handleUpdate = async (product) => {
    await updateDoc(doc(db, "products", product.id), product);
    fetchProducts();
  };

  const tabs = ["Feed", "Chat", "Entregas", "Stats"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-900 via-green-900 to-green-900 shadow-lg ">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">
              {auth.currentUser?.displayName?.[0] || "U"}
            </span>
          </div>

          {/* Nome e avaliação */}
          <div>
            <h1 className="text-xl font-semibold text-white">
              {auth.currentUser?.displayName || "Usuário"}
            </h1>
            <div className="flex space-x-1 text-yellow-400">⭐⭐⭐⭐☆</div>
          </div>
        </div>

        {/* Botão de Configurações */}
        <button
          onClick={() => navigate("settings")}
          className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition"
          title="Configurações"
        >
          ⚙️
        </button>
      </div>

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

        {/* Aqui o Outlet renderiza rotas filhas, como settings */}
        <Outlet />
      </div>

      {/* Botão flutuante adicionar produto */}
      {activeTab === "Feed" && (
        <button
          onClick={() => setShowAddPopup(true)}
          className="fixed bottom-24 right-6 w-16 h-16 bg-green-600 rounded-full text-2xl flex items-center justify-center shadow-lg hover:bg-green-700"
        >
          ➕
        </button>
      )}

      {/* Tabs fixas no bottom */}
      <div className="fixed bottom-0 left-0 right-0 flex bg-black/20 rounded-t-3xl p-4 border border-white/30">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-center py-3 rounded-full transition-all ${
              activeTab === tab
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

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
    </div>
  );
};

export default DashboardAgricultor;

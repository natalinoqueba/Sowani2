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

const DashboardAgricultor = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Feed");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [userData, setUserData] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white">
      {/* Header separado */}
      <HeaderAgricultor userData={userData} />

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

        {/* Outlet para rotas filhas */}
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

      {/* Tabs separadas */}
      <TabsAgricultor activeTab={activeTab} setActiveTab={setActiveTab} />

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

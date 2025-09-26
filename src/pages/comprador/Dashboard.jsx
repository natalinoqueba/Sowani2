import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import Header from "./Header";
import TopTabs from "./TopTabs";
import BottomTabs from "./BottomTabs";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import SupplierSlider from "./SupplierSlider";
import Cart from "./Cart";

const DashboardComprador = () => {
  const [products, setProducts] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);
  const [activeTopTab, setActiveTopTab] = useState("Descobrir");
  const [activeBottomTab, setActiveBottomTab] = useState("Feed");
  const [cart, setCart] = useState([]);
  const [selectedQty, setSelectedQty] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const bottomTabs = [
    { name: "Feed", icon: "🏠" },
    { name: "Carrinho", icon: "🛒" },
    { name: "Pedidos", icon: "📦" },
    { name: "Chat", icon: "💬" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const allProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(allProducts);

      const suppliers = [
        { id: "s1", name: "João Silva", location: "Matola Gare" },
        { id: "s2", name: "Maria Santos", location: "Nampula Centro" },
        { id: "s3", name: "Carlos Pereira", location: "Maputo Cidade" }
      ];

      const suppliersWithProducts = suppliers.map(s => ({
        ...s,
        products: allProducts.filter((_, i) => i % suppliers.length === suppliers.indexOf(s))
      }));

      setSuppliersData(suppliersWithProducts);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = product => {
    const quantity = parseInt(selectedQty[product.id]) || 1;
    if (quantity <= 0 || quantity > product.quantity) return;

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, cartQuantity: item.cartQuantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, cartQuantity: quantity }]);
    }
    setSelectedQty({ ...selectedQty, [product.id]: "" });
  };

  const handleBuyNow = product => alert(`Comprou ${product.name} por ${product.price} MZN ✅`);
  const handleCheckout = () => {
    alert("Compra finalizada 🎉");
    setCart([]);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartItemsCount = cart.reduce((sum, item) => sum + (item.cartQuantity || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white pb-24">
      <Header onSettings={() => alert("Abrir settings")} />

      {activeBottomTab === "Feed" && (
        <>
          <TopTabs
            tabs={["Descobrir", "Meus Fornecedores"]}
            activeTab={activeTopTab}
            onTabClick={setActiveTopTab}
          />
          <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

          {activeTopTab === "Descobrir" && (
            <div className="px-4 space-y-4">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selectedQty={selectedQty}
                  setSelectedQty={setSelectedQty}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                />
              ))}
            </div>
          )}

          {activeTopTab === "Meus Fornecedores" &&
            suppliersData.map(supplier => (
              <SupplierSlider
                key={supplier.id}
                supplier={supplier}
                selectedQty={selectedQty}
                setSelectedQty={setSelectedQty}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            ))}
        </>
      )}

      {activeBottomTab === "Carrinho" && <Cart cart={cart} onCheckout={handleCheckout} />}
      {activeBottomTab === "Pedidos" && <p className="px-4 mt-4">Seus pedidos aparecerão aqui.</p>}
      {activeBottomTab === "Chat" && <p className="px-4 mt-4">Chat do comprador.</p>}

      <BottomTabs
        tabs={bottomTabs}
        activeTab={activeBottomTab}
        onTabClick={setActiveBottomTab}
        cartItemsCount={cartItemsCount}
      />
    </div>
  );
};

export default DashboardComprador;

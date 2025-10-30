import { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Tomates Frescos", seller: "João Silva", price: 50, quantity: 2, unit: "kg", initial: "T" },
    { id: 2, name: "Batata Doce", seller: "Maria Santos", price: 30, quantity: 5, unit: "kg", initial: "B" }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white pb-24">

      {/* Header destacado */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-grey/70 border border-white/20 rounded-b-md shadow-xl p-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white tracking-wide">Carrinho</h1>
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-md">
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg">U</div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4 mt-6 space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl flex items-center justify-center text-2xl font-bold mr-4 flex-shrink-0">
                  {item.initial}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-300 mb-2">Vendedor: {item.seller}</p>
                  <div className="text-xl font-bold text-orange-400">{item.price} MZN / {item.unit}</div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-400 hover:text-red-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>

                  <span className="text-lg font-semibold text-white min-w-[60px] text-center">
                    {item.quantity} {item.unit}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black/20 px-4 py-3 flex items-center justify-between">
              <span className="text-gray-300">Subtotal:</span>
              <span className="text-xl font-bold text-white">{(item.price * item.quantity).toFixed(2)} MZN</span>
            </div>
          </div>
        ))}
      </div>

      {/* Total Summary */}
      <div className="px-4 mt-6">
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Subtotal:</span>
              <span className="text-xl font-semibold text-white">{subtotal.toFixed(2)} MZN</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-300">Frete:</span>
              <span className="text-green-400 text-sm">A calcular</span>
            </div>

            <div className="border-t border-white/10 pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-lg">Total:</span>
                <span className="text-2xl font-bold text-orange-400">{total.toFixed(2)} MZN</span>
              </div>
            </div>
          </div>

          <button className="w-24 mt-2 bg-orange-500 text-white py-2 rounded-xl font-semibold text-base hover:bg-[#16683b] transition-colors">
            Checkout
          </button>
        </div>
      </div>

      {/* Empty State */}
      {cartItems.length === 0 && (
        <div className="px-4 mt-6">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center">
            <div className="text-5xl mb-4">🛒</div>
            <p className="text-gray-300 text-lg mb-2">Seu carrinho está vazio</p>
            <p className="text-gray-400 text-sm">Adicione produtos para começar suas compras</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

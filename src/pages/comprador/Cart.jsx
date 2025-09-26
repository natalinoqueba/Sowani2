const Cart = ({ cart, onCheckout }) => {
  const totalItems = cart.reduce((sum, item) => sum + (item.cartQuantity || 0), 0)
  const totalPrice = cart.reduce((sum, item) => sum + (item.cartQuantity * item.price || 0), 0)

  return (
    <div className="px-4 space-y-4">
      <h2 className="text-xl font-bold mb-2">Carrinho ({totalItems})</h2>
      {cart.length === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between bg-black/20 p-4 rounded-2xl">
              <span>{item.name} x {item.cartQuantity}</span>
              <span>{item.price * item.cartQuantity} MZN</span>
            </div>
          ))}
          <div className="font-bold text-right">Total: {totalPrice} MZN</div>
          <button
            onClick={onCheckout}
            className="w-full bg-green-700 py-3 rounded-xl text-white font-bold hover:bg-green-800 transition"
          >
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  )
}

export default Cart;

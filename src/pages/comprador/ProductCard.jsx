import { FaPlus } from "react-icons/fa";

const ProductCard = ({ product, selectedQty, setSelectedQty, onAddToCart, onBuyNow }) => (
  <div className="bg-black/20 p-4 rounded-2xl border border-black/30 flex flex-col justify-between transition-transform duration-200 hover:scale-105">
    {/* Imagem */}
    <div className="w-full h-40 bg-gray-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-3">
      Img
    </div>

    {/* Detalhes */}
    <h3 className="font-bold text-xl">{product.name}</h3>
    <p className="text-sm text-gray-300">Qtd: {product.quantity}</p>
    <p className="text-orange-400 font-bold">{product.price} MZN</p>
    <p className="text-sm text-gray-300">{product.seller || "Fornecedor"}</p>

    {/* Botões */}
    <div className="mt-3 flex items-center gap-2">
      <input
        type="number"
        min="1"
        max={product.quantity}
        value={selectedQty[product.id] || ""}
        onChange={e => setSelectedQty({ ...selectedQty, [product.id]: e.target.value })}
        placeholder="Qtd"
        className="w-16 text-white rounded border border-white/30 bg-black/20 px-2 py-1 text-center"
      />
      <button onClick={() => onAddToCart(product)} className="bg-[#F28705] p-2 rounded-full text-white hover:bg-gray-600">
        <FaPlus />
      </button>
      <button onClick={() => onBuyNow(product)} className="bg-green-600 px-3 py-2 rounded text-white hover:bg-green-700">
        Comprar
      </button>
    </div>
  </div>
);

export default ProductCard;

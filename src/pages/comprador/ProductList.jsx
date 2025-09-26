import { FaPlus, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductList = ({ products, selectedQty, setSelectedQty, onAddToCart, onBuyNow }) => (
  <div className="px-4">
    <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
      {products.map(product => (
        <div
          key={product.id}
          className="flex-shrink-0 w-72 bg-black/20 p-4 rounded-2xl border border-black/30 snap-start transition-transform duration-200 hover:scale-105"
        >
          {/* Imagem */}
          <div className="w-full h-40 bg-gray-600 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-3">
            Img
          </div>

          {/* Detalhes do produto */}
          <div className="flex flex-col justify-between">
            <h3 className="font-bold text-xl">{product.name}</h3>
            <p className="text-sm text-gray-300">Qtd: {product.quantity}</p>
            <p className="text-orange-400 font-bold">{product.price} MZN</p>

            <div className="mt-2 flex flex-col text-sm text-gray-300">
              <p>{product.seller || "João Silva"}</p>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => {
                  const rating = product.rating || 4.8;
                  if (i + 1 <= Math.floor(rating)) return <FaStar key={i} className="mr-1" />;
                  if (i + 0.5 <= rating) return <FaStarHalfAlt key={i} className="mr-1" />;
                  return <FaRegStar key={i} className="mr-1" />;
                })}
                <span className="ml-2 text-gray-200">{product.location || "Matola Gare"}</span>
              </div>
            </div>

            {/* Botões */}
            <div className="mt-3 flex items-center justify-between">
              <input
                type="number"
                min="1"
                max={product.quantity}
                value={selectedQty[product.id] || ""}
                onChange={e => setSelectedQty({ ...selectedQty, [product.id]: e.target.value })}
                placeholder="Qtd"
                className="w-16 text-white rounded border border-white/30 bg-black/20 px-2 py-1 text-center"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => onAddToCart(product)}
                  className="bg-[#F28705] p-2 rounded-full text-white border border-white/30 hover:bg-gray-600 transition"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => onBuyNow(product)}
                  className="bg-green-600 px-3 py-2 rounded text-white border border-white/30 hover:bg-green-700 transition"
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {products.length === 0 && <p className="text-center mt-4">Nenhum produto encontrado</p>}
  </div>
);

export default ProductList;

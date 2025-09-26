import ProductCard from "./ProductCard";

const SupplierSlider = ({ supplier, selectedQty, setSelectedQty, onAddToCart, onBuyNow }) => (
  <div className="px-4 mb-6">
    <h2 className="text-lg font-bold mb-2">{supplier.name}</h2>
    <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory">
      {supplier.products.map(product => (
        <div key={product.id} className="flex-shrink-0 w-72 snap-start">
          <ProductCard
            product={product}
            selectedQty={selectedQty}
            setSelectedQty={setSelectedQty}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
          />
        </div>
      ))}
    </div>
  </div>
);

export default SupplierSlider;

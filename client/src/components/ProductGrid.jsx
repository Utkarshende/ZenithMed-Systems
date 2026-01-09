import ProductCard from "./ProductCard";

const products = [1,2,3,4,5,6,7,8]; // replace with API later

const ProductGrid = () => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4">
        Featured Medicines
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((_, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;

import ProductGrid from "../components/ProductGrid";

const Home = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      
      {/* Banner */}
      <div className="bg-teal-500 text-white rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold">
          India’s Trusted Online Pharmacy
        </h2>
        <p className="mt-2">
          Order medicines & healthcare products at best prices
        </p>
      </div>

      {/* Products */}
      <ProductGrid />
    </section>
  );
};

export default Home;

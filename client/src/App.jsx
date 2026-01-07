import { useEffect, useState } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
const [pages, setPages] = useState(1);


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500); // Wait 500ms after last keystroke

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, activeCategory]);

const fetchData = async () => {
  setLoading(true);
  const categoryParam = activeCategory !== 'All' ? `&category=${activeCategory}` : '';
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
  setProducts(data.products);
  setPages(data.pages);
  setLoading(false);
};

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 sticky top-0 z-50">
        <h1 className="text-2xl font-black text-blue-900 text-center uppercase tracking-tighter italic">
          Nexus<span className="text-blue-500">Pharma</span>
        </h1>
      </nav>
      <div className="flex justify-center items-center gap-4 mt-12 pb-10">
  <button 
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-6 py-2 bg-white border border-slate-200 rounded-xl disabled:opacity-30 hover:bg-slate-50 transition-all font-bold"
  >
    Previous
  </button>
  
  <span className="text-slate-500 font-medium">
    Page <span className="text-blue-600">{page}</span> of {pages}
  </span>

  <button 
    disabled={page === pages}
    onClick={() => setPage(page + 1)}
    className="px-6 py-2 bg-white border border-slate-200 rounded-xl disabled:opacity-30 hover:bg-slate-50 transition-all font-bold"
  >
    Next
  </button>
</div>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f3f7fb] text-slate-900">
      <Navbar />
      <main className="pt-24">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;

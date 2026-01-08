import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;

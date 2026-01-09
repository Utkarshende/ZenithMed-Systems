import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Home />
      </main>

      <Footer />
    </div>
  );
}

export default App;

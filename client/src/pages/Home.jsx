import ProductGrid from "../components/ProductGrid";
import "./Home.css";

const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 35,
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/v1644254097/avp6kkpwrm3h9emazmwl.jpg"
  },
  {
    id: 2,
    name: "Azithromycin 250mg",
    price: 120,
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/v1644228391/olq0tq8ah4o6rf6zqkks.jpg"
  },
  {
    id: 3,
    name: "Vitamin C Tablets",
    price: 80,
    image: "https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/v1644235798/bjv4nmzq2kt6op3n2ksm.jpg"
  }
];

const Home = () => {
  return (
    <div className="home">
      <h2>Available Medicines</h2>
      <ProductGrid products={medicines} />
    </div>
  );
};

export default Home;

import { Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-[#10847e] to-[#0d6b66] text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            India’s Trusted Online Pharmacy
          </h1>
          <p className="text-white/90 mb-8 text-lg">
            Medicines • Healthcare • Lab Tests • Wellness
          </p>

          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search medicines & health products"
              className="w-full py-4 pl-12 pr-4 rounded-xl text-slate-900 outline-none"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:block">
          <img
            src="https://assets.pharmeasy.in/web-assets/dist/1606bf2a.svg"
            alt="Healthcare"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

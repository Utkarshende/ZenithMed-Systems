const About = () => (
  <div className="max-w-4xl mx-auto px-4 py-20">
    <h1 className="text-4xl font-black text-slate-800 mb-8 tracking-tight">About Kalp Pharma</h1>
    <p className="text-slate-600 leading-relaxed mb-6 font-medium">
      Kalp Pharma is a leading pharmaceutical aggregator and exporter. We leverage advanced technology to ensure that life-critical medicines are accessible to every doorstep with 100% cold-chain integrity.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      <div className="bg-white p-8 rounded-2xl border border-slate-100">
        <h3 className="font-bold text-[#10847e] mb-2 uppercase text-xs tracking-widest">Our Mission</h3>
        <p className="text-sm text-slate-500 font-medium">To provide affordable, high-quality healthcare formulations globally through a transparent supply chain.</p>
      </div>
      <div className="bg-white p-8 rounded-2xl border border-slate-100">
        <h3 className="font-bold text-[#10847e] mb-2 uppercase text-xs tracking-widest">Quality Assurance</h3>
        <p className="text-sm text-slate-500 font-medium">All our partners are WHO-GMP certified, ensuring every pill you receive meets international safety standards.</p>
      </div>
    </div>
  </div>
);

export default About;
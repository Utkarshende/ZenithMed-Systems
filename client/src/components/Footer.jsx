const Footer = () => (
  <footer className="bg-[#30363c] text-white py-16 px-4 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div>
        <h4 className="font-bold mb-6">Featured Categories</h4>
        <ul className="text-sm space-y-3 opacity-70">
          <li>Medicines</li>
          <li>Personal Care</li>
          <li>Health Food</li>
        </ul>
      </div>
      {/* Add more columns similar to PharmEasy */}
    </div>
    <div className="text-center mt-12 pt-8 border-t border-white/10 opacity-50 text-xs">
      © 2026 Kalp Pharma. All Rights Reserved.
    </div>
  </footer>
);

export default Footer;
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-white font-bold mb-3">PharmaEasy</h3>
          <p className="text-sm">
            India’s trusted online pharmacy & healthcare platform.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Help</h4>
          <ul className="space-y-2 text-sm">
            <li>FAQs</li>
            <li>Contact Support</li>
            <li>Return Policy</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500 py-4 border-t border-slate-800">
        © 2026 PharmaEasy Clone — Built for Learning
      </div>
    </footer>
  );
};

export default Footer;

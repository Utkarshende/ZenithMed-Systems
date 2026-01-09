const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-teal-600">
          Nexus<span className="text-gray-800">Pharma</span>
        </h1>

        {/* Search */}
        <div className="hidden md:flex flex-1 mx-8">
          <input
            type="text"
            placeholder="Search medicines, brands & categories"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 text-sm font-medium ">
          <button>Login</button>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg">
            Cart
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;

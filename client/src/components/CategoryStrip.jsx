import "./CategoryStrip.css";

const categories = [
  { id: 1, name: "All", icon: "💊" },
  { id: 2, name: "Diabetes", icon: "🩸" },
  { id: 3, name: "Heart", icon: "❤️" },
  { id: 4, name: "Skin Care", icon: "🧴" },
  { id: 5, name: "Ayurveda", icon: "🌿" },
  { id: 6, name: "Vitamins", icon: "🍊" },
  { id: 7, name: "Pain Relief", icon: "💥" },
];

const CategoryStrip = ({ selected, onSelect }) => {
  return (
    <div className="category-strip">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`category-item ${
            selected === cat.name ? "active" : ""
          }`}
          onClick={() => onSelect(cat.name)}
        >
          <span className="icon">{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryStrip;

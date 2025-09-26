import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-900 via-green-900 to-green-900 shadow-lg">
      <h1 className="text-2xl font-bold text-white">SoWani</h1>
      <button
        onClick={goToSettings}
        className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition"
        title="Configurações"
      >
        ⚙️
      </button>
    </div>
  );
};

export default Header;

const HeaderTransportador = ({ transporterName, onOpenSettings }) => {
  const displayName = transporterName || "Transportador";

  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-900 via-green-900 to-green-900 shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {displayName.charAt(0)}
        </div>
        <h1 className="text-2xl font-bold text-white">{displayName}</h1>
      </div>
      {/* ✅ Abre o SettingsPanel */}
      <button
        onClick={onOpenSettings}
        className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition"
        title="Configurações"
      >
        ⚙️
      </button>
    </div>
  );
};

export default HeaderTransportador;

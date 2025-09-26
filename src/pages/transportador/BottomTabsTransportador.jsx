const BottomTabsTransportador = ({ tabs, activeTab, onTabClick }) => (
  <div className="fixed bottom-0 left-0 right-0 flex bg-[#00241A]/70 backdrop-blur-md rounded-t-3xl p-4 border border-white/20 z-50">
    {tabs.map(tab => (
      <button
        key={tab.name}
        onClick={() => onTabClick(tab.name)}
        className={`flex-1 flex flex-col items-center justify-center py-2 rounded-full transition-all ${
          activeTab === tab.name ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        <span className="text-lg">{tab.icon}</span>
        <span className="text-sm mt-1">{tab.name}</span>
      </button>
    ))}
  </div>
);

export default BottomTabsTransportador;

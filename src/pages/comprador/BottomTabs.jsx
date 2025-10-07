const BottomTabs = ({ tabs, activeTab, onTabClick, cartItemsCount }) => (
  <div className="fixed bottom-0 left-0 right-0 flex bg-[#00241A]/95 rounded-t-3xl p-4 border border-white/30">
    {tabs.map(tab => (
      <button
        key={tab.name}
        onClick={() => onTabClick(tab.name)}
        className={`w-9 h-9 flex-1 flex items-center justify-center py-2 rounded-full transition-all ${
          activeTab === tab.name
            ? "bg-white/10 text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        <div className="relative">
          <img
            src={tab.icon}
            alt={tab.name}
            className={`w-7 h-7 rounded-2xl ${
              activeTab === tab.name ? "opacity-100" : "opacity-60"
            }`}
          />
          {tab.name === "Carrinho" && cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {cartItemsCount}
            </span>
          )}
        </div>
      </button>
    ))}
  </div>
)

export default BottomTabs;

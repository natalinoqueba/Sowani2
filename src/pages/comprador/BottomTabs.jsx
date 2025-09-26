const BottomTabs = ({ tabs, activeTab, onTabClick, cartItemsCount }) => (
  <div className="fixed bottom-0 left-0 right-0 flex bg-[#00241A]/70 backdrop-blur-md rounded-t-3xl p-4 border border-white/30">
    {tabs.map(tab => (
      <button
        key={tab.name}
        onClick={() => onTabClick(tab.name)}
        className={`flex-1 flex items-center justify-center py-3 rounded-full transition-all ${
          activeTab === tab.name ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
        }`}
      >
        {tab.icon} {tab.name}
        {tab.name === "Carrinho" && cartItemsCount > 0 && (
          <span className="ml-2 bg-red-500 rounded-full px-2">{cartItemsCount}</span>
        )}
      </button>
    ))}
  </div>
)

export default BottomTabs;

import { home, chatIcon, entregasIcon, statsIcon, settingsIcon } from "../../assets/assets";

const BottomTabsTransportador = ({ tabs, activeTab, onTabClick }) => (
  <div className="fixed bottom-0 left-0 right-0 flex bg-[#00241A]/70 backdrop-blur-md rounded-t-3xl p-4 border border-white/20 z-50">
    {tabs.map(tab => {
      // resolve icon: allow tab.icon to be a React node or an image path; fallback to common assets by name
      const resolvedIcon =
        tab.icon && (typeof tab.icon === "string" || typeof tab.icon === "object")
          ? tab.icon
          : {
              Entregas: entregasIcon,
              Pedidos: home,
              Chat: chatIcon,
              Configurações: settingsIcon,
              Stats: statsIcon,
            }[tab.name] || home;

      return (
        <button
          key={tab.name}
          onClick={() => onTabClick(tab.name)}
          className={`flex-1 flex flex-col items-center justify-center py-2 rounded-full transition-all ${
            activeTab === tab.name ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          <div className="w-6 h-6 mb-1">
            {typeof resolvedIcon === "string" ? (
              <img src={resolvedIcon} alt={tab.name} className="w-6 h-6" />
            ) : (
              resolvedIcon
            )}
          </div>
          {/* <span className="text-sm mt-1">{tab.name}</span> */}
        </button>
      );
    })}
  </div>
);

export default BottomTabsTransportador;

import { home, chatIcon, entregasIcon, statsIcon, settingsIcon } from "../../assets/assets";

const TabsAgricultor = ({ activeTab, setActiveTab, onOpenSettings }) => {
  const tabs = [
    { name: "Feed", icon: home },
    { name: "Chat", icon: chatIcon },
    { name: "Entregas", icon: entregasIcon },
    { name: "Stats", icon: statsIcon },
    { name: "Configurações", icon: settingsIcon },
  ];

  const handleClick = (tabName) => {
    if (tabName === "Configurações") {
      // Abre painel de configurações
      onOpenSettings?.();
    } else {
      setActiveTab(tabName);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex bg-black/20 rounded-t-3xl p-4 border border-white/30">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => handleClick(tab.name)}
          className={`w-9 h-9 flex-1 flex items-center justify-center py-2 rounded-full transition-all ${
            activeTab === tab.name ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          <img
            src={tab.icon}
            alt={tab.name}
            className={`w-7 h-7 rounded-2xl ${
              activeTab === tab.name ? "opacity-100" : "opacity-60"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default TabsAgricultor;

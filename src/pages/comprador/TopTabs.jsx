import { useRef, useEffect, useState } from "react";

const TopTabs = ({ tabs, activeTab, onTabClick }) => {
  const [sliderStyle, setSliderStyle] = useState({});
  const tabsRef = useRef([]);

  useEffect(() => {
    const index = tabs.findIndex(tab => tab === activeTab);
    const currentTab = tabsRef.current[index];
    if (currentTab) {
      setSliderStyle({
        width: `${currentTab.offsetWidth}px`,
        left: `${currentTab.offsetLeft}px`,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className="relative px-4 mt-4 mb-6">
      <div className="flex space-x-2">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            ref={el => (tabsRef.current[idx] = el)}
            onClick={() => onTabClick(tab)}
            className={`flex-1 py-2 rounded-xl font-semibold relative z-10 ${
              activeTab === tab ? "text-white" : "text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Slider animado */}
      <div
        className="absolute bottom-0 h-1 bg-green-700 rounded transition-all duration-300"
        style={sliderStyle}
      />
    </div>
  );
};

export default TopTabs;

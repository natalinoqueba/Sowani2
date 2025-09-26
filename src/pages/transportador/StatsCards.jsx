const StatsCards = ({ completedDeliveries, totalEarnings }) => (
  <div className="grid grid-cols-2 gap-4 px-4 mb-8">
    <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
      <div className="text-orange-400 text-3xl mb-2">🚛</div>
      <div className="text-4xl font-bold text-white mb-1">{completedDeliveries}</div>
      <div className="text-gray-300 text-sm">Entregas</div>
    </div>
    <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
      <div className="text-white text-3xl mb-2">📦</div>
      <div className="text-4xl font-bold text-white mb-1">{totalEarnings} MZN</div>
      <div className="text-gray-300 text-sm">Ganhos</div>
    </div>
  </div>
);

export default StatsCards;

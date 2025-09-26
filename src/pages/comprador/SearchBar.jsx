const SearchBar = ({ value, onChange }) => (
  <div className="px-4 mb-6">
    <input
      type="text"
      placeholder="Pesquisar produtos"
      value={value}
      onChange={onChange}
      className="w-full pl-3 py-2 rounded-xl text-white border border-white/30 bg-black/20 focus:outline-none focus:ring-2 focus:ring-[#F28705]"
    />
  </div>
)

export default SearchBar;

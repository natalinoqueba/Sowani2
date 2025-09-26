const Chat = () => {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <p className="text-gray-300">Aqui você poderá conversar com compradores e transportadores.</p>
      <div className="mt-6 bg-black/20 rounded-xl p-4 h-64 overflow-y-auto">
        <p className="text-gray-400 text-sm">Nenhuma conversa ainda...</p>
      </div>
      <input
        type="text"
        placeholder="Digite uma mensagem..."
        className="w-full mt-4 p-3 rounded-xl bg-[#05291C] border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#BF7F17]"
      />
    </div>
  )
}

export default Chat

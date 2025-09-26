import { useState } from "react"

const AddProductPopup = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({ name, price, quantity, category, description })
    setName(""); setPrice(""); setQuantity(""); setCategory(""); setDescription("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form className="bg-[#112C25] p-6 rounded-xl w-80 flex flex-col space-y-3" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-white">Adicionar Produto</h2>
        <p className="text-gray-300 text-sm mb-2">
          IA irá preencher automaticamente (com possibilidade de alterar)
        </p>
        <input placeholder="Nome do produto" value={name} onChange={e => setName(e.target.value)}
               className="p-2 rounded text-white border border-white/30"/>
        <input type="number" placeholder="Preço (MZN)" value={price} onChange={e => setPrice(e.target.value)}
               className="p-2 rounded text-white border border-white/30"/>
        <input type="number" placeholder="Quantidade" value={quantity} onChange={e => setQuantity(e.target.value)}
               className="p-2 rounded text-white border border-white/30"/>
        <input placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)}
               className="p-2 rounded text-white border border-white/30"/>
        <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}
                  className="p-2 rounded text-white border border-white/30 resize-none"/>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-600">Cancelar</button>
          <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Salvar</button>
        </div>
      </form>
    </div>
  )
}

export default AddProductPopup

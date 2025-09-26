import { useState } from 'react'

const EditProductModal = ({ product, onClose, onUpdate }) => {
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [quantity, setQuantity] = useState(product.quantity)

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate({ ...product, name, price, quantity })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-[#112C25] p-6 rounded-xl w-80 flex flex-col space-y-3">
        <h2 className="text-xl font-bold text-white">Editar Produto</h2>
        <input className="p-2 rounded text-white border border-white/30" value={name} onChange={e => setName(e.target.value)}/>
        <input type="number" className="p-2 rounded text-white border border-white/30" value={price} onChange={e => setPrice(e.target.value)}/>
        <input type="number" className="p-2 rounded text-white border border-white/30" value={quantity} onChange={e => setQuantity(e.target.value)}/>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-600">Cancelar</button>
          <button type="submit" className="px-4 py-2 rounded bg-yellow-500 text-white">Salvar</button>
        </div>
      </form>
    </div>
  )
}

export default EditProductModal

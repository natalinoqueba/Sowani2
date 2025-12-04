import { useState, useRef } from "react"
import { analyzeImageFile } from "../../services/gptImageService"

const AddProductPopup = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loadingAI, setLoadingAI] = useState(false)
  const [errorAI, setErrorAI] = useState("")
  const inputRef = useRef(null)

  const resetForm = () => {
    setName(""); setPrice(""); setQuantity(""); setCategory(""); setDescription("");
    setImageFile(null); setImagePreview(null); setErrorAI(""); setLoadingAI(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({ name, price, quantity, category, description, image: imageFile })
    resetForm()
    onClose()
  }

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    setImageFile(f)
    const url = URL.createObjectURL(f)
    setImagePreview(url)
  }

  const handleAnalyze = async () => {
    if (!imageFile) {
      setErrorAI("Carregue uma imagem antes de analisar.")
      return
    }
    setErrorAI("")
    setLoadingAI(true)
    try {
      // options: you can pass language hints
      const result = await analyzeImageFile(imageFile, { lang: "pt" })
      // merge suggestions but keep possibility to edit
      if (result.name) setName(result.name)
      if (result.price) setPrice(result.price)
      if (result.quantity) setQuantity(result.quantity)
      if (result.category) setCategory(result.category)
      if (result.description) setDescription(result.description)
    } catch (err) {
      console.error(err)
      setErrorAI(err.message || "Erro ao analisar imagem")
    } finally {
      setLoadingAI(false)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    if (inputRef.current) inputRef.current.value = null
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form className="bg-[#112C25] p-6 rounded-xl w-96 flex flex-col space-y-3" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-white">Adicionar Produto</h2>
        <p className="text-gray-300 text-sm mb-2">
          Faça upload de uma imagem e clique em "Analisar com IA" para preencher automaticamente (você pode editar os campos)
        </p>

        <div className="flex items-center gap-3">
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange}
                 className="text-sm text-white" />
          {imagePreview && (
            <div className="w-20 h-20 rounded overflow-hidden border border-white/20">
              <img src={imagePreview} alt="preview" className="object-cover w-full h-full" />
            </div>
          )}
          {imagePreview && (
            <button type="button" onClick={removeImage} className="px-2 py-1 bg-red-600 rounded text-white text-sm">Remover</button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={handleAnalyze} disabled={loadingAI}
                  className="px-3 py-2 rounded bg-[#E18003] text-white">
            {loadingAI ? "Analisando..." : "Analisar com IA"}
          </button>
          {errorAI && <span className="text-red-400 text-sm">{errorAI}</span>}
        </div>

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
          <button type="button" onClick={() => { resetForm(); onClose(); }} className="px-4 py-2 rounded bg-gray-600">Cancelar</button>
          <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Salvar</button>
        </div>
      </form>
    </div>
  )
}

export default AddProductPopup

import { useState } from 'react'

const ICONS = ['🔗', '💼', '📚', '🛠️', '🎨', '💻', '📱', '🎮', '🎵', '📷', '✨', '🚀']
const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6']

const BankForm = ({ bank, onSubmit, onCancel }) => {
  const [name, setName] = useState(bank?.name || '')
  const [description, setDescription] = useState(bank?.description || '')
  const [icon, setIcon] = useState(bank?.icon || '🔗')
  const [color, setColor] = useState(bank?.color || '#6366f1')
  const [isPublic, setIsPublic] = useState(bank?.isPublic || false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    await onSubmit({ name, description, icon, color, isPublic })
    
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">Banka Adı *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Örn: İş Linkleri"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">Açıklama</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Bu banka ne içeriyor?"
          rows={2}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors resize-none"
        />
      </div>

      {/* Icon */}
      <div>
        <label className="block text-sm font-medium mb-2">İkon</label>
        <div className="flex flex-wrap gap-2">
          {ICONS.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIcon(i)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                icon === i 
                  ? 'bg-primary-500/30 ring-2 ring-primary-500' 
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <label className="block text-sm font-medium mb-2">Renk</label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-lg transition-all ${
                color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0f0f23]' : ''
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Public */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsPublic(!isPublic)}
          className={`w-12 h-6 rounded-full transition-colors relative ${
            isPublic ? 'bg-primary-500' : 'bg-white/20'
          }`}
        >
          <div 
            className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
              isPublic ? 'translate-x-6' : 'translate-x-0.5'
            }`}
          />
        </button>
        <span className="text-sm">Herkese açık banka</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium transition-colors"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={loading || !name.trim()}
          className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
          ) : bank ? 'Güncelle' : 'Oluştur'}
        </button>
      </div>
    </form>
  )
}

export default BankForm

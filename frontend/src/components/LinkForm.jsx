import { useState } from 'react'

const ICONS = ['🔗', '💻', '🌐', '📱', '🎨', '📚', '🎵', '📷', '🎮', '💡', '⭐', '🚀', '📝', '🛒', '📧', '🎯']

const LinkForm = ({ link, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(link?.title || '')
  const [url, setUrl] = useState(link?.url || '')
  const [description, setDescription] = useState(link?.description || '')
  const [icon, setIcon] = useState(link?.icon || '🔗')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    await onSubmit({ title, url, description, icon })
    
    setLoading(false)
  }

  // Try to detect icon based on URL
  const detectIcon = (inputUrl) => {
    const lowerUrl = inputUrl.toLowerCase()
    if (lowerUrl.includes('github')) return '💻'
    if (lowerUrl.includes('instagram')) return '📷'
    if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) return '🐦'
    if (lowerUrl.includes('linkedin')) return '💼'
    if (lowerUrl.includes('youtube')) return '🎬'
    if (lowerUrl.includes('spotify')) return '🎵'
    if (lowerUrl.includes('figma')) return '🎨'
    if (lowerUrl.includes('notion')) return '📝'
    if (lowerUrl.includes('discord')) return '💬'
    return '🔗'
  }

  const handleUrlChange = (e) => {
    const newUrl = e.target.value
    setUrl(newUrl)
    if (!link) { // Only auto-detect for new links
      const detectedIcon = detectIcon(newUrl)
      if (icon === '🔗') {
        setIcon(detectedIcon)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* URL */}
      <div>
        <label className="block text-sm font-medium mb-2">URL *</label>
        <input
          type="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://example.com"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
          required
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">Başlık *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Link başlığı"
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
          placeholder="Kısa bir açıklama (opsiyonel)"
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
          disabled={loading || !title.trim() || !url.trim()}
          className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
          ) : link ? 'Güncelle' : 'Ekle'}
        </button>
      </div>
    </form>
  )
}

export default LinkForm

import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Plus, Link2, Share2, Eye, 
  MoreVertical, Edit2, Trash2, Copy, ExternalLink,
  GripVertical
} from 'lucide-react'
import { categoryAPI, linkAPI } from '../services/api'
import toast from 'react-hot-toast'
import Modal from '../components/Modal'
import LinkForm from '../components/LinkForm'

const CategoryDetail = () => {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  
  const [category, setCategory] = useState(null)
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingLink, setEditingLink] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)

  useEffect(() => {
    fetchData()
  }, [categoryId])

  const fetchData = async () => {
    try {
      const [categoryRes, linksRes] = await Promise.all([
        categoryAPI.getOne(categoryId),
        linkAPI.getByCategory(categoryId)
      ])
      setCategory(categoryRes.data.data)
      setLinks(linksRes.data.data)
    } catch (error) {
      toast.error('Veriler yüklenirken hata oluştu')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateLink = async (data) => {
    try {
      data.category = categoryId
      const res = await linkAPI.create(data)
      setLinks([...links, res.data.data])
      setShowModal(false)
      toast.success('Link eklendi!')
    } catch (error) {
      toast.error('Link eklenirken hata oluştu')
    }
  }

  const handleUpdateLink = async (data) => {
    try {
      const res = await linkAPI.update(editingLink._id, data)
      setLinks(links.map(l => l._id === editingLink._id ? res.data.data : l))
      setEditingLink(null)
      setShowModal(false)
      toast.success('Link güncellendi!')
    } catch (error) {
      toast.error('Link güncellenirken hata oluştu')
    }
  }

  const handleDeleteLink = async (id) => {
    if (!confirm('Bu linki silmek istediğinizden emin misiniz?')) {
      return
    }
    try {
      await linkAPI.delete(id)
      setLinks(links.filter(l => l._id !== id))
      toast.success('Link silindi!')
    } catch (error) {
      toast.error('Link silinirken hata oluştu')
    }
    setMenuOpen(null)
  }

  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}/s/${category.slug}`
    navigator.clipboard.writeText(shareUrl)
    toast.success('Paylaşım linki kopyalandı!')
  }

  const openEditModal = (link) => {
    setEditingLink(link)
    setShowModal(true)
    setMenuOpen(null)
  }

  const toggleLinkActive = async (link) => {
    try {
      const res = await linkAPI.update(link._id, { isActive: !link.isActive })
      setLinks(links.map(l => l._id === link._id ? res.data.data : l))
      toast.success(res.data.data.isActive ? 'Link aktif edildi' : 'Link pasif edildi')
    } catch (error) {
      toast.error('İşlem başarısız')
    }
    setMenuOpen(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                to={`/bank/${category.bank}`}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${category.color}30` }}
                >
                  {category.icon}
                </div>
                <div>
                  <h1 className="font-semibold">{category.name}</h1>
                  <p className="text-xs text-gray-400">{links.length} link</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyShareLink}
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
                title="Paylaşım linkini kopyala"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:block">Paylaş</span>
              </button>
              <a
                href={`/s/${category.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
                title="Önizle"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:block">Önizle</span>
              </a>
              <button
                onClick={() => {
                  setEditingLink(null)
                  setShowModal(true)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:block">Link Ekle</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Share Link Info */}
        <div className="glass rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Share2 className="w-5 h-5 text-primary-400" />
            <div>
              <p className="text-sm text-gray-400">Paylaşım Linki</p>
              <p className="text-primary-400 font-mono text-sm">{window.location.origin}/s/{category.slug}</p>
            </div>
          </div>
          <button
            onClick={handleCopyShareLink}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>

        {/* Links List */}
        {links.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Link2 className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Henüz link yok</h2>
            <p className="text-gray-400 mb-6">İlk linkini ekleyerek başla</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Link Ekle
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {links.map((link, index) => (
              <div
                key={link._id}
                className={`glass rounded-xl p-4 animate-fadeIn relative group flex items-center gap-4 ${
                  !link.isActive ? 'opacity-50' : ''
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Drag Handle (placeholder for future drag-drop) */}
                <div className="cursor-move opacity-0 group-hover:opacity-50">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Link Icon */}
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {link.icon}
                </div>

                {/* Link Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{link.title}</h3>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-primary-400 truncate block"
                  >
                    {link.url}
                  </a>
                  {link.description && (
                    <p className="text-xs text-gray-500 mt-1 truncate">{link.description}</p>
                  )}
                </div>

                {/* Stats */}
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  {link.clickCount}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  
                  <div className="relative">
                    <button
                      onClick={() => setMenuOpen(menuOpen === link._id ? null : link._id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {menuOpen === link._id && (
                      <div className="absolute right-0 top-10 w-40 bg-[#1e1e3f] border border-white/10 rounded-lg shadow-xl overflow-hidden z-10">
                        <button
                          onClick={() => openEditModal(link)}
                          className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-2 text-sm"
                        >
                          <Edit2 className="w-4 h-4" />
                          Düzenle
                        </button>
                        <button
                          onClick={() => toggleLinkActive(link)}
                          className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-2 text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          {link.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                        </button>
                        <button
                          onClick={() => handleDeleteLink(link._id)}
                          className="w-full px-4 py-2 text-left hover:bg-red-500/20 text-red-400 flex items-center gap-2 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Sil
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingLink(null)
        }}
        title={editingLink ? 'Linki Düzenle' : 'Yeni Link Ekle'}
      >
        <LinkForm
          link={editingLink}
          onSubmit={editingLink ? handleUpdateLink : handleCreateLink}
          onCancel={() => {
            setShowModal(false)
            setEditingLink(null)
          }}
        />
      </Modal>
    </div>
  )
}

export default CategoryDetail

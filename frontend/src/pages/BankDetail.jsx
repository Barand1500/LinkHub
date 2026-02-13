import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Plus, Folder, Share2, Eye, 
  MoreVertical, Edit2, Trash2, Copy, Link2,
  ExternalLink, RefreshCw
} from 'lucide-react'
import { bankAPI, categoryAPI } from '../services/api'
import toast from 'react-hot-toast'
import Modal from '../components/Modal'
import CategoryForm from '../components/CategoryForm'

const BankDetail = () => {
  const { bankId } = useParams()
  const navigate = useNavigate()
  
  const [bank, setBank] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)

  useEffect(() => {
    fetchData()
  }, [bankId])

  const fetchData = async () => {
    try {
      const [bankRes, categoriesRes] = await Promise.all([
        bankAPI.getOne(bankId),
        categoryAPI.getByBank(bankId)
      ])
      setBank(bankRes.data.data)
      setCategories(categoriesRes.data.data)
    } catch (error) {
      toast.error('Veriler yüklenirken hata oluştu')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCategory = async (data) => {
    try {
      data.bank = bankId
      const res = await categoryAPI.create(data)
      setCategories([...categories, res.data.data])
      setShowModal(false)
      toast.success('Kategori oluşturuldu!')
    } catch (error) {
      toast.error('Kategori oluşturulurken hata oluştu')
    }
  }

  const handleUpdateCategory = async (data) => {
    try {
      const res = await categoryAPI.update(editingCategory._id, data)
      setCategories(categories.map(c => c._id === editingCategory._id ? res.data.data : c))
      setEditingCategory(null)
      setShowModal(false)
      toast.success('Kategori güncellendi!')
    } catch (error) {
      toast.error('Kategori güncellenirken hata oluştu')
    }
  }

  const handleDeleteCategory = async (id) => {
    if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz? Tüm linkler de silinecek.')) {
      return
    }
    try {
      await categoryAPI.delete(id)
      setCategories(categories.filter(c => c._id !== id))
      toast.success('Kategori silindi!')
    } catch (error) {
      toast.error('Kategori silinirken hata oluştu')
    }
    setMenuOpen(null)
  }

  const handleCopyShareLink = (slug) => {
    const shareUrl = `${window.location.origin}/s/${slug}`
    navigator.clipboard.writeText(shareUrl)
    toast.success('Paylaşım linki kopyalandı!')
    setMenuOpen(null)
  }

  const handleRegenerateSlug = async (id) => {
    try {
      const res = await categoryAPI.regenerateSlug(id)
      setCategories(categories.map(c => c._id === id ? res.data.data : c))
      toast.success('Paylaşım linki yenilendi!')
    } catch (error) {
      toast.error('Link yenilenirken hata oluştu')
    }
    setMenuOpen(null)
  }

  const openEditModal = (category) => {
    setEditingCategory(category)
    setShowModal(true)
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
                to="/dashboard"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${bank.color}30` }}
                >
                  {bank.icon}
                </div>
                <div>
                  <h1 className="font-semibold">{bank.name}</h1>
                  <p className="text-xs text-gray-400">{categories.length} kategori</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingCategory(null)
                setShowModal(true)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:block">Kategori</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Folder className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Henüz kategori yok</h2>
            <p className="text-gray-400 mb-6">İlk kategorini oluşturarak başla</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Kategori Oluştur
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category._id}
                className="glass rounded-xl p-6 card-hover animate-fadeIn relative group"
              >
                {/* Menu Button */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setMenuOpen(menuOpen === category._id ? null : category._id)
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {menuOpen === category._id && (
                    <div className="absolute right-0 top-10 w-48 bg-[#1e1e3f] border border-white/10 rounded-lg shadow-xl overflow-hidden z-10">
                      <button
                        onClick={() => handleCopyShareLink(category.slug)}
                        className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-2 text-sm"
                      >
                        <Copy className="w-4 h-4" />
                        Linki Kopyala
                      </button>
                      <a
                        href={`/s/${category.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-2 text-sm"
                        onClick={() => setMenuOpen(null)}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Önizle
                      </a>
                      <button
                        onClick={() => handleRegenerateSlug(category._id)}
                        className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-2 text-sm"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Linki Yenile
                      </button>
                      <hr className="border-white/10" />
                      <button
                        onClick={() => openEditModal(category)}
                        className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-2 text-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="w-full px-4 py-2 text-left hover:bg-red-500/20 text-red-400 flex items-center gap-2 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Sil
                      </button>
                    </div>
                  )}
                </div>

                <Link to={`/category/${category._id}`}>
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                  {category.description && (
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{category.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Link2 className="w-4 h-4" />
                      {category.links?.length || 0} link
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {category.viewCount} görüntüleme
                    </div>
                  </div>
                  
                  {/* Share Link */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-primary-400">
                      <Share2 className="w-3 h-3" />
                      /s/{category.slug}
                    </div>
                  </div>
                </Link>
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
          setEditingCategory(null)
        }}
        title={editingCategory ? 'Kategoriyi Düzenle' : 'Yeni Kategori Oluştur'}
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
          onCancel={() => {
            setShowModal(false)
            setEditingCategory(null)
          }}
        />
      </Modal>
    </div>
  )
}

export default BankDetail

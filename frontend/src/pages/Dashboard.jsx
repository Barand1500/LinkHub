import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Link2, Plus, Folder, LogOut, User, 
  MoreVertical, Edit2, Trash2, Eye
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { bankAPI } from '../services/api'
import toast from 'react-hot-toast'
import Modal from '../components/Modal'
import BankForm from '../components/BankForm'

const Dashboard = () => {
  const [banks, setBanks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBank, setEditingBank] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)
  
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchBanks()
  }, [])

  const fetchBanks = async () => {
    try {
      const res = await bankAPI.getAll()
      setBanks(res.data.data)
    } catch (error) {
      toast.error('Bankalar yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBank = async (data) => {
    try {
      const res = await bankAPI.create(data)
      setBanks([res.data.data, ...banks])
      setShowModal(false)
      toast.success('Banka oluşturuldu!')
    } catch (error) {
      toast.error('Banka oluşturulurken hata oluştu')
    }
  }

  const handleUpdateBank = async (data) => {
    try {
      const res = await bankAPI.update(editingBank._id, data)
      setBanks(banks.map(b => b._id === editingBank._id ? res.data.data : b))
      setEditingBank(null)
      setShowModal(false)
      toast.success('Banka güncellendi!')
    } catch (error) {
      toast.error('Banka güncellenirken hata oluştu')
    }
  }

  const handleDeleteBank = async (id) => {
    if (!confirm('Bu bankayı silmek istediğinizden emin misiniz? Tüm kategoriler ve linkler de silinecek.')) {
      return
    }
    try {
      await bankAPI.delete(id)
      setBanks(banks.filter(b => b._id !== id))
      toast.success('Banka silindi!')
    } catch (error) {
      toast.error('Banka silinirken hata oluştu')
    }
    setMenuOpen(null)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    toast.success('Çıkış yapıldı')
  }

  const openEditModal = (bank) => {
    setEditingBank(bank)
    setShowModal(true)
    setMenuOpen(null)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">LinkBankası</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <User className="w-5 h-5" />
                <span className="hidden sm:block">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                title="Çıkış Yap"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Link Bankalarım</h1>
            <p className="text-gray-400 mt-1">
              {banks.length} banka
            </p>
          </div>
          <button
            onClick={() => {
              setEditingBank(null)
              setShowModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:block">Yeni Banka</span>
          </button>
        </div>

        {/* Banks Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : banks.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
              <Folder className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Henüz banka yok</h2>
            <p className="text-gray-400 mb-6">İlk link bankını oluşturarak başla</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Banka Oluştur
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {banks.map((bank) => (
              <div
                key={bank._id}
                className="glass rounded-xl p-6 card-hover animate-fadeIn relative group"
              >
                {/* Menu Button */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setMenuOpen(menuOpen === bank._id ? null : bank._id)
                    }}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {menuOpen === bank._id && (
                    <div className="absolute right-0 top-10 w-40 bg-[#1e1e3f] border border-white/10 rounded-lg shadow-xl overflow-hidden z-10">
                      <button
                        onClick={() => openEditModal(bank)}
                        className="w-full px-4 py-2 text-left hover:bg-white/10 flex items-center gap-2 text-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDeleteBank(bank._id)}
                        className="w-full px-4 py-2 text-left hover:bg-red-500/20 text-red-400 flex items-center gap-2 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Sil
                      </button>
                    </div>
                  )}
                </div>

                <Link to={`/bank/${bank._id}`}>
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: `${bank.color}20` }}
                  >
                    {bank.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{bank.name}</h3>
                  {bank.description && (
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{bank.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Folder className="w-4 h-4" />
                      {bank.categories?.length || 0} kategori
                    </div>
                    {bank.isPublic && (
                      <div className="flex items-center gap-1 text-green-400">
                        <Eye className="w-4 h-4" />
                        Herkese Açık
                      </div>
                    )}
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
          setEditingBank(null)
        }}
        title={editingBank ? 'Bankayı Düzenle' : 'Yeni Banka Oluştur'}
      >
        <BankForm
          bank={editingBank}
          onSubmit={editingBank ? handleUpdateBank : handleCreateBank}
          onCancel={() => {
            setShowModal(false)
            setEditingBank(null)
          }}
        />
      </Modal>
    </div>
  )
}

export default Dashboard

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Link2, ExternalLink, User, Eye, AlertCircle } from 'lucide-react'
import { categoryAPI, linkAPI } from '../services/api'

const SharePage = () => {
  const { slug } = useParams()
  
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCategory()
  }, [slug])

  const fetchCategory = async () => {
    try {
      const res = await categoryAPI.getBySlug(slug)
      setCategory(res.data.data)
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Bu koleksiyon bulunamadı')
      } else if (err.response?.status === 403) {
        setError('Bu koleksiyon herkese açık değil')
      } else {
        setError('Bir hata oluştu')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLinkClick = async (linkId) => {
    try {
      await linkAPI.trackClick(linkId)
    } catch (err) {
      // Silent fail for click tracking
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{error}</h1>
          <p className="text-gray-400 mb-6">Bu sayfa mevcut değil veya erişim izniniz yok.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
          >
            <Link2 className="w-5 h-5" />
            Ana Sayfaya Git
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-4"
            style={{ backgroundColor: `${category.color}20` }}
          >
            {category.icon}
          </div>
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-gray-400">{category.description}</p>
          )}
          
          {/* Owner Info */}
          {category.user && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <User className="w-4 h-4" />
              {category.user.name}
            </div>
          )}
          
          {/* View Count */}
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-600">
            <Eye className="w-3 h-3" />
            {category.viewCount} görüntüleme
          </div>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {category.links && category.links.length > 0 ? (
            category.links.map((link, index) => (
              <a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(link._id)}
                className="glass rounded-xl p-4 flex items-center gap-4 card-hover animate-fadeIn block"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{link.title}</h3>
                  {link.description && (
                    <p className="text-sm text-gray-400 truncate">{link.description}</p>
                  )}
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </a>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">Bu koleksiyonda henüz link yok.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-400">
            <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-purple-500 rounded flex items-center justify-center">
              <Link2 className="w-3 h-3 text-white" />
            </div>
            LinkBankası ile oluşturuldu
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default SharePage

import { Link } from 'react-router-dom'
import { Link2, Folders, Share2, Zap, ArrowRight, Github, Twitter, ExternalLink } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Landing = () => {
  const { user } = useAuth()

  const features = [
    {
      icon: <Folders className="w-8 h-8" />,
      title: 'Link Bankaları',
      description: 'Tüm linklerini temalı bankalar altında organize et. İş, kişisel, projeler - hepsini ayrı tut.'
    },
    {
      icon: <Link2 className="w-8 h-8" />,
      title: 'Kategoriler',
      description: 'Her banka içinde kategoriler oluştur. Frontend kaynakları, sosyal medya, araçlar...'
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Tek Link Paylaşım',
      description: 'Her kategori benzersiz bir paylaşım linkine sahip. Tek URL ile tüm koleksiyonu paylaş.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Hızlı & Basit',
      description: 'Karmaşık kurulum yok. Kayıt ol, bankalarını oluştur, linkleri ekle, paylaş.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">LinkBankası</span>
            </Link>

            <div className="flex items-center gap-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 hover:text-primary-400 transition-colors"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Linkler Değil,{' '}
            <span className="gradient-text">Koleksiyonlar</span>{' '}
            Paylaş
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            GitHub, Instagram, kaynaklar, projeler... Hepsini tek tek paylaşmak yerine
            anlamlı koleksiyonlar oluştur ve tek bir URL ile paylaş.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Hemen Başla
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 rounded-xl font-semibold text-lg transition-colors"
            >
              Nasıl Çalışır?
            </a>
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-2xl p-8 card-hover">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
                <div className="text-3xl mb-3">💼</div>
                <h3 className="font-semibold text-lg mb-2">İş Profilim</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <span>GitHub Projeleri</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>Portfolio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    <span>Sosyal Medya</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-primary-400">
                  linkbankasi.com/s/abc123
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-semibold text-lg mb-2">Öğrenme Kaynakları</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>📖</span>
                    <span>React Dökümanları</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🎥</span>
                    <span>Video Eğitimler</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📝</span>
                    <span>Blog Yazıları</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-primary-400">
                  linkbankasi.com/s/xyz789
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
                <div className="text-3xl mb-3">🛠️</div>
                <h3 className="font-semibold text-lg mb-2">Favori Araçlar</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>⚡</span>
                    <span>Figma</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🎨</span>
                    <span>Coolors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📊</span>
                    <span>Notion</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-primary-400">
                  linkbankasi.com/s/def456
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Neden <span className="gradient-text">LinkBankası</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 card-hover animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-primary-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              Link karmaşasına son ver
            </h2>
            <p className="text-gray-400 mb-8">
              Ücretsiz kayıt ol ve linklerini düzenlemeye başla.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
            >
              Ücretsiz Başla
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Link2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">LinkBankası</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 LinkBankası. Basit. Düzenli. Paylaşılabilir.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landing

<div align="center">

# 🔗 LinkHub

### Share Collections, Not Just Links

**Linklerini tek tek değil, koleksiyonlar halinde paylaş!**

[![Made with React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[🇬🇧 English](#-english) • [🇹🇷 Türkçe](#-türkçe)

---

<img src="docs/preview.png" alt="LinkHub Preview" width="800"/>

</div>

---

# 🇬🇧 English

## 📖 About

**LinkHub** is a modern link management platform that allows you to organize your links into meaningful collections and share them with a single URL.

Stop sharing links one by one. Create link banks, organize them into categories, and share entire collections with just one link!

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🏦 **Link Banks** | Create themed banks to organize all your links (Work, Personal, Projects) |
| 📁 **Categories** | Organize links within banks into categories |
| 🔗 **Single URL Sharing** | Each category gets a unique shareable link |
| 📊 **Analytics** | Track views and clicks on your shared links |
| 🔒 **Privacy Control** | Make categories public or private |
| 🎨 **Customization** | Custom icons and colors for banks and categories |
| 📱 **Responsive** | Works perfectly on all devices |

### 🎯 Use Cases

- **Developers**: Share your GitHub repos, documentation, and tools
- **Content Creators**: Organize social media links and resources
- **Students**: Compile learning resources and study materials
- **Freelancers**: Create a professional link portfolio
- **Teams**: Share project resources and tools

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Barand1500/LinkHub.git
cd LinkHub
```

**2. Setup Backend**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

npm run dev
```

**3. Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

**4. Open your browser**
```
http://localhost:5173
```

### Environment Variables

Create a `.env` file in the `backend` folder:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/linkhub
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

---

## 📁 Project Structure

```
LinkHub/
├── 📂 backend/                 # Node.js API
│   ├── 📂 config/             # Database configuration
│   ├── 📂 controllers/        # Route handlers
│   │   ├── authController.js
│   │   ├── bankController.js
│   │   ├── categoryController.js
│   │   └── linkController.js
│   ├── 📂 middleware/         # Auth middleware
│   ├── 📂 models/             # MongoDB schemas
│   │   ├── User.js
│   │   ├── Bank.js
│   │   ├── Category.js
│   │   └── Link.js
│   ├── 📂 routes/             # API routes
│   └── server.js
│
├── 📂 frontend/               # React application
│   ├── 📂 src/
│   │   ├── 📂 components/     # Reusable components
│   │   ├── 📂 context/        # Auth context
│   │   ├── 📂 pages/          # Page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── BankDetail.jsx
│   │   │   ├── CategoryDetail.jsx
│   │   │   └── SharePage.jsx
│   │   └── 📂 services/       # API services
│   └── index.html
│
└── README.md
```

---

## 🔌 API Reference

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Banks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/banks` | Get all banks |
| POST | `/api/banks` | Create bank |
| PUT | `/api/banks/:id` | Update bank |
| DELETE | `/api/banks/:id` | Delete bank |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories/bank/:bankId` | Get categories |
| GET | `/api/categories/share/:slug` | Get public category |
| POST | `/api/categories` | Create category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

### Links

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/links/category/:categoryId` | Get links |
| POST | `/api/links` | Create link |
| PUT | `/api/links/:id` | Update link |
| DELETE | `/api/links/:id` | Delete link |
| POST | `/api/links/:id/click` | Track click |

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

---

# 🇹🇷 Türkçe

## 📖 Hakkında

**LinkHub**, linklerinizi anlamlı koleksiyonlar halinde düzenlemenizi ve tek bir URL ile paylaşmanızı sağlayan modern bir link yönetim platformudur.

Artık linkleri tek tek paylaşmayı bırakın. Link bankaları oluşturun, kategorilere ayırın ve tüm koleksiyonları tek bir linkle paylaşın!

### ✨ Temel Özellikler

| Özellik | Açıklama |
|---------|----------|
| 🏦 **Link Bankaları** | Tüm linklerinizi temalı bankalar altında organize edin |
| 📁 **Kategoriler** | Bankalar içinde kategoriler oluşturun |
| 🔗 **Tek URL Paylaşım** | Her kategori benzersiz bir paylaşım linkine sahip |
| 📊 **İstatistikler** | Görüntüleme ve tıklama sayılarını takip edin |
| 🔒 **Gizlilik Kontrolü** | Kategorileri herkese açık veya gizli yapın |
| 🎨 **Özelleştirme** | Özel ikonlar ve renkler |
| 📱 **Responsive** | Tüm cihazlarda mükemmel çalışır |

### 🎯 Kullanım Alanları

- **Yazılımcılar**: GitHub projelerini, dökümanları ve araçları paylaşın
- **İçerik Üreticileri**: Sosyal medya linklerini ve kaynakları düzenleyin
- **Öğrenciler**: Öğrenme kaynaklarını ve materyalleri derleyin
- **Freelancerlar**: Profesyonel bir link portfolyosu oluşturun
- **Ekipler**: Proje kaynaklarını ve araçlarını paylaşın

---

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+
- MongoDB (yerel veya Atlas)
- npm veya yarn

### Adımlar

**1. Repoyu klonlayın**
```bash
git clone https://github.com/Barand1500/LinkHub.git
cd LinkHub
```

**2. Backend Kurulumu**
```bash
cd backend
npm install

# .env dosyasını oluşturun
cp .env.example .env
# .env dosyasını MongoDB URI ve JWT secret ile düzenleyin

npm run dev
```

**3. Frontend Kurulumu**
```bash
cd frontend
npm install
npm run dev
```

**4. Tarayıcıyı açın**
```
http://localhost:5173
```

---

## 📸 Ekran Görüntüleri / Screenshots

<div align="center">

### 🏠 Ana Sayfa / Landing Page
<img src="/ana.png" alt="Landing" width="700"/>

### 📊 Dashboard
<img src="/alt.png" alt="Dashboard" width="700"/>

### 🔗 Paylaşım Sayfası / Share Page
<img src="/login.png" alt="Share Page" width="700"/>

</div>

---

## 🤝 Katkıda Bulunun / Contributing

Katkılarınızı bekliyoruz! / Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 Lisans / License

Bu proje MIT lisansı altında lisanslanmıştır.  
This project is licensed under the MIT License.

---

<div align="center">

### ⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
### ⭐ Star this repo if you find it useful!

---

**Basit. Düzenli. Paylaşılabilir.**  
**Simple. Organized. Shareable.**

Made with ❤️ by [Barand1500](https://github.com/Barand1500)

</div>

import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api

// Bank API
export const bankAPI = {
  getAll: () => api.get('/banks'),
  getOne: (id) => api.get(`/banks/${id}`),
  create: (data) => api.post('/banks', data),
  update: (id, data) => api.put(`/banks/${id}`, data),
  delete: (id) => api.delete(`/banks/${id}`)
}

// Category API
export const categoryAPI = {
  getByBank: (bankId) => api.get(`/categories/bank/${bankId}`),
  getOne: (id) => api.get(`/categories/${id}`),
  getBySlug: (slug) => api.get(`/categories/share/${slug}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
  regenerateSlug: (id) => api.put(`/categories/${id}/regenerate-slug`)
}

// Link API
export const linkAPI = {
  getByCategory: (categoryId) => api.get(`/links/category/${categoryId}`),
  getOne: (id) => api.get(`/links/${id}`),
  create: (data) => api.post('/links', data),
  update: (id, data) => api.put(`/links/${id}`, data),
  delete: (id) => api.delete(`/links/${id}`),
  trackClick: (id) => api.post(`/links/${id}/click`),
  reorder: (links) => api.put('/links/reorder', { links })
}

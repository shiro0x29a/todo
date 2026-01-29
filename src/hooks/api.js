// api.js
import axios from 'axios';

// Базовый URL вашего Node.js сервера
// const API_BASE_URL = 'http://82.152.8.182:3001/api';
const API_BASE_URL = 'http://82.152.8.182:3001';

// Создаем экземпляр axios с базовыми настройками
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // Если используете куки для авторизации
});

// Перехватчик для добавления токена к каждому запросу
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехватчик для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Обработка ошибок авторизации
    if (error.response && error.response.status === 401) {
      // Можно добавить логику рефреша токена или редиректа на логин
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Общая функция для выполнения HTTP запросов
 * @param {string} method - HTTP метод (GET, POST, PUT, DELETE)
 * @param {string} url - Endpoint URL
 * @param {Object} data - Данные для отправки (для POST, PUT)
 * @param {Object} params - Query параметры (для GET)
 * @param {Object} options - Дополнительные опции для axios
 * @returns {Promise} Promise с результатом запроса
 */
export const makeRequest = async (method, url, data = null, params = null, options = {}) => {
  try {
    const config = {
      method,
      url,
      ...options,
    };

    if (data) {
      config.data = data;
    }

    if (params) {
      config.params = params;
    }

    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    // Пробрасываем ошибку дальше для обработки в компонентах
    throw error.response ? error.response.data : error;
  }
};

// Упрощенные методы для разных HTTP методов
export const api = {
  get: (url, params = null, options = {}) => makeRequest('GET', url, null, params, options),
  post: (url, data = null, options = {}) => makeRequest('POST', url, data, null, options),
  put: (url, data = null, options = {}) => makeRequest('PUT', url, data, null, options),
  delete: (url, data = null, options = {}) => makeRequest('DELETE', url, data, null, options),
};

export default apiClient;

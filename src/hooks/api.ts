import axios, { 
  AxiosInstance, 
  InternalAxiosRequestConfig, 
  AxiosResponse, 
  AxiosError,
  AxiosRequestConfig
} from 'axios';

// Базовый URL вашего Node.js сервера
const API_BASE_URL: string = 'http://82.152.8.182:3001';

// Интерфейс для ответа API с ошибкой
interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  [key: string]: any;
}

// Создаем экземпляр axios с базовыми настройками
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // Если используете куки для авторизации
});

// Перехватчик для добавления токена к каждому запросу
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Перехватчик для обработки ошибок
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError<ApiErrorResponse>): Promise<AxiosError> => {
    // Обработка ошибок авторизации
    if (error.response && error.response.status === 401) {
      // Можно добавить логику рефреша токена или редиректа на логин
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

/**
 * Общая функция для выполнения HTTP запросов
 * @param method - HTTP метод (GET, POST, PUT, DELETE)
 * @param url - Endpoint URL
 * @param data - Данные для отправки (для POST, PUT)
 * @param params - Query параметры (для GET)
 * @param options - Дополнительные опции для axios
 * @returns Promise с результатом запроса
 */
export const makeRequest = async <TRequest = any, TResponse = any>(
  method: string,
  url: string,
  data?: TRequest | null,
  params?: TRequest | null,
  options?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const config: AxiosRequestConfig = {
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

    const response: AxiosResponse<TResponse> = await apiClient.request(config);
    return response.data;
  } catch (error) {
    // Пробрасываем ошибку дальше для обработки в компонентах
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data as ApiErrorResponse;
    }
    throw error;
  }
};

// Интерфейс для API методов с поддержкой двух дженериков (TRequest, TResponse)
interface ApiMethods {
  get: <TRequest = any, TResponse = any>(
    url: string, 
    params?: TRequest | null, 
    options?: AxiosRequestConfig
  ) => Promise<TResponse>;
  
  post: <TRequest = any, TResponse = any>(
    url: string, 
    data?: TRequest | null, 
    options?: AxiosRequestConfig
  ) => Promise<TResponse>;
  
  put: <TRequest = any, TResponse = any>(
    url: string, 
    data?: TRequest | null, 
    options?: AxiosRequestConfig
  ) => Promise<TResponse>;
  
  delete: <TRequest = any, TResponse = any>(
    url: string, 
    data?: TRequest | null, 
    options?: AxiosRequestConfig
  ) => Promise<TResponse>;
}

// Упрощенные методы для разных HTTP методов
export const api: ApiMethods = {
  get: <TRequest = any, TResponse = any>(
    url: string, 
    params?: TRequest | null, 
    options?: AxiosRequestConfig
  ): Promise<TResponse> => 
    makeRequest<TRequest, TResponse>('GET', url, null, params, options),
  
  post: <TRequest = any, TResponse = any>(
    url: string, 
    data?: TRequest | null, 
    options?: AxiosRequestConfig
  ): Promise<TResponse> => 
    makeRequest<TRequest, TResponse>('POST', url, data, null, options),
  
  put: <TRequest = any, TResponse = any>(
    url: string, 
    data?: TRequest | null, 
    options?: AxiosRequestConfig
  ): Promise<TResponse> => 
    makeRequest<TRequest, TResponse>('PUT', url, data, null, options),
  
  delete: <TRequest = any, TResponse = any>(
    url: string, 
    data?: TRequest | null, 
    options?: AxiosRequestConfig
  ): Promise<TResponse> => 
    makeRequest<TRequest, TResponse>('DELETE', url, data, null, options),
};

export default apiClient;

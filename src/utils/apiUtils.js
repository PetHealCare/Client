// src/utils/apiUtils.js
export const fetchWithAuth = async (url, options = {}) => {
    const authToken = localStorage.getItem('authToken');
  
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
    };
  
    const config = {
      ...options,
      headers,
    };
  
    const response = await fetch(url, config);
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  };
  
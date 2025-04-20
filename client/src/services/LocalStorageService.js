// services/LocalStorageService.js

// Store token in local storage
const storeToken = (token) => {
  localStorage.setItem('access_token', token);
};

// Get token from local storage
const getToken = () => {
  const access_token = localStorage.getItem('access_token');
  return {
    access_token
  };
};

// Remove token from local storage
const removeToken = () => {
  localStorage.removeItem('access_token');
};

export { storeToken, getToken, removeToken };
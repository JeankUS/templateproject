import api from "./api";

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products/');
    return response.data;
  } catch (error) {
    console.error('Failed to load products', error);
  }
};

export const fetchOffers = async () => {
  try {
    const response = await api.get('/offers/');
    return response.data;
  } catch (error) {
    console.error('Failed to load offers', error);
  }
};

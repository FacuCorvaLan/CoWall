import axios from 'axios';

const apiClient = axios.create({
  baseURL:'https://labor3-d60e.restdb.io/rest/',
  headers: {'x-apikey': '64a2e9bc86d8c525a3ed8f63'}
})

export const postInfo = async (data, store) => {
  try {
    await apiClient.post('/transactions', data);
    store.dispatch('confirmTransaction', true);
  } catch (error) {
    console.error("Hubo un error al realizar la llamada.", error);
    store.dispatch('confirmTransaction', true);
  }
};

export const getInfo = (userId) => {
  return apiClient.get(`/transactions?q={"user_id":"${userId}"}`);
};

export const editInfo = async (idData, body) => {
  try {
    const response = await apiClient.patch(`/transactions/${idData}`, body);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error del servidor:", error.response.data);
      console.error("Errores de validación:", error.response.data.list);
    } else {
      console.error("Error desconocido:", error.message);
    }
    throw error;
  }
};

export const deleteInfo = (idData) => {
  return apiClient.delete(`/transactions/${idData}`);
}

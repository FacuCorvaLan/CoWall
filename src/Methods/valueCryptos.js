import apiCrypto from '../Services/ApiCriptoYa';

export const cryptoData = async (typeCoin) =>{
  try {
    const response = await apiCrypto.getQuotes(typeCoin);
    return response;
  } catch (error) {
    console.error('Error al cargar la cotización de ${typeCoin}:', error);
    return null;
  }
}

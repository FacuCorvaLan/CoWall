import { getInfo } from '../Services/UsersServices';

export const historyData = async (userName) =>{
  try{
    const response = await getInfo(userName);
    return response;
  }catch (error){
    console.error("Error al cargar el historial del usuario:", error);
    return null;
  }
}


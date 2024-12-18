import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://laboratorio3-5fc7.restdb.io/rest/',
  headers: {'x-apikey':'64bdbc3386d8c5613ded91e7'},
});

export default {
  getInfo(){
    return apiClient.get('/transactions');
  },

  postInfo(data){
    return apiClient.post('/transactions/', data);
  },

  editInfo(data, body){
    return apiClient.patch(`/transactions/${data}`, body);
  },

  deleteInfo(data){
    return apiClient.delete(`/transactions/${data}`);
  }
}
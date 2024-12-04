import axios from 'axios';

const apiQuote = axios.create({
  baseURL: 'https://criptoya.com/api',
  headers: {'Content-Type':'application/json'},
});

export default {
  getQuotes(paramsValue){
    return apiQuote.get('/apiCrypto',{params: paramsValue});
  }
}
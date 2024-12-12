import axios from 'axios';

const apiQuote = axios.create({
  baseURL: 'https://criptoya.com/api',
  headers: {'Content-Type':'application/json'},
});

export default {
  getQuotes(typeCoin){
    return apiQuote.get(`/binancep2p/${typeCoin}/ARS/1`);
  }
}
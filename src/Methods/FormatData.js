import moment from "moment";

export const formatDateTime = (dateValue, formatDate = "DD/MM/YYYY HH:mm:ss") =>{
  return moment(dateValue).format(formatDate);
}

export const formatARS = (moneyValue) =>{
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(moneyValue);
}
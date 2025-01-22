<template>
  <div class="containerBox">
    <p>Bitcoin</p>
    <p>Monto total: </p>
    <p>Monto en ARS: </p>

  </div>
</template>

<script>
import { formatARS } from '../Methods/FormatData';
import { getInfo } from '../Services/UsersServices';
export default{
  name: 'boxCryptos',
  data(){
    return{
      dataUser: [],
      valueARS: ""
    }
  },

  async created() {
    try {
      const response = await getInfo(this.$store.getters.userName);
      this.dataUser = response.data; 
    } catch (error) {
      console.error("Error al mostrar el historial.", error);
      alert("Error al cargar el historial.");
    }
  },

  methods:{
    formatARS,

    calculateValues(){
    }
  }
}
</script>

<style>
.containerBox {
  display: flex;
  flex-direction: column;
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  font-size: 15px;
  color: white;
  background-color: blue;
  max-width: 100px;
  padding: 10px 30px;
  border-radius: 15px;
}
</style>

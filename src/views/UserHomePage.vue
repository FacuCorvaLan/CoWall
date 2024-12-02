<template>
<div class="containerProfile">
  <NavbarCw/>
  <myWallet/>
  <boxCrypto/>
  <!--<div class="tableContainer">
    <table>
        <thead>
          <tr>
            <th>Tipo de moneda</th>
            <th>Monto Total</th>
            <th>Nuevo monto</th>
            <th>Movimiento</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Juan Pérez</td>
            <td>juan@example.com</td>
            <td>28</td>
            <td>28</td>
            <td>28</td>
          </tr>
          <tr>
            <td>Ana Gómez</td>
            <td>ana@example.com</td>
            <td>25</td>
            <td>28</td>
            <td>28</td>
          </tr>
          <tr>
            <td>Pedro Sánchez</td>
            <td>pedro@example.com</td>
            <td>30</td>
            <td>28</td>
            <td>28</td>
          </tr>
        </tbody>
      </table>
  </div>-->
</div>
</template>

<script>
import NavbarCw from "../Components/NavbarCw.vue";
import myWallet from "../Components/myWallet.vue";
import boxCrypto from "../Components/boxCryptos.vue";
import eventServices from "../Services/EventService.js"

export default {
  name: "UserHomePage",
  components: {
    NavbarCw,
    myWallet,
    boxCrypto
  },

  data() {
    return {
      events: null,
    }
  },

  created() {
    eventServices.getEvents()
    .then(response =>{
      this.events = response.data;
    })
    .catch(error =>{
      console.log(error);
    })
  },
}
</script>

<style>
  .containerProfile{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 100px 10px;
  }

/*Estilo de la tabla*/ 
.tableContainer {
  width: 90%;
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  border-radius: 8px;
  background-color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

thead {
  background-color: blue;
  color: white;
}

th, td {
  padding: 12px 15px;
  border: 1px solid rgb(24, 174, 246);
}
</style>
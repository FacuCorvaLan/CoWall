<template>
  <router-view/>
  <div class="containerPpal">
    <div class="tableContainer">
      <table>
          <thead>
            <tr>
              <th>Tipo de moneda</th>
              <th>Monto Total</th>
              <th>Monto en pesos</th>
              <th>Operación</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!--<tr v-for="(item, index) in dataTransactions" :key="index">
              <td>{{item.crypto_code}}</td>
              <td>{{item.crypto_amount}}</td>
              <td>{{item.money}}</td>
              <td>{{item.action}}</td>
              <td>{{item.dateTime}}</td>
              <td>
                <button @click="showInfo(item._id, true)">Mostrar</button>
                <button @click="showEdit(item._id, true)">Editar</button>
                <button @click="flagDelete = true">Borrar</button>
              </td>
            </tr>-->
            <tr>
              <td><p>BTC</p></td>
              <td><p>0.005</p></td>
              <td><p>618255.0683</p></td>
              <td><p>Compra</p></td>
              <td><p>18/12/2024</p></td>
              <td>
                <button @click="showInfo(/*item._id,*/ true)">Mostrar</button>
                <button @click="flagEdit = true">Editar</button>
                <button @click="flagDelete = true">Borrar</button>
              </td>
            </tr>
          </tbody>
      </table>
    </div>

    <div class="containerActions" v-show="flagShow || flagEdit || flagDelete">
      <div class="showItem" v-show="flagShow">
        <div class="infoDiv">
          <p>Tipo de cripto: BTC</p>
          <p>Monto Total: 0.005</p>
          <p>Monto en ARS: 618255.0683</p>
          <p>Operación: Compra</p>
          <p>Fecha: XXX</p>
          <!--<p>Tipo de : {{ selectedItem.crypto_code }}</p>
          <p>Monto Total: {{ selectedItem.crypto_amount  }}</p>
          <p>Monto en ARS: {{ selectedItem.crypto_money  }}</p>
          <p>Operación: {{ selectedItem.crypto_action  }}</p>
          <p>Fecha: {{ selectedItem.crypto_dateTime  }}</p>-->

        </div>
        <button @click="flagShow = false">Cerrar</button>
      </div>
      
      <div class="editItem" v-show="flagEdit">
        <div class="divEditInfo">  
              <!--<p>Tipo de cripto: {{ selectedItem.crypto_code }}</p>
              <p>Monto Total: {{ selectedItem.crypto_amount  }}</p>
              <p>Monto en ARS: {{ selectedItem.crypto_money  }}</p>
              <p>Operación: {{ selectedItem.crypto_action  }}</p>
              <p>Fecha: {{ selectedItem.crypto_dateTime  }}</p>-->
              <div class="divInputs"><p>Tipo de cripto: BTC</p><input type="text" id="infoTypeCripto" class="inputNewInfo" v-model="selectedItem.crypto_code"/></div>
              <div class="divInputs"><p>Monto Total: 0.005</p><input type="text" id="infoAmount" class="inputNewInfo" v-model="selectedItem.crypto_amount"/></div>
              <div class="divInputs"><p>Monto en ARS: 618255.0683</p><input type="text" id="infoMoney" class="inputNewInfo" v-model="selectedItem.money"/></div>
              <div class="divInputs"><p>Operación: Compra</p><input type="text" id="infoAction" class="inputNewInfo" v-model="selectedItem.action"/></div>
              <div class="divInputs"><p>Fecha: XXX</p><input type="text" id="infoDateTime" class="inputNewInfo" v-model="selectedItem.dateTime"/></div>
        </div>
        <div class="btnEdit">
          <button @click=editData()>Editar</button>
          <button @click="flagEdit = false">Cancelar</button>
        </div>
      </div>

      <div class="deleteItem" v-show="flagDelete">
        <h2>¿Está seguro que desea eliminar estos datos?</h2>
        <div class="infoDiv">
          <p>Tipo de cripto: BTC</p>
          <p>Monto Total: 0.005</p>
          <p>Monto en ARS: 618255.0683</p>
          <p>Operación: Compra</p>
          <p>Fecha: XXX</p>
        </div>
        <button @click="confirmDelete = true, deleteData()">Eliminar</button>
        <button @click="flagDelete = false">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import apiUsers from '../Services/UsersServices';
export default {
  name: "UserHistory",

  data(){
    return {
      dataTransactions: [],
      flagShow: false,
      flagEdit: false,
      flagDelete: false,
      confirmDelete: false,
      selectedItem: {}
    }
  },

  async created() {
    try {
      const response = await apiUsers.getInfo(); 
      this.dataTransactions = response.data; 
    } catch (error) {
      console.error("Error al mostrar el historial.", error);
      alert("Error al cargar el historial.");
    }
  },

  methods: {
    showInfo(/*valueID,*/ boleanValue){ 
      this.flagShow = boleanValue;
      /*if(this.flagShow){
        this.selectedItem = this.dataTransactions.find(item => item._id === valueID);
      }*/
    },

    showEdit(valueId, boleanValue) {  
      this.flagEdit = boleanValue;
      if(this.flagEdit){
        this.selectedItem = this.dataTransactions.find(item => item._id === valueId);
      }
    },

    async editData(){
      try{
        const newData = {
          user_id: this.selectedItem.user_id,
          action: this.selectedItem.action,
          crypto_code: this.selectedItem.crypto_code,
          crypto_amount: this.selectedItem.crypto_amount,
          money: this.selectedItem.money,
          dateTime: this.selectedItem.dateTime,
        }

        await apiUsers.editTransaction(this.selectedItem._id, newData);

        const idAux = this.dataTransactions.findIndex(item => item._id === this.selectedItem._id);

        if(idAux != -1){
          this.dataTransactions[idAux] ={...this.selectedItem};
        }else{
          alert("No se encontraron los datos buscados.");
        }
        this.flagEdit = false;
      }catch(error) {
        console.error("Error al editar los datos:", error);
        alert("No se pudo actualizar la la información.");
      }
    },

    async deleteData(){
      if(this.confirmDelete){
        try {
          await apiUsers.deleteInfo(this.selectedItem._id);
        
          const indexAux = this.dataTransactions.findIndex(item => item._id === this.selectedItem._id);

          if(indexAux != -1){
          this.dataTransactions.splice(indexAux, 1);
          }else{
            alert("No existen los datos buscados.");
          }
          this.flagDelete = false;
        }catch(error){
          console.error("Error al eliminar", error);
          alert("No se pudo realizar la operación.");
        }
      }
    }

    
  },
}
</script>

<style scoped>
.tableContainer {
  display: flex;
  width: 90%;
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  border-radius: 8px;
  background-color: white;
  margin: 100px 50px;
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

.containerActions {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center; 
  align-items: center; 
}

.showItem, .editItem, .deleteItem {
  background-color: rgb(218, 218, 248);
  padding: 20px;
  border-radius: 10px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); 
  max-width: fit-content;
}

.showItem p { 
  font-size: 16px;
  margin-bottom: 10px;
}

.showItem button, .editItem button, .deleteItem button{
  font-weight: bolder;
  max-width: fit-content;
  font-size: 16px;
  height: 40px;
  background-color: transparent;
  border-color: rgb(24, 174, 246);
  border-radius: 18px;
  border-style: solid;
  margin: 35px 10px;
  transition: background-color 0.5s; 
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);

}

.showItem button:active, .editItem button:active, .deleteItem button:active{
  background-color: rgb(24, 174, 246); 
  color: white; 
}

.editItem{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: fit-content;
  gap: 10px;
}

.divEditInfo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 0 10px;
}

.divInputs{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
}

.inputNewInfo{
  width: 150px; 
  height: 18px;
  border-radius: 30px;
  border-color: rgb(24, 174, 246);
  transition: background-color 0.5s;
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  margin: 16px;
  }

.deleteItem{
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
}
</style>
<template>
  <router-view/>
  <div class="containerPpal">
    <div class="tableContainer">
      <table>
          <thead>
            <tr>
              <th>Tipo de moneda</th>
              <th>Monto de Transacción</th>
              <th>Monto en pesos</th>
              <th>Operación</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataTransactions" :key="index">
              <td>{{ item.crypto_code }}</td>
              <td>{{ item.crypto_amount }}</td>
              <td>{{ formatARS(item.money) }}</td>
              <td>{{ item.action === 'purchase' ? 'Compra' : item.action === 'sale' ? 'Venta' : 'N/A' }}</td>
              <td>{{ formatDateTime(item.datetime)}}</td>
              <td>
                <div class="divBtnActions">
                  <button class="btnDetail" @click="showInfo(item._id)"/>
                  <button class="btnEdit" @click="showEdit(item._id)"/>
                  <button class="btnDelete" @click="showDelete(item._id)"/>
                </div>
              </td>
            </tr>
          </tbody>
      </table>
    </div>

    <div class="containerActions" v-show="flagShow || flagEdit || flagDelete">
      <div class="showItem" v-show="flagShow">
        <div class="infoDiv">
          <p>Tipo de cripto : {{ selectedItem.crypto_code }}</p>
          <p>Monto Total: {{ selectedItem.crypto_amount  }}</p>
          <p>Monto en ARS: {{ formatARS(selectedItem.money)  }}</p>
          <p>Operación: {{ selectedItem.action === 'purchase' ? 'Compra' : selectedItem.action === 'sale' ? 'Venta' : 'N/A' }}</p>
          <p>Fecha: {{ formatDateTime(selectedItem.datetime)  }}</p>
        </div>
        <button @click="flagShow = false">Cerrar</button>
      </div>
      
      <div class="editItem" v-show="flagEdit">
        <div class="divEditInfo">            
          <div class="divInputs"> <p>Tipo de cripto: {{ selectedItem.crypto_code }}</p><input type="text" id="infoTypeCripto" class="inputNewInfo" v-model="newData.crypto_code"/></div>
          <div class="divInputs"><p>Monto Total: {{ selectedItem.crypto_amount  }}</p><input type="text" id="infoAmount" class="inputNewInfo" v-model="newData.crypto_amount"/></div>
          <div class="divInputs"><p>Monto en ARS: {{ formatARS(selectedItem.money)  }}</p><input type="text" id="infoMoney" class="inputNewInfo" v-model="newData.money"/></div>
          <div class="divInputs"><p>Operación: {{ selectedItem.crypto_action  }}</p><input type="text" id="infoAction" class="inputNewInfo" v-model="newData.action"/></div>
          <div class="divInputs"><p>Fecha: {{ formatDateTime(selectedItem.datetime)  }}</p><input type="datetime-local" id="infoDateTime" class="inputNewInfo" v-model="newData.datetime"/></div>
        </div>
        <div class="btnNewEdit">
          <button @click=editData()>Editar</button>
          <button @click="flagEdit = false">Cancelar</button>
        </div>
      </div>

      <div class="deleteItem" v-show="flagDelete">
        <h2>¿Está seguro que desea eliminar estos datos?</h2>
        <div class="infoDiv">
          <p>Tipo de cripto : {{ selectedItem.crypto_code }}</p>
          <p>Monto Total: {{ selectedItem.crypto_amount  }}</p>
          <p>Monto en ARS: {{ formatARS(selectedItem.money)  }}</p>
          <p>Operación: {{ selectedItem.action === 'purchase' ? 'Compra' : selectedItem.action === 'sale' ? 'Venta' : 'N/A' }}</p>
          <p>Fecha: {{ formatDateTime(selectedItem.datetime)  }}</p>
        </div>
        <button @click="confirmDelete = true, deleteData()">Eliminar</button>
        <button @click="flagDelete = false, confirmDelete = false, deleteData()">Cancelar</button>
      </div>
    </div>
  </div>
  <WebFooter/> 
</template>

<script>
import WebFooter from '../Components/WebFooter.vue';
import {editInfo, deleteInfo} from '../Services/UsersServices';
import { formatDateTime, formatARS } from '../Methods/FormatData';
export default {
  name: "UserHistory",
  components: {
    WebFooter
  },
  data(){
    return {
      dataTransactions: [],
      moneyValue: "",
      flagShow: false,
      flagEdit: false,
      flagDelete: false,
      confirmDelete: false,
      selectedItem: {},
      newData:{
        action: "",
        crypto_code: "",
        crypto_amount: "",
        money: "",
        datetime: "",
      }
    }
  },

  async created() {
      if(!this.$store.state.userName){
        alert("No se puede cargar el historial sin el nombre de usuario.");
        return;
      }else{
        if(this.$store.state.historyUser === ""){
          alert("No tiene historial.");
          return;
        }else{
          this.dataTransactions = this.$store.state.historyUser;
        }
      }
  },

  methods: {
    formatARS,
    formatDateTime,

    resetArray(){
      return {action: "", crypto_code: "", crypto_amount: "", money: "", datetime: "",};
    },

    showInfo(valueId){ 
        this.selectedItem = this.dataTransactions.find(item => item._id === valueId);
        this.flagShow = true; 
    },

    showEdit(valueId) { 
        this.selectedItem = this.dataTransactions.find(item => item._id === valueId);
        this.flagEdit = true;
    },

    showDelete(valueId){
        this.selectedItem = this.dataTransactions.find(item => item._id === valueId)
        this.flagDelete = true;
    },

    async editData(){
      try{
        const updatedData = {
          action: this.newData.action || this.selectedItem.action,
          crypto_code: this.newData.crypto_code.toUpperCase() || this.selectedItem.crypto_code.toUpperCase(),
          crypto_amount: this.newData.crypto_amount || this.selectedItem.crypto_amount,
          money: this.newData.money || this.selectedItem.money,
          datetime: this.newData.datetime ? new Date(this.newData.datetime) : this.selectedItem.datetime,
        }

        if (this.newData.crypto_code && this.newData.crypto_code !== this.selectedItem.crypto_code) {
        let quote = this.$store.state.quoteCryptos[this.newData.crypto_code.toUpperCase()];
        
        if (!quote) {
            alert("Error: No se encontró la cotización para la criptomoneda seleccionada.");
            return;
        }

        updatedData.money = updatedData.crypto_amount * (updatedData.action === "purchase" ? quote.totalAsk : quote.totalBid);
        updatedData.money = Number(updatedData.money.toFixed(2));
        
        } else if (this.newData.crypto_amount && this.newData.crypto_amount != this.selectedItem.crypto_amount) {
            let quote = this.$store.state.quoteCryptos[updatedData.crypto_code?.toUpperCase()];

            if (!quote) {
                alert("Error: No se encontró la cotización para la criptomoneda seleccionada.");
                return;
            }

            updatedData.money = updatedData.crypto_amount * (updatedData.action === "purchase" ? quote.totalAsk : quote.totalBid);
            updatedData.money = Number(updatedData.money.toFixed(2));
            
        } else if (this.newData.money && this.newData.money != this.selectedItem.money) {
            let quote = this.$store.state.quoteCryptos[updatedData.crypto_code?.toUpperCase()];

            if (!quote) {
                alert("Error: No se encontró la cotización para la criptomoneda seleccionada.");
                return;
            }

            updatedData.crypto_amount = this.newData.money / (updatedData.action === "purchase" ? quote.totalAsk : quote.totalBid);
            updatedData.crypto_amount = Number(updatedData.crypto_amount.toFixed(2));
        } else if(this.newData.crypto_code && this.newData.crypto_code != this.selectedItem.crypto_code){
          let quote = this.$store.state.quoteCryptos[this.newData.crypto_code.toUpperCase()];

          updatedData.money = updatedData.crypto_amount * (updatedData.action === "purchase" ? quote.totalAsk : quote.totalBid);
          updatedData.money = Number(updatedData.money.toFixed(2));
        }

        await editInfo(this.selectedItem._id, updatedData);

        const idAux = this.dataTransactions.findIndex(item => item._id === this.selectedItem._id);

        if(idAux != -1){
          this.dataTransactions[idAux] ={...this.selectedItem, ...updatedData};
        }else{
          alert("No se encontraron los datos buscados.");
        }
        this.flagEdit = false;
        this.newData = this.resetArray();
        this.selectedItem = {};
      }catch(error) {
        console.error("Error al editar los datos:", error);
        alert("No se pudo actualizar la información.");
      }
    },

    async deleteData(){
      if(this.confirmDelete){
        try {
          await deleteInfo(this.selectedItem._id);
        
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
      }else{
        this.selectedItem = {};
      }
    }, 
  }
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
  margin: 50px;
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
  margin: 20px 0 0 10px;
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

.divBtnActions{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.btnDetail{
  padding: 0;
  margin: 0;
  border-width: 1px;
  border-color: rgb(0, 178, 32);
  border-radius: 5px;
  background-color: transparent;
  background-image: url('../assets/Images/detail.png');
  background-size: cover;
  background-position: center;
  width: 30px; 
  height: 30px; 
  cursor: pointer;
}

.btnEdit{
  padding: 0;
  margin: 0;
  border-width: 1px;
  border-color: rgba(255, 190, 0);
  border-radius: 5px;
  background-color: transparent;
  background-image: url('../assets/Images/edit.png');
  background-size: cover;
  background-position: center;
  width: 30px; 
  height: 30px; 
  cursor: pointer;
}

.btnDelete{
  padding: 0;
  margin: 0;
  border-width: 1px;
  border-color: rgb(252, 10, 79);
  border-radius: 5px;
  background-color: transparent;
  background-image: url('../assets/Images/delete.png');
  background-size: cover;
  background-position: center;
  width: 30px; 
  height: 30px; 
  cursor: pointer;
}
</style>
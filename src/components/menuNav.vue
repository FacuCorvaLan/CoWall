<template>
  <div class="containerName"><p class="styleUser">{{nameUser}}</p></div>
        <div class="listDiv">
          <button class="btnMenu" @click="showList"><img src="../assets/Images/logoMenu.png" class="imgBtn"></button>
            <ul v-if="flagList" class="styleList">
              <li class="stlCasilla">Mi cuenta</li>
              <li class="stlCasilla">Movimientos</li>
              <li class="stlCasilla">Comprar o vender</li>
            </ul>
        </div>
</template>

<script>
export default{
  data() {
    return{
      nameUser:"Facu Corvalán",
      flagList: false
    }
  },

  methods: {
    showList() {
      this.flagList = !this.flagList;
    }
  }
}
</script>

<style>
.styleUser{
  color: white;
}

.listDiv{
  display:flex;
  flex-direction: column;
  position: relative; 
}

.btnMenu{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border-radius: 5px;
  border-color: rgb(24, 174, 246);
  border-width: 1px;
  margin: 10px 30px 10px 10px;
}

.imgBtn{
  width: 50px;
  height: 50px;
}

.styleList{
  padding: 0;
  margin: 0;
  position: absolute;
  top: 60px; 
  left: 0;
  border-radius: 5px;
}

.stlCasilla {
  list-style-type: none;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  background-color: black;
  position: relative;
  top: 0;
  right: 60px;
}

.stlCasilla:hover {
  background-color: rgb(20, 150, 230);
}
</style>
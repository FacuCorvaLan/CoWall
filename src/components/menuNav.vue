<template>
  <div class="containerName"><p class="styleUser">{{userName}}</p></div>
        <div class="listDiv">
          <button class="btnMenu" @click="showList"><img src="../assets/Images/logoMenu.png" class="imgBtn"></button>
            <ul v-if="flagList" class="styleList">
              <li class="stlCasilla">Mi perfil</li>
              <li class="stlCasilla">Movimientos</li>
              <li class="stlCasilla">Comprar/Vender</li>
              <li class="stlCasilla">Cerrar Sesión</li>
            </ul>
        </div>
</template>

<script>
export default{
  data() {
    return{
      flagList: false,
    }
  },

  computed: {
    userName () {
      return this.$store.getters.userName;
    }
  },

  methods: {
    showList() {
      this.flagList = !this.flagList;
    }
  },
}
</script>

<style>
.styleUser{
  color: white;
  font-size: 18px;
}

.listDiv{
  display:flex;
  flex-direction: column;
  position: relative; 
  margin-left: 10px;
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
  top: 48px; 
  left: -22px;
}

.stlCasilla {
  list-style-type: none;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  background-color: blue;
  position: relative;
  top: 12px;
  right: 70px;
  
}

.stlCasilla:hover {
  background-color: rgb(20, 150, 230);
}
</style>
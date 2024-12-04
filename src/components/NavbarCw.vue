<template>
  <header class="headerCw">
    <div class="containerHead">
      <div class="logoCw">
        <img src="../assets/Images/logo-CoWall.png" class="imgLogo">
        <p class="NameWebsite">CoWall</p>
      </div>
      <div class="containerMenu">
        <menuNav/>
      </div>
    </div>
  </header>
</template>

<script>
import menuNav from '../Components/menuNav.vue'

export default{

  components: {
    menuNav,
  },

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
.headerCw{
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 50px;
  background-color: black;
}

.containerHead{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 5px;
  max-height: fit-content;
}

.logoCw{
  display: flex;
  margin: 12px;
  gap: 5px;
  align-items: center;
}

.imgLogo{
  width: 60px;
  height: 50px;
}

.NameWebsite{
  font-family: "Protest Guerrilla", sans-serif;
  font-size: 38px;
  font-style:normal;
  color: rgb(24, 174, 246);
  margin: 0;
}

.containerMenu{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Inria Sans", sans-serif;
  font-weight: 300;
  font-style: normal;
}


</style>
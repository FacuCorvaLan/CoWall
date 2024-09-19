<template>
  <navbarCw/>
  <body>
    <div class="containerPpal">
      <div>
        <h1>Cambia tu moneda, cambia tu futuro.</h1>
        <p>Haz crecer tus inversiones hoy.</p>
        <div class="BtnSesion">
          <form>
            <input @click="showLogin" type="button" class="btnLogin" value="Iniciar Sesión">
          </form>
      </div>
      </div>
      <figure>
        <img src="../assets/Images/FirstImg.jpg" class="firstImg">
        <figcaption>Designed by Freepik.</figcaption>
      </figure>
    </div>
    <loginUsers v-if="loginVisible" class="newLogin" @loginComplete="closeLogin"/>
  <footer>
    <p>Copyright</p>
  </footer>
  </body>
</template>

<script>
import loginUsers from "../views/LoginUsers.vue";
import navbarCw from "../components/NavbarCw.vue"

export default{
  components: {
    navbarCw,
    loginUsers,
  },

  data() {
    return {
      loginVisible: false
    }
  },

  methods: {
    showLogin(){
      this.loginVisible = !this.loginVisible;
    },

    closeLogin(){
      this.loginVisible = false;
    }
  }
}
</script>

<style>
body{
  margin: 0;
}

footer{
  display: flex;
  justify-content: center;
  background-color: rgb(31, 31, 58);
  color:white;
  font-size: 30px;
  padding: 70px;
}

.containerPpal{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 60px;
}

.containerPpal h1{
  font-family: "Inria Sans", sans-serif;
  font-weight: bold;
  font-style: normal;
}

.containerPpal p{
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  font-weight: bolder;
  font-size: 16px;
}

figcaption{
  font-family: "Inria Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.loginUsers{
  background-color: rgb(88, 88, 184);
  color: white;
  display: flex;
  flex-direction: column;
}


.btnLogin{
  font-family: "Inria Sans", sans-serif;
  font-weight: bolder;
  font-style: normal;
  max-width: fit-content;
  font-size: 18px;
  height: 40px;
  background-color: transparent;
  border-color: rgb(24, 174, 246);
  border-radius: 18px;
  border-style: solid;
  margin-right: 20px;
  margin-bottom: 10px;
  transition: background-color 0.5s; 
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
}

.btnLogin:active {
  background-color: rgb(24, 174, 246); 
  color: white; 
}

.newLogin{
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.noneStyle{
  display: none;
}
</style>
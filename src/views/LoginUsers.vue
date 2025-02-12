<template>
  <div class="bodyLogin">
    <navbar/>
      <div class="containerLogin">
        <form class="formStyle">
          <h1>Iniciá sesión</h1>
          <section class="userName">
            <h4>Nombre de usuario</h4>
            <input id="nameUser" name="nameUser" class="inputName" type="text" v-model="nameUser" placeHolder="Ingresar nombre de usuario...">
          </section>
          <section class="btnAndMsjError">
            <input class="btnIngresar" type="button" value="Ingresar" @click="finishLogin"/>
            <p class="msjError">{{messageError}}</p>
          </section>
        </form>
      </div>
    </div>
</template>

<script>
import navbar from '../Components/NavbarCw.vue';

export default {
  name: 'LoginUsers',
  
  components: {
    navbar,
  },
  data() {
    return {
      messageError: "",
      nameUser: "",
    };
  },


  methods: {
    finishLogin() {
      if (!this.nameUser) {
        this.messageError = "Por favor, ingrese el nombre de usuario.";
      } else if (this.nameUser.length < 8) {
          this.messageError = "El nombre de usuario debe tener al menos 8 caracteres.";
        } else {
          this.messageError = "";
          this.$router.push({name:'Profile', params:{userName: this.nameUser}});
          this.$store.dispatch( 'loadUserName', this.nameUser);
          this.$store.dispatch('confirmLogOut', false);
        }
    },
  }
};
</script>

<style>
.bodyLogin{
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inria Sans", sans-serif;
  font-weight: 300;
  font-style: normal;
  margin-top: 150px;
}

.containerLogin{
  display: flex;
  background-color: rgb(218, 218, 248);
  padding: 65px 40px 0 40px;
  border-radius: 50px;
  border-style: solid;
  border-color: rgb(24, 174, 246);
  border-width: 1px;
}

.noneStyle{
  display: none;
}

.formStyle{
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 300px;
}

.formStyle h1{
  margin-top: 0;
  margin-bottom: 10px;
}

.formStyle h4{
  font-weight: bolder;
  margin-bottom: 15px;
  font-size: 18px;
}

.containerBtnIngresar{
  display: flex;
  justify-content: center;
}

.inputName, .inputPass{
  height: 30px;
  width: 220px;
  border-radius: 30px;
  border-color: rgb(24, 174, 246);
  transition: background-color 0.5s; 
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
}

.BtnAndMsjError{
display: flex;
flex-direction: column;
align-items: center;
}

.btnIngresar{
  max-width: fit-content;
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  font-size: 16px;
  font-weight: bold;
  height: 40px;
  background-color: transparent;
  border-color: rgb(24, 174, 246);
  border-radius: 18px;
  border-style: solid;
  margin-top: 35px;
  transition: background-color 0.5s; 
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
}

.btnIngresar:active {
  background-color: rgb(24, 174, 246); 
  color: white; 
}

.msjError{
  color: red;
  font-weight: bold;
  min-height: 20px;
  font-size: 15px;
}
</style>
<template>
  <div class="bodyLogin">
    <NavbarCw/>
      <div class="containerLogin">
        <form class="formStyle">
          <h1>Iniciá sesión</h1>
          <section class="userName">
            <h4>Nombre de usuario</h4>
            <input class="inputName" type="text" v-model="nameUser" placeHolder="Ingresar nombre de usuario...">
          </section>
          <section class="userPassword">
            <h4>Contraseña</h4>
            <input class="inputPass" type="text" v-model="passwordUser" placeHolder="Ingresar contraseña...">  
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
import NavbarCw from "../components/NavbarCw.vue"

export default {

  components: {
    NavbarCw
  },

  data() {
    return {
      messageError: "",
      nameUser: "",
      passwordUser: "",
      //isVisible: true,
    };
  },

  methods: {
    finishLogin() {
      if (!this.nameUser) {
        this.messageError = "Por favor, ingrese el nombre de usuario.";
      } else if (!this.passwordUser) {
          this.messageError = "Debe ingresar una contraseña.";
        } else {
          this.messageError = "";
          this.$router.push('/profile');
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
  padding: 60px 60px;
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
  margin-bottom: 10px;
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

.btnIngresar{
  font-weight: bolder;
  max-width: fit-content;
  font-size: 16px;
  height: 40px;
  background-color: transparent;
  border-color: rgb(24, 174, 246);
  border-radius: 18px;
  border-style: solid;
  margin-top: 15px;
  transition: background-color 0.5s; 
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
}

.btnIngresar:active {
  background-color: rgb(24, 174, 246); 
  color: white; 
}

.BtnAndMsjError{
display: flex;
flex-direction: column;
align-items: center;
}

.msjError{
  color: red;
  font-weight: bold;
  min-height: 20px;
  font-size: 15px;
}
</style>
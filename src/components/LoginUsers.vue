<template>
  <body>
    <section>
      <div :class="{'containerLogin': isVisible, 'noneStyle': !isVisible}">
        <form v-show="isVisible" class="formStyle">
          <h1>Pantalla de Login</h1>
          <section class="userName">
            <p>Nombre de usuario</p>
            <input type="text" placeHolder="Ingrese su nombre de usuario...">
          </section>
          <section class="userPassword">
            <p>Contraseña</p>
            <input type="text" placeHolder="Ingrese su contraseña...">  
          </section>
        </form>
      </div>
    </section>
  </body>
</template>

<script>
export default{
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<style>
.styleBody{
  display: flex;
  justify-content: center;
  gap: 20px;
}

.containerLogin{
  display: flex;
  background-color: blue;
  max-width: 100%;
  padding: 120px;
  border-radius: 50px;
}

.noneStyle{
  opacity: 0;
}

.formStyle{
  background-color: red;
  display: flex;
  padding: 10px;
  gap: 20px;
}

</style>
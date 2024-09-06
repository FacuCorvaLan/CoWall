<template>
  <header class="headerCw">
    <div class="containerHead">
      <div class="logoCw">
        <img src="../assets/Images/logo-CoWall.png" class="imgLogo">
        <p class="NameWebsite">Cowall</p>
      </div>
      <div class="BtnSesion">
        <form>
          <input type="button" class="btnLogin" value="Iniciar Sesión">
        </form>
      </div>
    </div>
  </header>
  
  <body>
    <div class="containerPpal">
      <div>
        <h1>Cambia tu moneda, cambia tu futuro.</h1>
      </div>
      <div><img src="../assets/Images/FirstImg.jpg" class="firstImg"></div>
    </div>
  </body>
</template>

<style>
.headerCw{
  max-width: inherit;
  margin-top: 15px;
  margin-bottom: 50px;
}
body{
  margin: 0;
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

.btnLogin{
  max-width: 200px;
  font-size: 17px;
  height: 40px;
  background-color: transparent;
  border-color: rgb(24, 174, 246);
  border-radius: 18px;
  border-style: solid;
  font-family: "Titillium Web", sans-serif;
  font-style: normal;
  margin-right: 20px;
}

.containerPpal{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-family: Graphik Web, Helvetica Neue, Helvetica, Arial, Verdana, sans-serif;
}


</style>
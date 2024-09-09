<template>
  <header class="headerCw">
    <div class="containerHead">
      <div class="logoCw">
        <img src="../assets/Images/logo-CoWall.png" class="imgLogo">
        <p class="NameWebsite">CoWall</p>
      </div>
    </div>
  </header>
  
  <body>
    <div class="containerPpal">
      <div>
        <h1>Cambia tu moneda, cambia tu futuro.</h1>
        <p>Haz crecer tus inversiones hoy.</p>
        <div class="BtnSesion">
          <form>
            <input type="button" class="btnLogin" value="Iniciar Sesión">
          </form>
      </div>
      </div>
      <figure>
        <img src="../assets/Images/FirstImg.jpg" class="firstImg">
        <figcaption>Designed by Freepik.</figcaption>
      </figure>
    </div>
  </body>
  <footer>Copyright</footer>
</template>

<style>
body{
  margin: 0;
}

footer{
  background-color: rgb(31, 31, 58);
  color:white;
  font-size: 30px;
}

.headerCw{
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

.containerPpal{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-family: Graphik Web, Helvetica Neue, Helvetica, Arial, Verdana, sans-serif;
}

.containerPpal p{
  font-family: sans-serif;
  font-weight: bolder;
}

.loginUsers{
  background-color: rgb(88, 88, 184);
  color: white;
  display: flex;
  flex-direction: column;
  font-family: Graphik Web, Helvetica Neue, Helvetica, Arial, Verdana, sans-serif;
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
  margin-bottom: 10px;
  transition: background-color 0.5s; 
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
}

.btnLogin:active {
  background-color: rgb(24, 174, 246); 
  color: white; 
}
</style>
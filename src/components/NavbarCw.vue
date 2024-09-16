<template>
  <header class="headerCw">
    <div class="containerHead">
      <div class="logoCw">
        <img src="../assets/Images/logo-CoWall.png" class="imgLogo">
        <p class="NameWebsite">CoWall</p>
      </div>
      <div></div>
    </div>
  </header>
</template>

<style>
.headerCw{
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
</style>
<template>
<div class="walletCw">
  <section class="firstColumn">
    <h1>Mi Billetera</h1>
    <section class="userAmount">
      <p>Monto Total: $145.000</p><div class="showAmount">a</div>
    </section>
  </section>
  <section class="secondColumn">
    <h2>Últimos movimientos</h2>
    <ul class="lastMov">
      <li class="MovBox">asdasda</li>
      <li class="MovBox">zxczxcz</li>
    </ul>
    <div class="linkRecord"><p>Ver mi historial</p></div>
  </section>
</div>
</template>

<script></script>

<style>
.walletCw{
  margin: 15px;
  display: flex;
  justify-content: center;
  gap: 30px;
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  max-width: fit-content;
  height: 180px;
  border-color: rgb(24, 174, 246);
  border-style: solid;
  border-radius: 25px;
  border-width: 2px;
}

.firstColumn{
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.firstColumn h1{
  font-size: 55px;
  margin-top: 0;
  margin-bottom: 10px;
}

.firstColumn p{
  font-size: 20px;
}

.userAmount{
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.secondColumn{
  background-color: blue;
  color: white;
  padding: 20px; 
  border-radius: 25px;
}

.secondColumn h2{
  font-size: 25px;
  font-weight: lighter;
  margin-top: 0;
}

.linkRecord{
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
}

.lastMov{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
}

.lastMov li{
  list-style: none;
}
</style>
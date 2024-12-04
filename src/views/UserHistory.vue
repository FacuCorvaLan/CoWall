<template>
  <router-view/>
  <div class="tableContainer">
    <table>
        <thead>
          <tr>
            <th>Tipo de moneda</th>
            <th>Monto Total</th>
            <th>Nuevo monto</th>
            <th>Movimiento</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: "UserHistory"
}
</script>

<style scoped>
.tableContainer {
  width: 90%;
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  border-radius: 8px;
  background-color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

thead {
  background-color: blue;
  color: white;
}

th, td {
  padding: 12px 15px;
  border: 1px solid rgb(24, 174, 246);
}
</style>
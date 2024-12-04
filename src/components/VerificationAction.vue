<template>
  <div class="confirmation">
      <div class="Dates">
        <h2>¿Está seguro de realizar esta operación?</h2>
        <p>Operación: {{  }}</p>
        <p>Tipo de cripto: {{  }}</p>
        <p>Monto: {{ }}</p>
        <p>Monto en pesos: {{ }}</p>
      </div>

      <div class="btnsConfirm">
        <button @click="this.$store.dispatch('loadTransaction', true)" value="Confirmar"/>
        <button @click="this.$store.dispatch('loadTransaction', false)" value="Cancelar"/>
      </div>
    </div>
</template>

<script>
export default {
  methods: {}
}
</script>

<style scoped></style>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast';
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style>
.p-password-input {
  width: 100%!important;
}
.p-inputtext {
  width: 100%;
}
.p-select {
  width: 100%;
}
.p-datepicker {
  width: 100%;
}
.p-textarea {
  width: 100%;
}
.p-editor {
  width: 100%;
}
</style>

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
</style>

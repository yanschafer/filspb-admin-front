<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useToast } from "primevue/usetoast";
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

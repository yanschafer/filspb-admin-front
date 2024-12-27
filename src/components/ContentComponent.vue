import { selectedModelStore } from '../store/selected-model.store';
<template>
    <div class="card">
      <div :class="{'active': listActive}" @click="list">
        Список
      </div>
      <div :class="{'active': !listActive}" @click="create">
        Создать элемент
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import {selectedModelStore} from '@/store/selected-model.store'

  export default {
    name: "ContentComponent",
    data() {
      return {
        // activeTab: "", 
        // items: [
        //   { route: "", label: "Список", icon: "pi pi-list" },
        //   { route: "create", label: "Создать запись", icon: "pi pi-plus" }
        // ],
        selectedModel: selectedModelStore()
      };
    },
    methods: {
      list() {
        this.$router.push({path: `/dashboard/${this.$route.params.tab}`}).then(el => {
          this.selectedModel.toggleCreation(false)
        })
      },
      create() {
        this.$router.push({path: `/dashboard/${this.$route.params.tab}`}).then(() => {
          this.selectedModel.toggleCreation(true)
        })
      }
    },
    computed: {
      listActive() {
        return !this.selectedModel.creation
      }
    }
  };
  </script>
  
  <style scoped>
  div {
    font-size: 2rem;
    color: black;
  }
  .active {
    font-size: 3rem;
  }
  .tabs-wrapper {
    display: flex;
    flex-direction: row;
  }
  .card {
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  a {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 8px 16px;
    color: #333;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s ease;
    border-radius: 10px;
    cursor: pointer;
  }
  
  a:hover {
    background-color: #f9f3e6;
  }
  
  i {
    font-size: 1.2rem;
    margin-right: 8px;
  }
  </style>
  
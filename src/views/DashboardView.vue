<template>
    <HeaderComponent @toggle-sidebar="toggleSidebar" />
    <section class="section">
        <div class="sidebar-container" :class="{ 'sidebar-active': showSidebar }">
            <SidebarComponent />
        </div>
        <div class="content animate__animated animate__fadeIn" :class="{ 'content-full': !showSidebar }">
            <h1>Добро пожаловать</h1>
            <div class="create-button" @click="$router.push({path: `/dashboard/${$route.params.tab}/create`})">
              Создать элемент +
            </div>
            <ListComponent @update:items="updateItems" :items="listItems" />
        </div>
    </section>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import SidebarComponent from "../components/SidebarComponent.vue"
import ListComponent from '@/components/ListComponent.vue';
import { selectedModelStore } from '@/store/selected-model.store';

export default {
  components: {
    HeaderComponent,
    SidebarComponent,
    ListComponent
  },
  data() {
    return {
      listItems: [],
      fields: [],
      modelOptions: {},
      selectedModel: selectedModelStore(),
      keyUpdater: Date.now(),
      model: '',
      showSidebar: false
    };
  },
  created() {
    this.load()
    this.selectedModel.$onAction(({name, args}) => {
      if (name == 'swap')
        this.load()
    })
  },
  methods: {
    load() {
      this.selectedModel.loadModelByName(this.$route.params.tab).finally(() => {
        this.fields = this.selectedModel.fields
        this.listItems = this.selectedModel.items
        this.keyUpdater = Date.now()
      })
    },
    updateItems(updatedItems) {
      this.listItems = updatedItems;
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    }
  },
  computed: {
    listKey() {
      return this.$route.path + `${this.keyUpdater}`
    },
  }
};
</script>

<style scoped>
.section {
    display: flex;
    position: relative;
    min-height: calc(100vh - 4rem);
}

.sidebar-container {
    width: 280px;
    background: white;
    transition: transform 0.3s ease;
    height: calc(100vh - 4rem);
    position: fixed;
}

.content {
    flex: 1;
    padding: 2rem;
    transition: margin-left 0.3s ease;
    margin-left: 280px;
}

@media (max-width: 768px) {
    .section {
        margin-top: 4rem;
    }

    .sidebar-container {
        position: fixed;
        left: 0;
        top: 4rem;
        height: calc(100vh - 4rem);
        transform: translateX(-100%);
        z-index: 999;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    .sidebar-active {
        transform: translateX(0);
    }

    .content {
        margin-left: 0;
        width: 100%;
    }
}

.create-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f3e6;
    color: #b06700;
    padding: 1rem;
    max-width: fit-content;
    font-size: 18px;
    border-radius: 8px;
    margin-top: 2rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
}

.create-button:hover {
    background-color: #b06700;
    color: #f9f3e6;
}
</style>

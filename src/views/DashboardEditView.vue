<template>
    <HeaderComponent @toggle-sidebar="toggleSidebar" />
    <section class="section">
        <div class="sidebar-container" :class="{ 'sidebar-active': showSidebar }">
            <SidebarComponent />
        </div>
        <div class="content animate__animated animate__fadeIn">
            <h1>Добро пожаловать</h1>
            <div class="create-button" @click="$router.push({path: `/dashboard/${$route.params.tab}`})">
              Список элементов
            </div>
            <FormComponent :key="formKey" :fields="fields" :model-options="modelOptions" />
        </div>
    </section>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import SidebarComponent from "../components/SidebarComponent.vue"
import FormComponent from '@/components/FormComponent.vue';
import { selectedModelStore } from '@/store/selected-model.store';

export default {
  components: {
    HeaderComponent,
    SidebarComponent,
    FormComponent
  },
  data() {
    return {
      fields: [],
      modelOptions: {},
      selectedModel: selectedModelStore(),
      keyUpdater: Date.now(),
      showSidebar: false
    };
  },
  created() {
    this.selectedModel.creation = false;
    this.selectedModel.selectRow(this.$route.params.tab, parseInt(this.$route.params.item)).finally(() => {
      this.fields = this.selectedModel.fields
      this.loadSelectors()
    })
  },
  methods: {
    async loadSelectors() {
      await Promise.all(this.fields.map(async f => {
          if (f.type == 'model-selector' || f.type == 'model-multi-selector' || (f.type == 'checkbox-multi' && f.selectorModel)) {
            const data = await f.selectorModel.getAll()
            const opts = data.getData().map((el) => ({
              name: el.name,
              value: el.id
            }))
            this.modelOptions[f.item] = opts
          } else if (f.type == 'selector') {
            this.modelOptions[f.item] = Object.keys(f.selectorOptions).map(key => ({
              name: key,
              value: f.selectorOptions[key]
            }))
          }
        }))
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    }
  },
  computed: {
    formKey() {
      return this.$route.path + "aboba" + `${this.keyUpdater}`
    }
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

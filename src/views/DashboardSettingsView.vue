<template>
    <HeaderComponent @toggle-sidebar="toggleSidebar" />
    <section class="section">
        <div class="sidebar-container" :class="{ 'sidebar-active': showSidebar }">
            <SidebarComponent />
        </div>
        <div class="content animate__animated animate__fadeIn">
            <h1>Добро пожаловать</h1>
            <p>Добро пожаловать в панель управления, выберите в левом меню раздел, который хотите редактировать.</p>
            <FormComponent :fields="fields" :no-redirect="true" />
        </div>
    </section>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import SidebarComponent from "../components/SidebarComponent.vue"
import ListComponent from '../components/ListComponent.vue'
import FormComponent from '@/components/FormComponent.vue'
import SystemConfigurationModel from '@/api/modules/system_configuration/system-configuration.model';
import { selectedModelStore } from '@/store/selected-model.store'

export default {
  components: {
    HeaderComponent,
    SidebarComponent,
    ListComponent,
    FormComponent
  },
  data() {
    return {
      listItems: [],
      fields: [],
      form: false,
      selectedModelStore: selectedModelStore(),
      model: new SystemConfigurationModel(),
      showSidebar: false
    };
  },
  async mounted() {
    const data = (await this.model.getOne(1)).getData();
    this.selectedModelStore.model = this.model
    this.fields = this.model.fields.map(el => {
        if (data[el.item])
            el.value = data[el.item]
        return el
    })
    this.selectedModelStore.fields = this.fields
    this.selectedModelStore.creation = false
    this.selectedModelStore.selectedItem = {id: 1}
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    }
  },
  computed: {
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
</style>

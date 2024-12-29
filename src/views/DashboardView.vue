<template>
    <HeaderComponent />
    <section class="section">
        <SidebarComponent />
        <div class="content animate__animated animate__fadeIn">
            <h1>Добро пожаловать</h1>
            <div @click="$router.push({path: `/dashboard/${$route.params.tab}/create`})">
              Создать элемент
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
      model: ''
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
}
.content {
    padding: 2rem;
    width: 100%;
}
</style>

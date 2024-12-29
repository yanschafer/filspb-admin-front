<template>
    <HeaderComponent />
    <section class="section">
        <SidebarComponent />
        <div class="content animate__animated animate__fadeIn">
            <h1>Добро пожаловать</h1>
            <div @click="$router.push({path: `/dashboard/${$route.params.tab}`})">
              Таблица
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
      keyUpdater: Date.now()
    };
  },
  created() {
    this.selectedModel.creation = false;
    this.selectedModel.selectRow(this.$route.params.tab, parseInt(this.$route.params.item)).finally(() => {
      this.loadSelectors()
      this.fields = this.selectedModel.fields
    })
  },
  methods: {
    async loadSelectors() {
      await Promise.all(this.fields.map(async f => {
          if (f.type == 'model-selector' || (f.type == 'checkbox-multi' && f.selectorModel)) {
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
  },
  computed: {
    formKey() {
      // this.loadRouteView()
      return this.$route.path + "aboba" + `${this.keyUpdater}`
    }
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

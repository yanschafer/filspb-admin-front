<template>
    <HeaderComponent />
    <section class="section">
        <SidebarComponent />
        <div class="content">
            <h1>Добро пожаловать</h1>
            <p>Добро пожаловать в панель управления, выберите в левом меню раздел, который хотите редактировать.</p>
            <ContentComponent />
            <FormComponent :key="formKey" v-if="form" :fields="fields" :model-options="modelOptions" />
            <ListComponent :key="listKey" v-else @update:items="updateItems" :items="listItems" />
        </div>
    </section>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import SidebarComponent from "../components/SidebarComponent.vue"
import ContentComponent from '../components/ContentComponent.vue'
import ListComponent from '../components/ListComponent.vue'
import { selectedModelStore } from '../store/selected-model.store';
import FormComponent from '@/components/FormComponent.vue'


export default {
  components: {
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    ListComponent,
    FormComponent
  },
  data() {
    return {
      listItems: [],
      fields: [],
      modelOptions: {},
      form: false,
      selectedModel: selectedModelStore(),
      keyUpdater: Date.now()
    };
  },
  mounted() {
    this.loadRouteView()
    this.selectedModel.$onAction(async ({ name, args }) => {
      if (name == 'toggleCreation') {
        await this.loadRouteView()
        this.fields = this.fields.map(el => el.type == 'writer' ? {...el, value: ""} : el)
        this.keyUpdater = Date.now()
        this.form = args[0]
      }
      if (name == 'swapTo') {
        await this.loadData(args[0])
        this.keyUpdater = Date.now()
      }
      if (name == 'swapToEdit') {
        await this.loadData(args[0], args[1])
        this.keyUpdater = Date.now()
      }
    });
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
    async loadData(model, row) {
      if (row) {
        this.form = true
        await this.selectedModel.selectRow(model, parseInt(row))
        this.fields = this.selectedModel.fields
        this.listItems = this.selectedModel.items
        await this.loadSelectors()
        this.selectedModel.updateSelectorFields(this.modelOptions)
        return
      }

      if (model) {
        await this.selectedModel.loadModelByName(model)
        this.fields = this.selectedModel.fields
        this.listItems = this.selectedModel.items
        await this.loadSelectors()
        this.selectedModel.updateSelectorFields(this.modelOptions)
      }
    },
    async loadRouteView() {
      this.loadData(this.$route.params.tab, this.$route.params.item)
    },
    updateItems(updatedItems) {
      this.listItems = updatedItems;
    },
  },
  computed: {
    showForm() {
      return this.form
    },
    listKey() {
      // this.loadRouteView()
      return this.$route.path + `${this.keyUpdater}`
    },
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

<template>
    <HeaderComponent />
    <section class="section">
        <SidebarComponent />
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
  },
  computed: {
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

<template>
    <HeaderComponent />
    <section class="section">
        <SidebarComponent />
        <div class="content">
            <h1>Добро пожаловать</h1>
            <p>Добро пожаловать в панель управления, выберите в левом меню раздел, который хотите редактировать.</p>
            <FormComponent :fields="fields" />
            <!-- <ContentComponent /> -->
            <!-- <ListComponent :key="listKey" v-else @update:items="updateItems" :items="listItems" /> -->
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
import SystemConfigurationModel from '@/api/modules/system_configuration/system-configuration.model';


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
      form: false,
      model: new SystemConfigurationModel(),
    };
  },
  async mounted() {
    const data = (await this.model.getOne(1)).getData();
    this.fields = this.model.fields.map(el => {
        if (data[el.item])
            el.value = data[el.item]
        return el
    })
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

<template>
    <HeaderComponent />
    <section class="section">
        <SidebarComponent />
        <div class="content">
            <h1>Добро пожаловать</h1>
            <p>Добро пожаловать в панель управления, выберите в левом меню раздел, который хотите редактировать.</p>
            <ContentComponent />
            <ListComponent :key="listKey" v-if="!form" @update:items="updateItems" :items="listItems" />
            <FormComponent :key="formKey" v-else />
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
import { useRoute } from 'vue-router';


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
      form: false,
    };
  },
  mounted() {
    this.loadRouteView()
  },
  methods: {
    loadRouteView() {
      const selectedModel = selectedModelStore()
      if (this.$route.params.item) {
        this.form = true
        selectedModel.selectRow(this.$route.params.tab, parseInt(this.$route.params.item))
        this.listItems = selectedModel.items;
        return
      }

      if (this.$route.params.tab) {
        selectedModel.loadModelByName(this.$route.params.tab)
        this.listItems = selectedModel.items;
      }
    },
    updateItems(updatedItems) {
      this.listItems = updatedItems;
    },
  },
  computed: {
    listKey() {
      // this.loadRouteView()
      return this.$route.path
    },
    formKey() {
      // this.loadRouteView()
      return this.$route.path + "aboba"
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

<template>
    <HeaderComponent />
    <section class="section">
        <SidebarComponent />
        <div class="content">
            <h1>Добро пожаловать</h1>
            <p>Добро пожаловать в панель управления, выберите в левом меню раздел, который хотите редактировать.</p>
            <ContentComponent />
            <ListComponent @update:items="updateItems" :items="listItems" />
            <FormComponent />
        </div>
    </section>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import SidebarComponent from "../components/SidebarComponent.vue"
import ContentComponent from '../components/ContentComponent.vue'
import ListComponent from '../components/ListComponent.vue'
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
      listItems: Array.from({ length: 20 }, (v, i) => ({
        id: i + 1,
        name: `Элемент ${i + 1}`,
      })),
    };
  },
  methods: {
    updateItems(updatedItems) {
      this.listItems = updatedItems;
    },
  },
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

<template>
  <div class="card animate__animated animate__fadeIn">
    <TabMenu
      :key="key" 
      :model="tabs"
      :activeItem="activeTab"
      @tab-change="onTabChange"
    />
    <div class="tab-content">
      <div v-if="listActive">
        <!-- Контент списка -->
      </div>
      <div v-else>
        <!-- Контент создания -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { TabMenu } from "primevue";
import { selectedModelStore } from "@/store/selected-model.store";

export default defineComponent({
  name: "ContentComponent",
  components: { TabMenu },
  setup() {
    const selectedModel = selectedModelStore();
    const route = useRoute();

    // Вкладки
    const tabs = [
      { label: "Список", icon: "pi pi-list", command: list },
      { label: "Создать элемент", icon: "pi pi-plus", command: create },
    ];

    // Реактивное состояние для активной вкладки
    const activeTab = ref(tabs[0]);

    // Уникальный ключ для перерисовки TabMenu
    const key = ref(0);

    // Логика переключения на "Список"
    function list() {
      selectedModel.toggleCreation(false);
      activeTab.value = tabs[0];
    }

    // Логика переключения на "Создать элемент"
    function create() {
      selectedModel.toggleCreation(true);
      activeTab.value = tabs[1];
    }

    // Обработчик изменения вкладки
    function onTabChange(event: { index: number }) {
      const tab = tabs[event.index];
      if (tab.command) tab.command();
    }

    // Сбрасывать активный таб при изменении маршрута
    watch(
      () => route.path,
      () => {
        list(); // Сбрасываем состояние на "Список"
        key.value++; // Обновляем ключ для перерисовки TabMenu
      }
    );

    return {
      tabs,
      activeTab,
      key,
      listActive: computed(() => !selectedModel.creation),
      onTabChange,
    };
  },
});
</script>

<style scoped>
.tab-content {
  border-radius: 5px;
}

h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}
</style>

<template>
  <div class="card">
    <TabMenu
      :model="tabs"
      :activeItem="activeTab"
      @tab-change="onTabChange"
    />
    <div class="tab-content">
      <div v-if="listActive">
      </div>
      <div v-else>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { TabMenu } from "primevue";
import { selectedModelStore } from "@/store/selected-model.store";

export default defineComponent({
  name: "ContentComponent",
  components: { TabMenu },
  setup() {
    const selectedModel = selectedModelStore();

    // Вкладки
    const tabs = [
      { label: "Список", icon: "pi pi-list", command: list },
      { label: "Создать элемент", icon: "pi pi-plus", command: create },
    ];

    // Активная вкладка
    const activeTab = computed(() => (selectedModel.creation ? tabs[1] : tabs[0]));

    // Логика переключения на "Список"
    function list() {
      selectedModel.toggleCreation(false);
    }

    // Логика переключения на "Создать элемент"
    function create() {
      selectedModel.toggleCreation(true);
    }

    // Обработчик изменения вкладки
    function onTabChange(event: { index: number }) {
      const tab = tabs[event.index];
      if (tab.command) tab.command();
    }

    return {
      tabs,
      activeTab,
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

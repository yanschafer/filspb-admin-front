<template>
  <div class="data-table-container">
    <h2>Список записей</h2>
    <!-- Поле для поиска -->
    <div class="search-bar">
      <InputText
        v-model="searchQuery"
        placeholder="Поиск..."
        class="search-input"
      />
    </div>

    <!-- Таблица данных с фильтрацией и сортировкой -->
    <DataTable
      :value="filteredItems"
      :paginator="true"
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
    >
      <!-- Поле ID -->
      <Column
        field="id"
        header="ID"
        sortable
        filter
        :style="{ width: '10%' }"
      />
      
      <Column
        v-for="field in fields"
        :field="field.key"
        :header="field.header"
        sortable
        filter
        :style="{ width: `${60 / fields.length}%` }"
      />
      <!-- Поле Управление -->
      <Column header="Управление" :style="{ width: '10%' }">
        <template #body="slotProps">
          <div class="action-buttons">
            <button @click="viewItem(slotProps.data)" class="action-btn">
              <i class="pi pi-eye" />
            </button>
            <button @click="moveUp(slotProps.data)" class="action-btn">
              <i class="pi pi-arrow-up" />
            </button>
            <button @click="moveDown(slotProps.data)" class="action-btn">
              <i class="pi pi-arrow-down" />
            </button>
            <button @click="editItem(slotProps.data)" class="action-btn">
              <i class="pi pi-pencil" />
            </button>
            <button @click="deleteItem(slotProps.data)" class="action-btn">
              <i class="pi pi-trash" />
            </button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { selectedModelStore } from '../store/selected-model.store';

export default {
  name: "ListComponent",
  components: {
    DataTable,
    Column,
    InputText,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
      selectedModel: selectedModelStore()
    }
  },
  data() {
    return {
      searchQuery: "", // Строка поиска
    };
  },
  computed: {
    // Фильтруемые данные
    filteredItems() {
      if (!this.searchQuery) return this.items;
      const query = this.searchQuery.toLowerCase();
      return this.items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          String(item.id).includes(query)
      );
    },
    fields() {
      return this.selectedModel.cols
    }
  },
  methods: {
  moveUp(item) {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index > 0) {
      // Меняем местами текущий элемент и предыдущий
      [this.items[index - 1], this.items[index]] = [
        this.items[index],
        this.items[index - 1],
      ];
      this.selectedModel.moveRowUp(item.id)
      // Оповещаем родительский компонент об изменении
      this.$emit("update:items", [...this.items]);
    }
  },
  moveDown(item) {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index < this.items.length - 1) {
      // Меняем местами текущий элемент и следующий
      [this.items[index], this.items[index + 1]] = [
        this.items[index + 1],
        this.items[index],
      ];
      this.selectedModel.moveRow(item.id)
      // Оповещаем родительский компонент об изменении
      this.$emit("update:items", [...this.items]);
    }
  },
  viewItem(item) {
    this.selectedModel.toggleView(item.id)
  },
  editItem(item) {
    this.$router.push({path: `/dashboard/${this.$route.params.tab}/${item.id}`})
  },
  deleteItem(item) {
    if (confirm(`Удалить ${item.name}?`)) {
      this.selectedModel.delete(item.id)
      this.$emit(
        "update:items",
        this.items.filter((i) => i.id !== item.id)
      );
    }
  },
},
};
</script>

<style scoped>
.data-table-container {
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-bar {
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  justify-content: space-between; /* Разделяет кнопки */
  gap: 0.5rem;
}

.action-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.action-btn:hover {
  color: #b06700;
}
</style>

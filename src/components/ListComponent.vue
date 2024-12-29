<template>
  <div class="data-table-container animate__animated animate__fadeIn">
    <h2>Список записей</h2>
    <div class="search-bar">
      <InputText
        v-model="searchQuery"
        placeholder="Поиск..."
        class="search-input"
      />
    </div>

    <DataTable :value="filteredItems" :paginator="true" :rows="10">
      <Column field="id" header="#" sortable filter :style="{ width: '10%' }" />

      <Column
        v-for="field in fields"
        :key="field.key"
        :field="field.key"
        :header="field.header"
        sortable
        filter
        :style="{ width: `${60 / fields.length}%` }"
      >
        <template #body="slotProps">
          <img
            v-if="isImageField(field.key)"
            :src="getImagePath(slotProps.data[field.key])"
            alt="Изображение"
            style="max-width: 100px; max-height: 100px; object-fit: contain;"
          />
          <span v-else>{{ slotProps.data[field.key] }}</span>
        </template>
      </Column>

      <Column header="Управление" :style="{ width: '10%' }">
        <template #body="slotProps">
          <div class="action-buttons">
            <button v-if="showControls" @click="viewItem(slotProps.data)" class="action-btn">
              <i v-if="slotProps.data.visible" class="pi pi-eye" />
              <i v-else class="pi pi-eye-slash" />
            </button>
            <button v-if="showControls" @click="moveUp(slotProps.data)" class="action-btn">
              <i class="pi pi-arrow-up" />
            </button>
            <button v-if="showControls" @click="moveDown(slotProps.data)" class="action-btn">
              <i class="pi pi-arrow-down" />
            </button>
            <button @click="editItem(slotProps.data)" class="action-btn">
              <i class="pi pi-pencil" />
            </button>
            <button v-if="showDelete" @click="deleteItem(slotProps.data)" class="action-btn">
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
import { selectedModelStore } from "../store/selected-model.store";
import { format } from "date-fns";

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
      selectedModel: selectedModelStore(),
    };
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    processedItems() {
      return this.items.map((item) => {
        const formattedItem = { ...item };
        for (const key in formattedItem) {
          if (this.isTimestamp(formattedItem[key])) {
            formattedItem[key] = this.formatDate(formattedItem[key]);
          }
        }
        return formattedItem;
      });
    },
    filteredItems() {
      if (!this.searchQuery) return this.processedItems;

      const query = this.searchQuery.toLowerCase();

      return this.processedItems.filter((item) => {
        const nameMatch = item.name && item.name.toLowerCase().includes(query);
        const idMatch = item.id && String(item.id).includes(query);

        return nameMatch || idMatch;
      });
    },
    fields() {
      return this.selectedModel.cols;
    },
    showControls() {
      return this.selectedModel.showPositionAndVisibilityControls;
    },
    showDelete() {
      return this.selectedModel.modelName != "admins" || this.items.length > 1;
    },
  },
  methods: {
    isImageField(fieldKey) {
      return fieldKey === "image" || fieldKey === "photo" || fieldKey.includes("image");
      console.log(`isImageField(${fieldKey}) =`, result);
      return result;
    },
    getImagePath(imagePath) {
      const baseUrl = "https://filspb.dudosyka.ru/files";
      return `${baseUrl}${imagePath}`;
    },
    isTimestamp(value) {
      return typeof value === "number" && value > 1000000000 && value < 9999999999999;
    },
    formatDate(timestamp) {
      try {
        const date = new Date(timestamp);
        return format(date, "yyyy-MM-dd");
      } catch (error) {
        console.error("Ошибка форматирования даты:", error);
        return timestamp;
      }
    },
    moveUp(item) {
      const index = this.items.findIndex((i) => i.id === item.id);
      if (index > 0) {
        [this.items[index - 1], this.items[index]] = [
          this.items[index],
          this.items[index - 1],
        ];
        this.selectedModel.moveRowUp(item.id);
        this.$emit("update:items", [...this.items]);
      }
    },
    moveDown(item) {
      const index = this.items.findIndex((i) => i.id === item.id);
      if (index < this.items.length - 1) {
        [this.items[index], this.items[index + 1]] = [
          this.items[index + 1],
          this.items[index],
        ];
        this.selectedModel.moveRowDown(item.id);
        this.$emit("update:items", [...this.items]);
      }
    },
    viewItem(item) {
      this.selectedModel.toggleCreation(false);
      item.visible = !item.visible;
      this.$emit("update:items", this.items);
    },
    editItem(item) {
      this.selectedModel.swapToEdit(this.$route.params.tab, item.id);
      this.$router.push({
        path: `/dashboard/${this.$route.params.tab}/${item.id}`,
      });
    },
    deleteItem(item) {
      if (confirm(`Удалить ${item.name}?`)) {
        this.selectedModel.delete(item.id);
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
  justify-content: space-between; 
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

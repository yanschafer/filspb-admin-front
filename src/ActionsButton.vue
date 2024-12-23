<script>
export const ActionButtons = {
  props: ["data", "onAction"],
  template: `
    <div class="action-buttons">
      <button @click="() => onAction({ type: 'view', data })" class="action-btn">
        <i class="pi pi-eye" />
      </button>
      <button @click="() => onAction({ type: 'moveUp', data })" class="action-btn">
        <i class="pi pi-arrow-up" />
      </button>
      <button @click="() => onAction({ type: 'moveDown', data })" class="action-btn">
        <i class="pi pi-arrow-down" />
      </button>
      <button @click="() => onAction({ type: 'edit', data })" class="action-btn">
        <i class="pi pi-pencil" />
      </button>
      <button @click="() => onAction({ type: 'delete', data })" class="action-btn">
        <i class="pi pi-trash" />
      </button>
    </div>
  `,
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
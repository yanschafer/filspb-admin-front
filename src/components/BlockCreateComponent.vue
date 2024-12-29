<template>
  <div>
    <div class="p-field p-grid">
      <div class="p-col-4">
        <InputText v-model="name" placeholder="Имя" />
      </div>
      <div class="p-col-4">
        <InputText v-model="position" placeholder="Должность" />
      </div>
      <div class="p-col-4">
        <Button label="Добавить" icon="pi pi-plus" @click="addPerson" />
      </div>
    </div>

    <Transition name="fade">
      <DataTable v-if="field.value?.length > 0" :value="field.value" class="p-datatable-gridlines" responsiveLayout="scroll">
        <Column field="name" header="Имя" />
        <Column field="position" header="Должность" />
        <Column header="Действия">
          <template #body="{ data }">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text" @click="editPerson(data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-text" @click="removePerson(data)" />
            <Button icon="pi pi-arrow-up" class="p-button-rounded p-button-text" @click="moveUp(data)" :disabled="isFirst(data)" />
            <Button icon="pi pi-arrow-down" class="p-button-rounded p-button-text" @click="moveDown(data)" :disabled="isLast(data)" />
          </template>
        </Column>
      </DataTable>
    </Transition>

    <Dialog v-model:visible="isEditing" header="Редактирование" :modal="true" :closable="false" :draggable="false" :dismissableMask="true">
      <div class="p-fluid">
        <div class="p-field">
          <label for="editName">Имя</label>
          <InputText id="editName" v-model="editedPerson.name" />
        </div>
        <div class="p-field">
          <label for="editPosition">Должность</label>
          <InputText id="editPosition" v-model="editedPerson.position" />
        </div>
      </div>
      <div class="p-dialog-footer">
        <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="isEditing = false" />
        <Button label="Сохранить" icon="pi pi-check" class="p-button-text" @click="saveEdit" />
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';

export default {
  name: 'BlockCreateComponent',
  components: {
    InputText,
    Button,
    DataTable,
    Column,
    Dialog
  },
  props: ["field"],
  data() {
    return {
      name: '',
      position: '',
      isEditing: false,
      editedPerson: {},
      editingIndex: null
    };
  },
  methods: {
    addPerson() {
  if (!this.field.value) this.field.value = []; // Убедитесь, что массив существует
  if (this.name.trim() && this.position.trim()) {
    this.field.value.push({
      id: Date.now(),
      name: this.name,
      position: this.position
    });
    this.name = ''; // Сбросить поле имени
    this.position = ''; // Сбросить поле должности
  }
},
    removePerson(item) {
      this.field.value = this.field.value.filter(person => person.id !== item.id);
    },
    moveUp(item) {
      const index = this.field.value.findIndex(i => i.id === item.id);
      if (index > 0) {
        [this.field.value[index - 1], this.field.value[index]] = [this.field.value[index], this.field.value[index - 1]];
      }
    },
    moveDown(item) {
      const index = this.field.value.findIndex(i => i.id === item.id);
      if (index < this.field.value.length - 1) {
        [this.field.value[index], this.field.value[index + 1]] = [this.field.value[index + 1], this.field.value[index]];
      }
    },
    isFirst(item) {
      return this.field.value[0] === item;
    },
    isLast(item) {
      return this.field.value[this.field.value.length - 1] === item;
    },
    editPerson(item) {
      this.editingIndex = this.field.value.findIndex(person => person.id === item.id);
      this.editedPerson = { ...item };
      this.isEditing = true;
    },
    saveEdit() {
      if (this.editingIndex !== null) {
        this.$set(this.field.value, this.editingIndex, { ...this.editedPerson });
        this.isEditing = false;
      }
    }
  }
};
</script>


  
  <style>
  .p-grid {
    display: flex;
    gap: 2rem;
  }
  .p-field {
    margin-bottom: 1rem;
  }
  .p-datatable .p-button {
    margin-right: 0.5rem;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  #block-create {
    width: 100%;
  }
  </style>
  
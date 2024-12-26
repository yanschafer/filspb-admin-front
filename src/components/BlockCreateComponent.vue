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
        <DataTable v-if="people.length > 0" :value="people" class="p-datatable-gridlines" responsiveLayout="scroll">
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
  
  <script>
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
    data() {
      return {
        name: '',
        position: '',
        people: [],
        isEditing: false,
        editedPerson: {},
        editingIndex: null
      };
    },
    methods: {
      addPerson() {
        if (this.name.trim() && this.position.trim()) {
          this.people.push({ id: Date.now(), name: this.name, position: this.position });
          this.name = '';
          this.position = '';
        }
      },
      removePerson(item) {
        this.people = this.people.filter(person => person.id !== item.id);
      },
      moveUp(item) {
        const index = this.people.findIndex(i => i.id === item.id);
        if (index > 0) {
          [this.people[index - 1], this.people[index]] = [this.people[index], this.people[index - 1]];
          this.$emit('update:items', [...this.people]);
        }
      },
      moveDown(item) {
        const index = this.people.findIndex(i => i.id === item.id);
        if (index < this.people.length - 1) {
          [this.people[index], this.people[index + 1]] = [this.people[index + 1], this.people[index]];
          this.$emit('update:items', [...this.people]);
        }
      },
      isFirst(item) {
        return this.people[0] === item;
      },
      isLast(item) {
        return this.people[this.people.length - 1] === item;
      },
      editPerson(item) {
        this.editingIndex = this.people.findIndex(person => person.id === item.id);
        this.editedPerson = { ...item };
        this.isEditing = true;
      },
      saveEdit() {
        if (this.editingIndex !== null) {
          this.$set(this.people, this.editingIndex, { ...this.editedPerson });
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
  </style>
  
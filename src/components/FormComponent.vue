<template>
  <div class="form-wrapper">
    <template v-for="field in fields">
      <!-- Текст с ошибкой -->
      <div v-if="field.type == 'text'" class="input-group">
        <label :for="field.item">{{ field.label }}</label>
        <InputText
          :id="field.item"
          v-model="field.value"
          :invalid="!field.value"
          :placeholder="field.label"
        />
      </div>

      <!-- Для паролей -->
      <div v-if="field.type == 'text-hidden'" class="input-group">
        <label :for="field.item">{{ field.label }}</label>
        <InputText
          type="password"
          :id="field.item"
          v-model="field.value"
          :invalid="!field.value"
          :placeholder="field.label"
        />
      </div>

      <!-- Дата -->
      <div v-if="field.type == 'timestamp'" class="input-group">
        <label :for="field.item">{{field.label}}</label>
        <DatePicker :id="field.item" v-model="field.dateValue" @update:modelValue="change(field)" />
      </div>

      <!-- Селект -->
      <div v-if="field.type == 'selector' || field.type == 'model-selector'" class="input-group">
        <label :for="field.item">{{field.label}}</label>
        <Select
          :id="field.item"
          v-model="field.value"
          :options="getSelectorOptions(field)"
          filter
          optionLabel="name"
          :placeholder="field.label"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Select>
      </div>

      <!-- File -->
      <div v-if="field.type == 'file' || field.type == 'image'" class="input-group">
        <label :for="field.item">{{field.label}}</label>
        <FileUpload
          :id="field.item"
          mode="basic"
          @select="onFileSelect($event, field)"
          customUpload
          auto
          severity="secondary"
          class="p-button-outlined"
          :chooseLabel="field.type == 'image' ? 'Выбрать изображение' : 'Выбрать файл'"
        />
        <img v-if="field.value && field.type == 'image'" :src="field.value" alt="Image" class="img-preview" />
      </div>

      <!-- Writer -->
      <div v-if="field.type == 'writer'" class="input-group">
        <label :for="field.item">{{field.label}}</label>
        <Editor :id="field.item" :key="`${field.item}-${field.value}`" v-model="field.value" editorStyle="height: 320px" />
      </div>

      <!-- Long text -->
      <div v-if="field.type == 'long-text'" class="input-group">
        <label :for="field.item">{{field.label}}</label>
        <Textarea :id='field.item' v-model="field.value" rows="5" cols="30" />
      </div>

      <div v-if="field.type == 'sequential'" class="input-group">
        <label for="block-create">{{field.label}}</label>
        <BlockCreateComponent :field="field" id="block-create" />
      </div>
      <!-- Checkbox -->
      <div v-if="field.type == 'checkbox-multi'" class="input-group">
        <CheckboxMulti 
          :item="field.item"
          :label="field.label"
          :checked="field.value"
          :opts="getSelectorOptions(field)"
          @updated="checkboxUpdated($event, field)"
        />
      </div>
    </template>

    <button @click="save">Save</button>

    <!-- <div class="input-group">
      <label for="img-select">Файл аплоуд для доков</label>
      <FileUpload
        ref="fileupload"
        mode="basic"
        name="demo[]"
        url="/api/upload"
        accept="image/*"
        :maxFileSize="1000000"
        @upload="onUpload"
        chooseLabel="Выберите файл"
      />
    </div> -->
    <Toast />
  </div>
</template>

<script lang="ts">
import {
  InputText,
  DatePicker,
  Select,
  FileUpload,
  Textarea,
  Checkbox,
} from "primevue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import Editor from "primevue/editor";
import BlockCreateComponent from "./BlockCreateComponent.vue";
import type { FieldDto } from "@/api/modules/base.model";
import { selectedModelStore } from '../store/selected-model.store';
import { ref } from "vue";
import CheckboxMulti from "./CheckboxMulti.vue";

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
};

export default {
  name: "FormComponent",
  components: {
    InputText,
    DatePicker,
    Select,
    FileUpload,
    Editor,
    Textarea,
    Checkbox,
    BlockCreateComponent, 
    CheckboxMulti,
    Toast
  },
  props: ["fields", "modelOptions"],
  data() {
    return {
      selectedModel: selectedModelStore(),
      selectedItems: null,
      value: "",
      pizza: null,
      items: [
        { name: "Australia", code: "AU" },
        { name: "Brazil", code: "BR" },
        { name: "China", code: "CN" },
        { name: "Egypt", code: "EG" },
        { name: "France", code: "FR" },
        { name: "Germany", code: "DE" },
        { name: "India", code: "IN" },
        { name: "Japan", code: "JP" },
        { name: "Spain", code: "ES" },
        { name: "United States", code: "US" },
      ]
    };
  },
  async created() {
    this.toast = useToast();
  },
  methods: {
    change(field) {
      field.value = field.dateValue.getTime()
    },
    async save() {
      const res = await this.selectedModel.save()

      if (res.success) {
          this.toast.add({
            severity: "success",
            summary: "Форма отправлена",
            detail: "Создание успешно!",
            life: 3000,
          });
          await this.selectedModel.refreshModel()
          this.$router.push({path: `/dashboard/${this.$route.params.tab}`}).then(() => {
            this.selectedModel.toggleCreation(false)
          })
      } else {
          this.toast.add({
            severity: "error",
            summary: "Ошибка валидации",
            detail: "Пожалуйста, проверьте поля формы.",
            life: 3000,
          });
      }
    },
    getSelectorOptions(field: FieldDto) {
      if (field.selectorModel) {
        const res = this.modelOptions[field.selectorModel]
        if (res) return res
        else return []
      }
      return Object.keys(field.selectorOptions ? field.selectorOptions : {}).map(key => ({
        name: key,
        value: field.selectorOptions[key]
      }))
    },
    checkboxUpdated(e, field) {
      field.value = e.map(parseInt)
    },
    imageSrc(field) {
      if (!field.value) return null

      field.value
    },
    async onFileSelect(event, field: FieldDto) {
      const file = event.files[0];
      const reader = new FileReader();
      field.value = (await convertToBase64(file))
    },
  },
};
</script>

<style scoped>
.form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  max-width: 40rem;
  align-items: start;
}
.img-preview {
  max-width: 300px;
}
.checkbox-wrapper {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>

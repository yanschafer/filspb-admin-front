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

      <!-- Дата -->
      <div v-if="field.type == 'timestamp'" class="input-group">
        <label :for="field.item">{{field.label}}</label>
        <DatePicker :id="field.item" v-model="field.value" />
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
        <label :for="field.item">{{field.label}}к</label>
        <FileUpload
          :id="field.item"
          mode="basic"
          @select="onFileSelect"
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
        <Editor :id="field.item" v-model="field.value" editorStyle="height: 320px" />
      </div>

      <!-- Long text -->
      <div v-if="field.type == 'long-text'" class="input-group">
        <label :for="field.item">{{field.label}}</label>
        <Textarea :id='field.item' v-model="field.value" rows="5" cols="30" />
      </div>

      <!-- Checkbox -->
      <!-- <div v-if="field.type == 'checkbox'" class="input-group">
        <label :for="field.item">{{field.label}}</label>
        <div class="checkbox-wrapper">
          <div class="checkbox-single">
            <Checkbox
              v-model="pizza"
              inputId="ingredient1"
              name="pizza"
              value="Cheese"
            />
            <label for="ingredient1"> Cheese </label>
          </div>
          <div class="checkbox-single">
            <Checkbox
              v-model="pizza"
              inputId="ingredient1"
              name="pizza"
              value="Cheese"
            />
            <label for="ingredient1"> Cheese </label>
          </div>
          <div class="checkbox-single">
            <Checkbox
              v-model="pizza"
              inputId="ingredient1"
              name="pizza"
              value="Cheese"
            />
            <label for="ingredient1"> Cheese </label>
          </div>
          <div class="checkbox-single">
            <Checkbox
              v-model="pizza"
              inputId="ingredient1"
              name="pizza"
              value="Cheese"
            />
            <label for="ingredient1"> Cheese </label>
          </div>
        </div>
      </div> -->
    </template>

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
import Editor from "primevue/editor";

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
  },
  data() {
    return {
      selectedItems: null,
      src: null,
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
      ],
    };
  },
  methods: {
    onFileSelect(event) {
      const file = event.files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        this.src = e.target.result;
      };

      reader.readAsDataURL(file);
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

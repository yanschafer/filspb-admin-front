<template>
  <div class="form-wrapper">
    <!-- Текст -->
    <div class="input-group">
      <label for="username">Username</label>
      <InputText id="username" v-model="value" placeholder="Текстовый" />
    </div>
    <!-- Текст с ошибкой -->
    <div class="input-group">
      <label for="username">Username</label>
      <InputText
        id="username"
        v-model="value"
        :invalid="!value"
        placeholder="Что-то не так"
      />
    </div>
    <!-- Дата -->
    <div class="input-group">
      <label for="date">Дата</label>
      <DatePicker id="date" v-model="date" />
    </div>
    <!-- Селект -->
    <div class="input-group">
      <label for="select">Селект</label>
      <Select
        id="Select"
        v-model="selectedItems"
        :options="items"
        filter
        optionLabel="name"
        placeholder="Select a Country"
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
    <div class="input-group">
      <label for="img-select">Файл аплоуд для картинок</label>
      <FileUpload
        id="img-select"
        mode="basic"
        @select="onFileSelect"
        customUpload
        auto
        severity="secondary"
        class="p-button-outlined"
        chooseLabel="Выбрать изображение"
      />
      <img v-if="src" :src="src" alt="Image" class="img-preview" />
    </div>
    <div class="input-group">
      <label for="img-select">Рич эдитор</label>
      <Editor v-model="value" editorStyle="height: 320px" />
    </div>
    <div class="input-group">
      <label for="img-select">Текст</label>
      <Textarea v-model="value" rows="5" cols="30" />
    </div>
    <div class="input-group">
      <label for="img-select">Чекбоксы</label>
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
    </div>
    <div class="input-group">
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
    </div>
    <div class="input-group">
      <label for="block-create">Авторы мероприятия</label>
      <BlockCreateComponent id="block-create" />
    </div>
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
import BlockCreateComponent from "./BlockCreateComponent.vue";

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
    BlockCreateComponent
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

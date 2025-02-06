<template>
  <div class="form-wrapper animate__animated animate__fadeIn">
    <h2>Создание элемента</h2>
    <template v-for="(field, index) in fields">
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


      <!-- Для чисел -->
      <div v-if="field.type == 'text-number'" class="input-group">
        <label :for="field.item">{{ field.label }}</label>
        <InputText
          type="password"
          :id="field.item"
          v-model.number="field.value"
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

      <!-- Мульти Селект -->
      <div v-if="field.type == 'model-multi-selector'" class="input-group">
        <label :for="field.item">{{field.label}}</label>
        <MultiSelect
          :id="field.item"
          :modelValue="selectedValues[field.item]"
          :options="getSelectorOptions(field)"
          @update:modelValue="(val) => handleMultiSelectorChange(val, field)"
          filter
          optionLabel="name"
          optionValue="value"
          :placeholder="field.label"
          display="chip"
          class="w-full"
          :showToggleAll="false"
          :selectAll="false"
          dataKey="value"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.length > 0" class="multiselect-chips-container">
              <Chip 
                v-for="option in getSelectedOptions(field, slotProps.value)" 
                :key="option.value"
                class="multiselect-chip"
              >
                {{ option.name }}
              </Chip>
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
        </MultiSelect>
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
        <img v-if="field.value && field.type == 'image'" :src="getImageSource(field.value)" alt="Image" class="img-preview" />
        <a v-else @click="downloadFile(field.value)" href="#">{{ getLoadedFilePreview(field) }}</a>
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
      <Divider v-if="index < fields.length - 1" />
    </template>

    <Button class="save-btn" severity="success" @click="save">Сохранить</Button>

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
  Button,
  Divider,
  Chip
} from "primevue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import MultiSelect from 'primevue/multiselect';
import Editor from "primevue/editor";
import BlockCreateComponent from "./BlockCreateComponent.vue";
import type { FieldDto } from "@/api/modules/base.model";
import { selectedModelStore } from '../store/selected-model.store';
import { ref } from "vue";
import CheckboxMulti from "./CheckboxMulti.vue";
import appConf from "@/api/conf/app.conf";

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
    MultiSelect,
    FileUpload,
    Editor,
    Textarea,
    Checkbox,
    BlockCreateComponent, 
    CheckboxMulti,
    Toast,
    Button,
    Divider,
    Chip
  },
  props: ["fields", "modelOptions", "noRedirect"],
  data() {
    return {
      selectedValues: {},
      toast: useToast(),
      selectedModel: selectedModelStore()
    }
  },
  watch: {
    modelOptions: {
      handler(newOptions) {
        console.log('Model options updated:', newOptions);
        // При изменении опций переинициализируем значения мультиселектов
        this.initializeMultiSelectValues();
      },
      deep: true
    }
  },
  created() {
    this.initializeMultiSelectValues();
  },
  methods: {
    initializeMultiSelectValues() {
      this.fields.forEach(field => {
        if (field.type === 'model-multi-selector') {
          // Преобразуем значения в правильный формат
          const values = Array.isArray(field.value) ? field.value : 
                        field.value ? [field.value] : [];
          
          console.log('Initializing multiselect field:', field.item);
          console.log('Initial values:', values);
          
          // Получаем опции для этого поля
          const options = this.getSelectorOptions(field);
          console.log('Available options:', options);
          
          if (options && options.length > 0) {
            // Находим соответствующие опции для значений
            const selectedOptions = options.filter(opt => 
              values.includes(opt.value)
            );
            
            console.log('Selected options:', selectedOptions);
            
            // Сохраняем значения
            this.selectedValues[field.item] = selectedOptions.map(opt => opt.value);
            field.value = this.selectedValues[field.item];
            
            console.log('Initialized values:', this.selectedValues[field.item]);
          }
        }
      });
    },
    change(field) {
      field.value = field.dateValue.getTime()
    },
    async save() {
      try {
        const saveRes = await this.selectedModel.save();
        if (saveRes.success) {
          this.toast.add({
            severity: "success",
            summary: "Успех",
            detail: "Успешно сохранено",
            life: 3000,
          });

          if (!this.noRedirect) {
            window.location.href = "/filspb-admin/dashboard/" + this.selectedModel.modelName;
          }
        } else {
          this.toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Пожалуйста, проверьте поля формы.",
            life: 3000,
          });
        }
      } catch (error) {
        console.error('Error saving:', error);
        this.toast.add({
          severity: "error",
          summary: "Ошибка",
          detail: "Произошла ошибка при сохранении.",
          life: 3000,
        });
      }
    },
    getSelectorOptions(field: FieldDto) {
      const options = this.modelOptions[field.item];
      console.log('Model options for', field.item, ':', options);
      if (!options) return [];
      
      // Убедимся, что используем правильные поля для опций
      return options.map(opt => ({
        value: opt.value,
        name: opt.name
      }));
    },
    
    getSelectedOptions(field, selectedValues) {
      const options = this.getSelectorOptions(field);
      if (!selectedValues || !Array.isArray(selectedValues)) return [];
      
      return options.filter(opt => selectedValues.includes(opt.value));
    },
    
    handleMultiSelectorChange(value, field) {
      console.log('MultiSelect change for', field.item, ':', value);
      
      // Обновляем локальное состояние
      this.selectedValues[field.item] = value;
      
      // Обновляем значение поля
      field.value = value;
      
      console.log('Updated field value:', field.value);
      console.log('Selected values state:', this.selectedValues);
    },

    getImageSource(value: string) {
      if (value[0] != "/")
        return value
      else
        return `${appConf.proto}://${appConf.endpoint}/files${value}`
    },

    getLoadedFilePreview(field: FieldDto) {
      if (!field.value) return null
      if (field.value[0] == "/") return field.value
      if (field.docName) return field.docName
      else field.value
    },
    
    async downloadFile(fileName: string) {
      const response = await fetch(`${appConf.proto}://${appConf.endpoint}/files${fileName}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob); 
      link.download = fileName.split('/')[fileName.split('/').length - 1]
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    },
    checkboxUpdated(e, field) {

      field.value = e.map(el => {
        return typeof el == 'string' ? parseInt(el) : el
      })
    },
    imageSrc(field) {
      if (!field.value) return null

      field.value
    },
    async onFileSelect(event, field: FieldDto) {
      const file = event.files[0];
      field.value = (await convertToBase64(file))
      if (field.type == 'file') {
        field.docName = file.name
        field.value = field.value.split("base64,")[1] 
      }
    },
    handleSelectorChange(event, field) {
      field.value = event.value;
    },
  },
};
</script>

<style scoped>
.form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    background-color: #fff;
    border-radius: 8px;
    width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    width: 100%;
    align-items: start;
}
.input-group :deep(.p-dropdown),
.input-group :deep(.p-select),
.input-group :deep(.p-multiselect) {
    width: 100%;
    min-height: 40px;
}
.input-group :deep(.p-inputtext) {
    min-height: 40px;
}
.img-preview {
    max-width: 300px;
}
.checkbox-wrapper {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}
.save-btn {
    margin-top: 1rem;
}
.multiselect-chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: 100%;
  padding: 0.25rem;
}

.multiselect-chip {
  margin: 0.125rem;
  max-width: calc(100% - 1rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.p-multiselect) {
  width: 100%;
}

:deep(.p-multiselect-label) {
  white-space: normal !important;
  overflow: visible !important;
  min-height: 2.5rem;
}

:deep(.p-multiselect-token) {
  margin: 0.25rem !important;
}
</style>

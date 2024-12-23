<template>
    <div class="container">
      <div>
        <form @submit.prevent="onFormSubmit" class="form-container">
          <img class="logo" src="../../assets/logo_osnovnoy_black.png" />
          <div class="input-wrapper">
            <InputText
              v-model="form.username"
              type="text"
              class="input"
              placeholder="Логин"
              :class="{ 'p-invalid': errors.username }"
            />
            <Message
              v-if="errors.username"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ errors.username }}
            </Message>
          </div>
  
          <div class="input-wrapper">
            <Password
              v-model="form.password"
              placeholder="Пароль"
              toggleMask
              class="input"
              :feedback="false"
              :class="{ 'p-invalid': errors.password }"
            />
            <Message
              v-if="errors.password"
              severity="error"
              size="small"
              variant="simple"
            >
              {{ errors.password }}
            </Message>
          </div>
  
          <Button
            class="button"
            type="submit"
            label="Войти"
          />
        </form>
      </div>
      <Toast />
    </div>
  </template>
  
  <script>
  import { reactive, onMounted } from "vue";
  import InputText from "primevue/inputtext";
  import Password from "primevue/password";
  import Button from "primevue/button";
  import Message from "primevue/message";
  import Toast from "primevue/toast";
  import { useToast } from "primevue/usetoast";
  
  export default {
    components: {
      InputText,
      Password,
      Button,
      Message,
      Toast,
    },
    data() {
      return {
        form: {
          username: "",
          password: "",
        },
        errors: {
          username: null,
          password: null,
        },
      };
    },
    methods: {
      validateForm() {
        this.errors.username = this.form.username.trim() ? null : "Логин обязателен.";
        this.errors.password = this.form.password.trim() ? null : "Пароль обязателен.";
        return !this.errors.username && !this.errors.password;
      },
      onFormSubmit() {
        if (this.validateForm()) {
          this.toast.add({
            severity: "success",
            summary: "Форма отправлена",
            detail: "Вход выполнен успешно!",
            life: 3000,
          });
          console.log("Данные формы:", this.form);
        } else {
          this.toast.add({
            severity: "error",
            summary: "Ошибка валидации",
            detail: "Пожалуйста, проверьте поля формы.",
            life: 3000,
          });
        }
      },
    },
    mounted() {
      this.toast = useToast();
    },
  };
  </script>
  
  <style>
  .logo {
      width: 200px;
  }
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input-wrapper {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  .p-invalid {
    border-color: #e74c3c;
  }
  .form-container {
    background-color: white;
    border: 1px solid rgb(239, 239, 239);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 20rem;
  }
  .button {
    width: 100%;
  }
  </style>
  
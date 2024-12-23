<template>
    <div class="sidebar-wrapper">
      <PanelMenu :model="items" class="w-full md:w-80">
        <template #item="{ item }">
          <!-- Если это не разделитель, отображаем обычный элемент меню -->
          <a v-if="!item.divider" v-ripple class="flex items-center px-4 py-2 cursor-pointer group">
            <!-- Иконка -->
            <span :class="[item.icon, 'sidebar-icon text-primary group-hover:text-inherit']" />
            <!-- Название -->
            <span :class="['ml-2', { 'font-semibold': item.items }]">{{ item.label }}</span>
            <!-- Бейдж -->
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <!-- Сокращение -->
            <span v-if="item.shortcut" class="ml-auto  bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
          </a>
        </template>
      </PanelMenu>
  
      <!-- Разделитель перед "Настройки" -->
      <div class="divider"></div>
  
      <!-- Постоянные элементы "Настройки" и "Администраторы" -->
      <div class="constant-items">
        <a class="flex items-center px-4 py-2 cursor-pointer group">
          <span class="pi pi-cog sidebar-icon text-primary group-hover:text-inherit"></span>
          <span class="ml-2 font-semibold">Настройки</span>
        </a>
        <a class="flex items-center px-4 py-2 cursor-pointer group">
          <span class="pi pi-users sidebar-icon text-primary group-hover:text-inherit"></span>
          <span class="ml-2 font-semibold">Администраторы</span>
        </a>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import PanelMenu from "primevue/panelmenu";
  import Badge from "primevue/badge";
  
  export default {
    name: 'SidebarComponent',
    components: {
      PanelMenu,
      Badge
    },
    data() {
      return {
        items: [
          {
            label: "Афиша",
            icon: "pi pi-calendar",
            items: [
              { label: "Мероприятия", icon: "pi pi-calendar-plus" },
              { label: "Залы", icon: "pi pi-building" },
              { label: "Отзывы", icon: "pi pi-comments" },
              { label: "Площадки", icon: "pi pi-map-marker" },
              { label: "События", icon: "pi pi-clock" },
              { label: "Теги", icon: "pi pi-tag" }
            ]
          },
          {
            label: "Вакансии",
            icon: "pi pi-briefcase"
          },
          {
            label: "Детские программы",
            icon: "pi pi-face-smile"
          },
          {
            label: "Документы",
            icon: "pi pi-file"
          },
          {
            label: "Люди",
            icon: "pi pi-users",
            items: [
              { label: "Категории", icon: "pi pi-sitemap" },
              { label: "Список людей", icon: "pi pi-id-card" }
            ]
          },
          {
            label: "Контакты",
            icon: "pi pi-phone",
            items: [
              { label: "Контакты людей", icon: "pi pi-user-plus" },
              { label: "Контакты отделов", icon: "pi pi-building" }
            ]
          },
          {
            label: "Новости",
            icon: "pi pi-bell"
          },
          {
            label: "Партнеры",
            icon: "pi pi-images"
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .sidebar-wrapper {
    width: 20rem;
    padding: 1rem;
    height: 100%;
    font-family: "Open Sans", serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
  }
  
  .sidebar-icon {
    font-size: 1.2rem; /* Размер иконки */
    width: 1.5rem; /* Ширина иконки */
    height: 1.5rem; /* Высота иконки */
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.3rem;
  }
  
  a {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.2s ease;
    border-radius: 10px;
    cursor: pointer;
  }
  
  a:hover {
    background-color: #f9f3e6; /* Цвет фона при наведении */
  }
  
  a .font-semibold {
    font-weight: 600; /* Выделение текста с подменю */
  }
  
  .badge {
    margin-left: auto;
  }
  
  .text-primary {
    color: #b06700; /* Цвет текста для иконок */
  }
  
  .group-hover\:text-inherit:hover {
    color: inherit; /* Цвет текста на hover */
  }
  
  .ml-2 {
    margin-left: 0.5rem; /* Отступ между иконкой и текстом */
  }
  
  .ml-auto {
    margin-left: auto; /* Автоматическое добавление отступа */
  }
  
  .border-surface {
    border-color: #e0e0e0;
  }
  
  .bg-emphasis {
    background-color: #ffeb3b; /* Фоновый цвет для "сокращений" */
  }
  
  .text-muted-color {
    color: #9e9e9e; /* Цвет текста для сокращений */
  }
  
  .text-xs {
    font-size: 0.75rem; /* Размер текста для сокращений */
  }
  
  .p-1 {
    padding: 0.25rem; /* Паддинг для сокращений */
  }
  
  /* Стиль для разделителя */
  .divider {
    border-top: 1px solid #e0e0e0;
    margin: 1rem 0;
  }
  
  /* Стиль для постоянных пунктов "Настройки" и "Администраторы" */
  .constant-items a {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    color: #333;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s ease;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .constant-items a:hover {
    background-color: #f9f3e6; /* Цвет фона при наведении для постоянных элементов */
  }
  
  @media (max-width: 768px) {
    .sidebar-wrapper {
      width: 100%;
    }
  }
  </style>
  
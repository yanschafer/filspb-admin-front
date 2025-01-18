<template>
  <div class="sidebar-wrapper">
    <PanelMenu :model="items" class="w-full md:w-80">
      <template #item="{ item }">
        <a
          v-if="!item.divider"
          v-ripple
          class="flex items-center px-4 py-2 cursor-pointer group"
          :class="{
            active: isActive(item.click),
            'parent-active': isParentActive(item.click),
          }"
          @click="goTo(item.click)"
        >
          <span
            :class="[
              item.icon,
              'sidebar-icon text-primary group-hover:text-inherit',
            ]"
          />
          <span :class="['ml-2', { 'font-semibold': item.items }]">{{
            item.label
          }}</span>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          <span
            v-if="item.shortcut"
            class="ml-auto bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
        </a>
      </template>
    </PanelMenu>
    <div class="divider"></div>

    <div class="constant-items">
      <a
        class="flex items-center px-4 py-2 cursor-pointer group"
        :class="{ active: isActive('settings') }"
        @click="goTo('settings')"
      >
        <span
          class="pi pi-cog sidebar-icon text-primary group-hover:text-inherit"
        ></span>
        <span class="ml-2 font-semibold">Настройки</span>
      </a>
      <a
        class="flex items-center px-4 py-2 cursor-pointer group"
        :class="{ active: isActive('admins') }"
        @click="goTo('admins')"
      >
        <span
          class="pi pi-users sidebar-icon text-primary group-hover:text-inherit"
        ></span>
        <span class="ml-2 font-semibold">Администраторы</span>
      </a>
    </div>
  </div>
</template>

<script>
import PanelMenu from "primevue/panelmenu";
import Badge from "primevue/badge";
import { selectedModelStore } from "../store/selected-model.store";

export default {
  name: "SidebarComponent",
  components: {
    PanelMenu,
    Badge,
  },
  methods: {
    async goTo(name) {
      if (!name) return;
      const selectedModel = selectedModelStore();

      if (name === "settings") {
        this.$router.push({ path: "/dashboard" });
      } else {
        this.$router.push({ path: `/dashboard/${name}` }).finally(() => selectedModel.swap())
      }
    },
    isActive(route) {
      const currentPath = this.$route.path;
      if (route === "settings" && currentPath === "/dashboard") {
        return true;
      }
      return route && currentPath === `/dashboard/${route}`;
    },
    isParentActive(route) {
      const currentPath = this.$route.path;
      if (route === "settings" && currentPath === "/dashboard") {
        return true;
      }
      return route && currentPath.startsWith(`/dashboard/${route}`);
    },
  },
  data() {
    return {
      items: [
        {
          label: "Афиша",
          icon: "pi pi-calendar",
          click: "",
          items: [
            {
              label: "Мероприятия",
              icon: "pi pi-calendar-plus",
              click: "affiche",
            },
            { label: "Залы", icon: "pi pi-building", click: "halls" },
            { label: "Отзывы", icon: "pi pi-comments", click: "review" },
            { label: "Площадки", icon: "pi pi-map-marker", click: "platform" },
            { label: "События", icon: "pi pi-clock", click: "events" },
            { label: "Теги", icon: "pi pi-tag", click: "tags" },
          ],
        },
        {
          label: "Вакансии",
          icon: "pi pi-briefcase",
          click: "vacancy",
        },
        {
          label: "Слайдер",
          icon: "pi pi-briefcase",
          click: "slider",
        },
        {
          label: "Детские программы",
          icon: "pi pi-face-smile",
          click: "children",
        },
        {
          label: "Документы",
          icon: "pi pi-file",
          click: "docs",
        },
        {
          label: "Люди",
          icon: "pi pi-users",
          click: "",
          items: [
            {
              label: "Категории",
              icon: "pi pi-sitemap",
              click: "employee-categories",
            },
            { label: "Список людей", icon: "pi pi-id-card", click: "employee" },
          ],
        },
        {
          label: "Контакты",
          icon: "pi pi-phone",
          click: "",
          items: [
            {
              label: "Контакты людей",
              icon: "pi pi-user-plus",
              click: "employee-contacts",
            },
            {
              label: "Контакты отделов",
              icon: "pi pi-building",
              click: "dep-contacts",
            },
          ],
        },
        {
          label: "Новости",
          icon: "pi pi-bell",
          click: "news",
        },
        {
          label: "Партнеры",
          icon: "pi pi-images",
          click: "partners",
        },
      ],
    };
  },
};
</script>

<style scoped>
.sidebar-wrapper {
  width: 280px;
  height: calc(100vh - 60px);
  background: white;
  border-right: 1px solid #e5e7eb;
  padding: 1rem;
  font-family: "Open Sans", serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

.active {
  background-color: #f9f3e6;
  font-weight: bold;
  color: #b06700;
}

.sidebar-icon {
  font-size: 1.2rem;
  width: 1.5rem;
  height: 1.5rem;
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
  background-color: #f9f3e6;
}

a .font-semibold {
  font-weight: 600;
}

.badge {
  margin-left: auto;
}

.text-primary {
  color: #b06700;
}

.group-hover\:text-inherit:hover {
  color: inherit;
}

.ml-2 {
  margin-left: 0.5rem;
}

.ml-auto {
  margin-left: auto;
}

.border-surface {
  border-color: #e0e0e0;
}

.bg-emphasis {
  background-color: #ffeb3b;
}

.text-muted-color {
  color: #9e9e9e;
}

.text-xs {
  font-size: 0.75rem;
}

.p-1 {
  padding: 0.25rem;
}

.divider {
  border-top: 1px solid #e0e0e0;
  margin: 1rem 0;
}

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
  background-color: #f9f3e6;
}

@media (max-width: 768px) {
  .sidebar-wrapper {
    width: 100%;
    height: 100%;
    border: none;
  }
}
</style>

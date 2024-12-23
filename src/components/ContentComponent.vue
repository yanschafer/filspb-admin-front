<template>
    <div class="card">
      <Tabs :value="activeTab">
        <TabList class="tabs-wrapper">
          <Tab v-for="tab in items" :key="tab.label" :value="tab.route">
            <router-link v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
              <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2 text-inherit">
                <i :class="tab.icon" />
                <span>{{ tab.label }}</span>
              </a>
            </router-link>
          </Tab>
        </TabList>
      </Tabs>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContentComponent",
    data() {
      return {
        activeTab: "/list", 
        items: [
          { route: "/list", label: "Список", icon: "pi pi-list" },
          { route: "/create", label: "Создать запись", icon: "pi pi-plus" }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .tabs-wrapper {
    display: flex;
    flex-direction: row;
  }
  .card {
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  a {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 8px 16px;
    color: #333;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s ease;
    border-radius: 10px;
    cursor: pointer;
  }
  
  a:hover {
    background-color: #f9f3e6;
  }
  
  i {
    font-size: 1.2rem;
    margin-right: 8px;
  }
  </style>
  
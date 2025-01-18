<template>
    <div class="header-wrapper">
        <div class="header-left">
            <div class="mobile-toggle" @click="$emit('toggle-sidebar')">
                <i class="pi pi-bars"></i>
            </div>
            <div class="image-wrapper">
                <img class="logo" src="../assets/logo_osnovnoy_black.png" />
            </div>
        </div>
        <div class="links-group">
            <div class="link-single" @click="goToWebsite">
                Перейти на сайт
            </div>
            <div class="link-single" @click="logout">
                Выйти
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import TokenUtil from '@/utils/token.util';

const router = useRouter();

defineEmits(['toggle-sidebar']);

const goToWebsite = () => {
    window.open('https://volkcom.ru/filspb', '_blank');
};

const logout = () => {
    TokenUtil.clearTokens();
    router.push('/login');
};
</script>

<style scoped>
.header-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 4rem;
    align-items: center;
    justify-content: space-between;
    padding-left: 2rem;
    padding-right: 2rem;
    border-bottom: 1px solid rgb(221, 221, 221);
    background: white;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.links-group {
    width: fit-content;
    display: flex;
    gap: 1rem;
}

.logo {
    width: 100%;
    max-width: 100px;
}

.link-single {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: #b06700;
    font-weight: 500;
}

.link-single:hover {
    color: #7d4900;
}

.mobile-toggle {
    display: none;
    cursor: pointer;
    font-size: 1.25rem;
    color: #b06700;
}

@media (max-width: 768px) {
    .mobile-toggle {
        display: block;
    }
    
    .header-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
</style>

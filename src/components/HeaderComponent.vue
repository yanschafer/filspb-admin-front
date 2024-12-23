<template>
    <div class="header-wrapper">
        <div class="image-wrapper">
            <img class="logo" src="../assets/logo_osnovnoy_black.png" />
        </div>
        <div class="links-group">
            <div class="link-single">
                Перейти на сайт
            </div>
            <div class="link-single">
                Выйти
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
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
</style>

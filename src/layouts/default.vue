<script setup lang="ts">
import Navbar from "~/components/NavigationBar.vue";
import Footer from "~/components/Footer.vue";
</script>

<template>
    <Navbar />
    <slot />
    <Footer />
</template>

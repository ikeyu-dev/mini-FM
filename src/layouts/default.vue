<script setup lang="ts">
import Navbar from "~/components/navbar.vue";
import Footer from "~/components/Footer.vue";
</script>

<template>
    <Navbar />
    <slot />
    <Footer />
</template>

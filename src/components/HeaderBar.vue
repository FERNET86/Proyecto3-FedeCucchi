<template>
    <ul>
    <li><router-link to="/">Home</router-link></li>
    <li><router-link :to="{name: 'quienes-somos'}">Quienes somos</router-link></li>
    <li><router-link :to="{name: 'post-id', params: {id: 1} }">Post numero 1</router-link></li>
    </ul>
</template>

<script>
export default {
    name: "HeaderBar",
};
</script>

<style scoped>
a {
}
</style>
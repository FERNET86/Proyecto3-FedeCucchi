<template>
  <div class="cart">
    <ul>
      <li v-for="(item, index) in cartItems" :key="index">
        {{ item.name }} - ${{ item.price }}
        <button @click="removeFromCart(index)" class="remove-button">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  props: ['cartItems'],
  methods: {
    removeFromCart(index) {
      this.$emit('remove-from-cart', index);
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.remove-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 4px;
}

.remove-button:hover {
  background-color: #d32f2f;
}

</style>

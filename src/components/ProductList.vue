<template>
    <div class="product-list">
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - ${{ product.price }}
          <button @click="addToCart(product)" class="add-to-cart-button">Agregar al carrito</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductList',
    props: ['products'],
    methods: {
      addToCart(product) {
        this.$emit('add-to-cart', product);
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
  
  .add-to-cart-button {
    background-color: #4CAF50;
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
  
  .add-to-cart-button:hover {
    background-color: #45a049;
  }
  
  </style>
  
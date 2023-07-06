<template>
  <div class="app">
    <HeaderBar />
    <router-view></router-view>
    <div class="container">
    <div class="d-flex justify-content-end">
    <button class="btn btn-primary mr-2" @click="openLoginModal">Inicio Sesion</button>
    <button class="btn btn-primary" @click="openRegistroModal">Registro</button>
  </div>
  </div>
    <div id="loginModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeLoginModal">&times;</span>
        <Login></Login>
      </div>
    </div>
    <div id="registroModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeRegistroModal">&times;</span>
        <Register></Register>
      </div>
    </div>
    <h2>Productos disponibles</h2>
    <div class="product-list row">
      <div class="col-md-4" v-for="product in products" :key="product.id">
        <div class="card">
          <img :src="product.image" class="card-img-top" alt="Product Image">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-price">$ {{ product.price }}</p>
            <button @click="addToCart(product)" class="btn btn-primary">Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
    <h2>Carrito de compras</h2>
    <cart :cart-items="cartItems" @remove-from-cart="removeFromCart" />

    <p v-if="hasItemsInCart()" class="cart-summary">Total: $ {{ totalPrice }} ({{ cartItems.length }} unidades)</p>

    <button @click="showConfirmation = true" v-if="!showConfirmation" class="btn btn-success confirm-button" :disabled="!hasItemsInCart()">Confirmar compra</button>

    <div v-if="showConfirmation" class="confirmation-form">
      <h3>Confirmar compra</h3>
      <form @submit.prevent="confirmPurchase">
        <div class="form-group">
          <label for="customerName">Nombre y apellido:</label>
          <input type="text" class="form-control" id="customerName" v-model="customerName" required>
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input type="email" class="form-control" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="creditCardNumber">Número de tarjeta de crédito:</label>
          <input type="text" class="form-control" id="creditCardNumber" v-model="creditCardNumber" required>
        </div>
        <div class="form-group">
          <label for="securityCode">Código de seguridad:</label>
          <input type="text" class="form-control" id="securityCode" v-model="securityCode" required>
        </div>
        <div class="form-group">
          <label for="expirationDate">Vencimiento (MM/YY):</label>
          <input type="text" class="form-control" id="expirationDate" v-model="expirationDate" required>
        </div>
        <button type="submit" class="btn btn-primary">Confirmar</button>
      </form>
      <p v-if="errorMessages.length > 0" class="error-message">
        {{ errorMessages.join(', ') }}
      </p>
    </div>
  </div>
</template>

<script>

import Swal from 'sweetalert2';
import HeaderBar from './components/HeaderBar.vue';
import Cart from './components/Cart.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    HeaderBar,
    Cart,
    Register,
    Login,
  },
  
  data() {
    return {
      products: [
        { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 10, image: 'product1.jpg' },
        { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 20, image: 'product2.jpg' },
        { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 30, image: 'product3.jpg' },
        { id: 4, name: 'Producto 4', description: 'Descripción del producto 4', price: 40, image: 'product4.jpg' },
        { id: 5, name: 'Producto 5', description: 'Descripción del producto 5', price: 50, image: 'product5.jpg' },
        { id: 6, name: 'Producto 6', description: 'Descripción del producto 6', price: 60, image: 'product6.jpg' },
      ],
      cartItems: [],
      showConfirmation: false,
      customerName: '',
      email: '',
      creditCardNumber: '',
      securityCode: '',
      expirationDate: '',
      errorMessages: []
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price, 0);
    },
  },
  methods: {
    openLoginModal() {
      const modal = document.getElementById('loginModal');
      modal.style.display = 'block';
    },
    closeLoginModal() {
      const modal = document.getElementById('loginModal');
      modal.style.display = 'none';
    },
    openRegistroModal() {
      const modal = document.getElementById('registroModal');
      modal.style.display = 'block';
    },
    closeRegistroModal() {
      const modal = document.getElementById('registroModal');
      modal.style.display = 'none';
    },
    addToCart(product) {
      this.cartItems.push(product);
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
    },
    confirmPurchase() {
  const creditCardRegex = /^\d{16}$/; // Expresión regular para validar 16 dígitos
  const securityCodeRegex = /^\d{3,4}$/; // Expresión regular para validar 3 o 4 dígitos
  const nameRegex = /^[a-zA-Z\s]+$/; // Expresión regular para validar solo letras y espacios
  const expirationDateRegex = /^(0[1-9]|1[0-2])\/(2[3-9]|3[0-9])$/; // Expresión regular para validar formato MM/YY

  if (!this.customerName || !nameRegex.test(this.customerName)) {
    Swal.fire('Error', 'El campo Nombre y apellido es inválido', 'error');
    return;
  }

  if (!this.email || !/\S+@\S+\.\S+/.test(this.email)) {
    Swal.fire('Error', 'El campo Correo electrónico es inválido', 'error');
    return;
  }

  if (!this.creditCardNumber || !creditCardRegex.test(this.creditCardNumber)) {
    Swal.fire('Error', 'El campo Número de tarjeta de crédito es inválido', 'error');
    return;
  }

  if (!this.securityCode || !securityCodeRegex.test(this.securityCode)) {
    Swal.fire('Error', 'El campo Código de seguridad es inválido', 'error');
    return;
  }

  if (!this.expirationDate || !expirationDateRegex.test(this.expirationDate)) {
    Swal.fire('Error', 'El campo Vencimiento es inválido', 'error');
    return;
  }

      if (this.errorMessages.length === 0) {
        const currentDate = new Date();
        const expirationMonth = parseInt(this.expirationDate.substring(0, 2), 10);
        const expirationYear = 2000 + parseInt(this.expirationDate.substring(3, 5), 10);

        if (expirationYear > currentDate.getFullYear() || (expirationYear === currentDate.getFullYear() && expirationMonth >= currentDate.getMonth() + 1)) {
          const orderNumber = Math.floor(Math.random() * 1000000); // Generar número de orden aleatorio

          Swal.fire({
            title: '¡Compra confirmada!',
            html: `Gracias por tu compra. Te estaremos enviando la información de tu compra a: ${this.email}<br>Número de orden: ${orderNumber}`,
            icon: 'success'
          });

          this.clearFields();
        } else {
          this.errorMessages.push('La fecha de vencimiento debe ser posterior a la fecha actual');
        }
      }
    },
    clearFields() {
      this.customerName = '';
      this.email = '';
      this.creditCardNumber = '';
      this.securityCode = '';
      this.expirationDate = '';
      this.errorMessages = [];
      this.cartItems = [];
      this.showConfirmation = false;
    },
    hasItemsInCart() {
      return this.cartItems.length > 0;
    }
  }
};
</script>

<style scoped>

.app {
  background-image: url('https://www.futuremusic-es.com/wp-content/uploads/2016/03/HD_Vinyl_intro_750x400px.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  margin: 0 auto;
  padding: 20px;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.product-list {
  margin-top: 20px;
}

.card {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  background-color: #f9f9f9;
}

.card-img-top {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-text {
  margin-bottom: 10px;
}

.card-price {
  font-weight: bold;
  margin-bottom: 10px;
}

.cart-summary {
  font-weight: bold;
  margin-top: 20px;
}

.confirm-button {
  margin-top: 20px;
}

.confirmation-form {
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
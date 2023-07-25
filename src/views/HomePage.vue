<template>
    <div class="home">
      <h2 class="HomeTitulo">Tienda de vinilos</h2>
      <div class="product-list row">
        <div class="col-md-4" v-for="product in products" :key="product.id">
          <div class="card">
            <img :src="product.imagen" class="card-img-top" alt="Product Image">
            <div class="card-body">
              <h5 class="card-title">{{ product.titulo }}</h5>
              <p class="card-text">{{ product.descripcion }}</p>
              <p class="card-price">$ {{ product.precio }}</p>
              <button @click="addToCart(product)" class="btn btn-primary">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
      <h2>Carrito de compras</h2>
      <cart :cart-items="cartItems" @remove-from-cart="removeFromCart" />
  
      <p v-if="hasItemsInCart()" class="cart-summary">Total: $ {{ totalPrice }} ({{ cartItems.length }} unidades)</p>
  
      <button @click="abrirModal" class="btn btn-success confirm-button" :disabled="!hasItemsInCart()">Confirmar compra</button>
      <modal-confirmacion
        :mostrar-modal="mostrarModal"
        :pedido="pedido"
        @cerrar="cerrarModal"
        @confirmar="confirmarCompra"
      />
      <p v-if="userLoggedIsEmpty" class="user-alert">Es necesario estar logueado para poder finalizar la compra!</p>
    </div>
  </template>
  
  <script>
  
  import Cart from '../components/Cart.vue';
  import ModalConfirmacion from '../components/ModalConfirmacion.vue';
  
  
  export default {
    name: 'HomePage',
    components: {
      Cart,
      ModalConfirmacion,
    },
    
    data() {
      return {
        products: {},
        cartItems: [],
        customerName: '',
        email: '',
        creditCardNumber: '',
        securityCode: '',
        expirationDate: '',
        errorMessages: [],
        mostrarModal: false,
        pedido: {},
      };
    },
    computed: {
      totalPrice() {
        return this.cartItems.reduce((total, item) => total + item.precio, 0);
      },
      userLogged() {
        return this.$store.getters.userLogged;
      },
      userLoggedIsEmpty() {
        return this.$store.getters.userLoggedIsEmpty;
      },
    },
    methods: {
      addToCart(product) {
        this.cartItems.push(product);
      },
      removeFromCart(index) {
        this.cartItems.splice(index, 1);
      },
      clearFields() {
        this.customerName = '';
        this.email = '';
        this.creditCardNumber = '';
        this.securityCode = '';
        this.expirationDate = '';
        this.errorMessages = [];
        this.cartItems = [];
      },
      hasItemsInCart() {
        return this.cartItems.length > 0;
      },
      abrirModal() {
        if (this.userLoggedIsEmpty) {
          this.mostrarModal= false;
        } else {
          this.pedido = this.cartItems.reduce((obj, item) => {
            obj[item.nombre] = (obj[item.nombre] || 0) + 1;
            return obj;
          }, {});
          this.mostrarModal = true;
        }
      },
      cerrarModal() {
        this.mostrarModal = false;
      },
      confirmarCompra(datosCompra) {
      console.log('Datos de la compra:', datosCompra);
      const fechaHoraActual = new Date();
      const body = {
        nombre: datosCompra.nombre,
        email: datosCompra.email,
        pedido: datosCompra.pedido,
        fecha: fechaHoraActual.toLocaleString(),
        total: datosCompra.total,
      };
      fetch("https://64ac1f6f9edb4181202f21ff.mockapi.io/pedidos", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => {
          console.error("Error al confirmar compra: ", error);
        });
    },
    },
    mounted() {
      fetch('https://64a246f4b45881cc0ae4f33d.mockapi.io/api/v1/Carrito')
          .then(response => response.json())
          .then(products => {
            this.$store.commit('products', products);
            this.products = products;
          })
          .catch(error => {
            console.error('Error al traer productos:', error);
          });
    },
  };
  </script>
  
  <style scoped>
  
  .home {
    background-image: url('https://www.futuremusic-es.com/wp-content/uploads/2016/03/HD_Vinyl_intro_750x400px.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    margin: 0 auto;
  }
  
  .HomeTitulo{
    font-weight: bold;
    text-transform: uppercase;
    margin-block-end: 40px;
    margin-top: 20px;
    font-size: 2.5rem;
  }
  .product-list {
    margin-top: 20px;
  }
  
  .card {
    margin-bottom: 50px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 28px;
    background-color: #f9f9f9c6;
    text-align: center;
  }
  
  .card-img-top {
    width: 100%;
    max-height: 280px;
  }
  
  .card-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
    text-transform: uppercase;
    font-weight: bold;
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
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
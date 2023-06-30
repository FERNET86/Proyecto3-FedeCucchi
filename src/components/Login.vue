<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input type="email" class="form-control" id="email" v-model="email" v-validate="'required|email'" :class="{ 'is-invalid': errors.has('email') }">
          <span class="invalid-feedback" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" class="form-control" id="password" v-model="password" v-validate="'required'" :class="{ 'is-invalid': errors.has('password') }">
          <span class="invalid-feedback" v-if="errors.has('password')">{{ errors.first('password') }}</span>
        </div>
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      loginUser() {
        if (!this.errors.any()) {
          // Aquí puedes implementar la lógica de inicio de sesión utilizando Firebase Authentication o cualquier otro servicio
          console.log('Inicio de sesión exitoso');
        }
      }
    }
  };
  </script>
  
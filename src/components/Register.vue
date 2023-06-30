<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <h2>Registro de usuario</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="email">Correo electrónico:</label>
          <input type="email" class="form-control" id="email" v-model="email" v-validate="'required|email'" :class="{ 'is-invalid': errors.has('email') }">
          <span class="invalid-feedback" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input type="password" class="form-control" id="password" v-model="password" v-validate="'required|min:6'" :class="{ 'is-invalid': errors.has('password') }">
          <span class="invalid-feedback" v-if="errors.has('password')">{{ errors.first('password') }}</span>
        </div>
        <button type="submit" class="btn btn-primary">Registrarse</button>
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
      registerUser() {
        if (!this.errors.any()) {
          // Aquí puedes implementar la lógica de registro de usuario utilizando Firebase Authentication o cualquier otro servicio
          console.log('Registro exitoso');
        }
      }
    }
  };
  </script>
  
  
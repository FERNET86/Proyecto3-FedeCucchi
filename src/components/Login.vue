<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login" class="mb-3">
      <div class="mb-3">
        <label for="loginEmail" class="form-label">Email:</label>
        <input v-model="email" type="email" class="form-control" id="loginEmail" required>
      </div>
      <div class="mb-3">
        <label for="loginPassword" class="form-label">Contraseña:</label>
        <input v-model="password" type="password" class="form-control" id="loginPassword" required>
      </div>
      <button type="submit" class="btn btn-primary">Iniciar sesión</button>
    </form>
    <p v-if="loginExitoso" class="text-success">¡Inicio de sesión exitoso!</p>
    <p v-if="loginError" class="text-danger">{{ loginErrorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      loginExitoso: false,
      loginError: false,
      loginErrorMessage: '',
    };
  },
  methods: {
    login() {
      fetch('https://64a246f4b45881cc0ae4f33d.mockapi.io/api/v1/users')
        .then(response => response.json())
        .then(users => {
          const user = users.find(u => u.email === this.email && u.password === this.password);
          if (user) {
            this.loginExitoso = true;
            this.loginError = false;
            setTimeout(() => {
              this.loginExitoso = false;
            }, 3000);
            console.log('Inicio de sesión exitoso:', user);
            this.email = '';
            this.password = '';
          } else {
            this.loginExitoso = false;
            this.loginError = true;
            this.loginErrorMessage = 'Email o contraseña incorrectos. Inténtelo de nuevo.';
          }
        })
        .catch(error => {
          console.error('Error al iniciar sesión:', error);
          this.loginExitoso = false;
          this.loginError = true;
          this.loginErrorMessage = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 50px;
}
</style>

<template>
  <b-modal v-model="modalVisible" :title="modalTitle" @ok="confirmarCompra" @cancel="cerrarModal">
    <form>
      <b-form-group label="Nombre" label-for="nombre">
        <b-form-input v-model="nombre" id="nombre" required></b-form-input>
      </b-form-group>

      <b-form-group label="Email" label-for="email" :disabled="true">
        <b-form-input v-model="email" id="email" type="email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Número de tarjeta" label-for="tarjeta">
        <b-form-input v-model="tarjeta" id="tarjeta" required></b-form-input>
      </b-form-group>

      <b-form-group label="Total a pagar" label-for="total" :disabled="true">
        <b-form-input v-model="total" id="total" required></b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  props: {
    mostrarModal: {
      type: Boolean,
      required: true,
    },
    pedido: {
      type: Object,
      required: true,
    },
    modalTitle: {
      type: String,
      default: 'Confirmar compra',
    },
  },
  data() {
    return {
      modalVisible: false,
      nombre: '',
      email: '', // Asigna el valor del email del usuario logueado aquí
      tarjeta: '',
      total: '', // Asigna el valor del total de los productos seleccionados aquí
    };
  },
  watch: {
    mostrarModal: {
      immediate: true,
      handler(newValue) {
        this.modalVisible = newValue;
      },
    },
  },
  methods: {
    cerrarModal() {
      this.modalVisible = false;
      this.$emit('cerrar');
    },
    confirmarCompra() {
      // Verificar si todos los campos están cargados
      if (!this.nombre || !this.email || !this.tarjeta || !this.total) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Todos los campos son obligatorios',
        });
        return;
      }

      // Si todos los campos están cargados, emitir el evento 'confirmar' y mostrar SweetAlert de compra exitosa
      this.$emit('confirmar', {
        nombre: this.nombre,
        email: this.email,
        tarjeta: this.tarjeta,
        pedido: this.pedido,
        total: this.total,
      });

      Swal.fire({
        icon: 'success',
        title: 'Compra exitosa',
        text: '¡Gracias por tu compra!',
      });

      this.modalVisible = false;
    },
  },
};
</script>


<style scoped>
.b-modal-content {
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.b-modal-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #dcdcdc;
}

.b-modal-body {
  margin: 0;
}

.b-modal-footer {
  border-top: 1px solid #dcdcdc;
  justify-content: flex-end;
}

form {
  margin: 0;
}

.b-form-group {
  margin-bottom: 20px;
}

.b-form-group-label {
  color: #333;
  font-weight: bold;
}

.b-form-input {
  border-radius: 4px;
}

.b-modal-footer .btn {
  min-width: 100px;
  border-radius: 4px;
}
</style>
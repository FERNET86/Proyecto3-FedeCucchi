<template>
    <ProfileAdmin v-if="getIsAdmin" />
    <ProfileSingle v-else />
  </template>
  
  <script>
  import ProfileAdmin from '../components/ProfileAdmin.vue';
  import ProfileSingle from '../components/ProfileSingle.vue';
  export default {
    name: 'MyProfile',
    components: {
        ProfileAdmin,
        ProfileSingle,
    },
    computed: {
        getIsAdmin() {
            return this.$store.getters.userLogged.admin;
        },
    },
  };
  </script>
  
  <style scoped>
  .my-profile {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  h2 {
    margin-top: 0;
  }
  
  .profile-field {
    margin-bottom: 10px;
  }
  
  label {
    font-weight: bold;
  }
  
  span {
    margin-left: 5px;
  }
  
  /* Otros estilos según tus necesidades */
  </style>
  
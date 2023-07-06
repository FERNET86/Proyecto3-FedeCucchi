const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/users', async (req, res) => {
  try {
    const response = await axios.get('https://64a246f4b45881cc0ae4f33d.mockapi.io/api/v1/users');
    const users = response.data.map(user => ({
      id: user.id,
      name: user.name
    }));
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});

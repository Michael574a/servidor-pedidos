const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 1. Endpoint de Login (Simulado para la tarea)
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    // Aquí podrías validar contra DB, por ahora aceptamos cualquier usuario
    if (username && password) {
        res.json({ token: "token_generado_por_render_12345" });
    } else {
        res.status(401).json({ error: "Credenciales inválidas" });
    }
});

// 2. Endpoint de Pedidos
app.post('/orders', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: "No autorizado. Falta Token." });
    }

    console.log("Pedido recibido:", req.body);
    // Aquí el código para guardar en la base de datos de Render
    res.status(201).json({ mensaje: "Pedido guardado en el servidor con éxito" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
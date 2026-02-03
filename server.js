const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos de Render
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Render te da esta variable automáticamente
    ssl: { rejectUnauthorized: false }
});

// LOGIN REAL
app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            res.json({ token: "TOKEN_REAL_DE_SESION" });
        } else {
            res.status(401).json({ error: "Usuario o clave incorrecta" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GUARDAR PEDIDO REAL
app.post('/orders', async (req, res) => {
    const { nombre_cliente, telefono, direccion, detalle, tipo_pago, latitud, longitud, foto_path } = req.body;
    try {
        const query = 'INSERT INTO pedidos (nombre_cliente, telefono, direccion, detalle, tipo_pago, latitud, longitud, foto_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        await pool.query(query, [nombre_cliente, telefono, direccion, detalle, tipo_pago, latitud, longitud, foto_path]);
        res.status(201).json({ mensaje: "Pedido guardado en la nube" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(process.env.PORT || 3000);
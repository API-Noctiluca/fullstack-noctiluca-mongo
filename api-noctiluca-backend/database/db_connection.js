// database/db_connection.js - OPCIÓN 1
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

console.log('🔍 db_connection - Variables cargadas:', 
  Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('URI'))
);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ ERROR: MONGODB_URI no está definida en .env');
  console.log('Por favor, asegúrate de que tu .env tenga:');
  console.log('MONGODB_URI=mongodb+srv://usuario:contraseña@cluster...');
  process.exit(1);
}

console.log('✅ MONGODB_URI cargada correctamente');

async function db_connection() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connected successfully!");
        console.log(`📊 Database: ${mongoose.connection.name}`);
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        throw err;
    }
}

export default db_connection;
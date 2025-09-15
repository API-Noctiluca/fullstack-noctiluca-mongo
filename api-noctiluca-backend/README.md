<p align="center">
  <img src="./assets/cover.jpg" alt="cover" width="500px"/>
</p>
<p align="center">
  <a href="../README.md">⬅️ Volver al README principal</a>
</p>
<p align="center">
  <a href="../Noctiluca-client/README.md">⬅️ Volver al README frontend</a>
</p>
## 🐛 Presentación

Este repositorio corresponde a la backend.  
Aquí desarrollamos la **API REST con Node.js, Express y MongoDB**, que da soporte a la aplicación frontend.  

---

## 📂 Estructura del Proyecto

```
📦 fullstack-noctiluca-mongo
├── api-noctiluca-backend/   # Backend con Node.js, Express y MongoDB
│   ├── assets/              # Imágenes usadas en README (cover, postman, etc.)
│   ├── config/              # Configuración que carga variables de entorno, MONGO_URI
│   ├── controllers/         # Lógica de negocio con Mongoose
│   ├── database/            # Conexión a MongoDB
│   ├── middlewares/         # Validaciones y middlewares
│   ├── models/              # Modelos Mongoose
│   ├── routes/              # Endpoints de la API
│   ├── tests/               # Tests con Jest + Supertest
│   ├── .env                 # # Variables de entorno (desarrollo)
│   ├── .env.test            # Variables de entorno (test)
│   ├── app.js               # Configuración principal de Express
│   ├── server.js            # Arranque del servidor
│   └── package.json

```

## ⚙️ Configuración

```bash
git clone https://github.com/API-Noctiluca/fullstack-noctiluca-mongo.git
cd fullstack-noctiluca-mongo
```
2️⃣ Instalar dependencias en cada entorno

backend: 
```bash
cd api-noctiluca-backend
npm install
```

3️⃣ Configurar variables de entorno
📄 .env (desarrollo)
```
HOST=localhost
PORT=8000
MONGO_URI=mongodb+srv://<db_username>:<db_password>@<project_name>.cimmmgp.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=<project_name>;

```

📄 .env.test (testing)

```
HOST=localhost
PORT=4000
MONGO_URI=mongodb+srv://<db_username>:<db_password>@<project_name>.cimmmgp.mongodb.net/<db_name_test>?retryWrites=true&w=majority&appName=<project_name>;
```
4️⃣ Iniciar servidor
npm run dev

Servidor corriendo en:
```
👉 http://localhost:8000
```

---

## 🗄️ Base de Datos

La base de datos se gestiona con **MySQL + Mongo**.  
Incluye el modelo principal `ButterflyModel`.

<p align="center">
  <img src="./assets/table.jpg" alt="Modelo Butterfly" width="700px"/>
</p>

---

## 🧩 Resumen de Lógica

- **Configuración** → sin esto no hay proyecto funcional.  
- **DB** → los modelos y tests necesitan un lugar donde guardar/leer datos.  
- **Tests** → guían la implementación según TDD.  
- **Modelo** → define cómo interactúas con la DB.  
- **Validadores** → aseguran que los datos sean correctos antes de tocarlos.  
- **Controladores** → implementan la lógica de negocio usando modelos y validadores.  
- **Rutas** → exponen la API al exterior.  
- **App** → junta todo para ejecutar.  
- **Tests** → comprueban que todo funcione correctamente.  

---

## 🧪 Testing

Se usa **Jest + Supertest** para pruebas unitarias y de integración.

### Ejecutar tests
```bash
Ejemplo de test

test('GET /butterflies should return array', async () => {
  const response = await request(app).get("/api/butterflies");
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});
```
## 📬 Endpoints

### 🌐 Documentación Postman para testeo de los Endpoints

Consulta toda la documentación de la API haciendo clic en el logo:

<a href="https://documenter.getpostman.com/view/46421388/2sB3HnJKMj" target="_blank">
  <img src="https://voyager.postman.com/logo/postman-logo-orange-stacked.svg" alt="Postman" width="220"/>
</a>

---

✨ Créditos

Proyecto realizado por:

- Aday Alvarez | Scrum Master & Developer
- Nicole Guevara | Product Owner & Developer
- Mariany De Araujo |  Developer
- Guissella Perez |  Developer
- Julia Zarco  |  Developer

---

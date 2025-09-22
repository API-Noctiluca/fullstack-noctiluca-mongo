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

## 🔒 Validators  

En nuestro proyecto hemos implementado con **validadores y middlewares** que garantizan la seguridad y consistencia de los datos.  
👉 <a href="../api-noctiluca-backend/validators/butterfliesValidator.js">Conócelos aquí</a>


## 🧪 Testing

Usamos **Jest + Supertest** para asegurar la calidad mediante pruebas unitarias y de integración.

### Ejecutar tests

```
npm run test
```

Ejemplo de test:
```bash
describe("GET /butterflies", () => {
        let response
        beforeAll(async () => {
            await db_connection()
        })
        afterAll(async () => {
            await mongoose.connection.close()
        })
        afterEach(async () => {
            await ButterflyModel.deleteMany({})
        })
        beforeEach(async () => {
            response = await request(app).get("/api/butterflies").send()
        })
        test('should return a response with status 200 and type json', async () => {
            expect(response.status).toBe(200)
            expect(response.headers['content-type']).toContain('json')
        })
        test('should return array of butterflies', async () => {
            expect(response.body).toBeInstanceOf(Array)
        })
    });
```

### Explora más en nuestros tests completos:
<a href="../api-noctiluca-backend/test/butterflies.test.js">Ver archivo de pruebas</a>

<img src="../api-noctiluca-backend/assets/testsOk.PNG" alt="Postman" width="600"/>

## 📬 Endpoints

### 🌐 Documentación Postman para testeo de los Endpoints

Consulta toda la documentación de la API haciendo clic en el logo:

<a href="https://documenter.getpostman.com/view/46421388/2sB3HqJJas" target="_blank">
  <img src="https://voyager.postman.com/logo/postman-logo-orange-stacked.svg" alt="Postman" width="220"/>
</a>

---
## 🌐 Documentación Swagger
Una vez que la API esté en ejecución, copia y pega la URL: `http://localhost:8000/api-docs/#/`
---

✨ Créditos

Proyecto realizado por:

- Aday Alvarez | Scrum Master & Developer
- Nicole Guevara | Product Owner & Developer
- Mariany De Araujo |  Developer
- Guissella Perez |  Developer
- Julia Zarco  |  Developer

---

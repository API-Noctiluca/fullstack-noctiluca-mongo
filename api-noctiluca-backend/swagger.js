import swaggerJSDoc from "swagger-jsdoc";


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API con Node y Express",
      version: "1.0.0",
      description: "Documentación de API con Swagger",
    },
    components: {
      schemas: {
        Butterfly: {
          type: "object",
          required: ["name", "color"],
          properties: {
            id: {
              type: "string",
              description: "ID de la mariposa (Mongo ObjectId)",
            },
            name: {
              type: "string",
              description: "Nombre de la mariposa",
            },
            color: {
              type: "string",
              description: "Color de la mariposa",
            },
          },
          example: {
            id: "68c3fc3a3a52c2ecb1ccd64f",
            name: "Monarca",
            color: "Naranja y negro",
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Rutas donde swagger buscará los @swagger comments
};


const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec; 

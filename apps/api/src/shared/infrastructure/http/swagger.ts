import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'YumeFit API',
      version: '1.0.0',
      description:
        'API poderosa para o ecossistema YumeFit, focada em alta performance e escalabilidade.',
      contact: {
        name: 'YumeFit Team',
        email: 'devedsonalves@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    './src/modules/**/infrastructure/http/routes/*.ts',
    './src/shared/infrastructure/http/routes/*.ts',
  ],
}

export const swaggerSpec = swaggerJsdoc(options)

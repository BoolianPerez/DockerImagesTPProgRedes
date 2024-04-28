
/*import swaggerJSDoc from 'swagger-jsdoc';
const { generate } = require("swagger-typescript");

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    info: {
      title: 'Documentacion para API de tenistas y partidos',
      version: '1.0.0',
      description: 'Documentacion para API que maneja tenistas y partidos de manera RESTful',
    },
    basePath: '/api', 
    contents: {
      schemas: {
        Partido: {
          type: 'object',
          property: {
            PATH: { type: 'string', format:  'file path'},
            id: { type: 'number' },
            jugador1: { type: 'Tenista' },
            jugador2: { type: 'Tenista' },
            ganador: { type: 'Tenista' },
            sets: { type: 'array', items: { type: 'SetTenis' }}
          }
        },
        Tenista: {
          type: 'object',
          property: {
            PATH: { type: 'string', format: 'file path' },
            id: { type: 'number' },
            peso: { type: 'number' },
            altura: { type: 'number' },
            edad: { type: 'number' },
            perfilATP: { type: 'string', format: 'http link' },
            pais: { type: 'string', format: 'sustantivo propio'},
            titulos: { type: ['sets', 'null'], items: { type: 'SetTenis' }}
          }
        },
        Titulo: {
          type: 'string',
          enum: [ 'ATP', 'Challenger' ]
        },
        SetTenis: {
          type: 'object',
          properties: {
            code: { type: 'Titulo' },
            value: { type: 'number' }
          }
        }
      }
    }
  },
  apis: ['src/routes/routers/PartidoRouter.ts', 'src/routes/routers/TenistaRouter.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;*/
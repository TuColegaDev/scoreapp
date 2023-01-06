# SCOREAPP

> Backend para aplicación de gestión de resultados, métricas y organización de los equipos de futbol a cargo de cada entrenador. 
> El entrenador como usuario, se registra, registra a su equipo, sus jugadores y comienza a organizar sus tacticas y a anotar los resultados para evaluar a sus equipos y llegar a la cima.

## Uso

Clonar el proyecto, y crear un archivo .env con las siguientes variables
```
    PORT=<El puerto donde se va a inicializar la aplicacion (Opcional)>
    DATABASE_URL=<URL de la base de datos>
```
 y ejecutar instalación para desplegar la api en el puerto especificado o por defecto en el puerto 3000.

## Instalación

> Para ejecutar el proyecto en local será necesario tener docker daemon instalado y ejecutándose.

```shell
    # Instalar dependencias
    yarn

    # Ejecutar proyecto
    yarn dev

    # Ejecutar docker compose del proyecto
    yarn start:prod
```

## Stack tecnologico

> Aplication en express con typescript, [Prisma](https://www.prisma.io/) y [MongoDB](https://www.mongodb.com/)

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com)
- [Typescript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)

## Información de contacto

> [Alejandro Martinez](https://www.linkedin.com/in/tucolegadev/)
## Licencia

TuColegaDev - [MIT](https://opensource.org/licenses/MIT)

import app from './app'

const server = 
    app.listen(app.get("port"), async() => {
        console.log(
            `[✅] - App is running: http://localhost:${app.get('port')}`,
            `<${app.get("env")}>`
        );
  });
  
export default server
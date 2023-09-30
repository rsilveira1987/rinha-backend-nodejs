const app = require('./src/app');
const port = process.env.APP_PORT || 3000;

app.listen( port,() => {
    console.log(`NodeJS server running at ${port}`);
});
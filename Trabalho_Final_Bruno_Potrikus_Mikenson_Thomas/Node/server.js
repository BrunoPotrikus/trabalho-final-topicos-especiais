import express, { urlencoded } from 'express';
const app = express();
import router from './router';
import path from 'path';

app.set('view engine', 'ejs');
app.use(router);
app.use(urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../public')));
app.set('views', path.resolve(__dirname, 'src', 'views'));

app.listen(3000, () => {
    console.log('Conectado na porta 3000');
})
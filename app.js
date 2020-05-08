const express = require('express'); //подключение пакета express
const config = require('./config/config'); //подключение конфига из ./config/config.json
//const job_get_last_oper = require('./job_get_last_oper');

const app = express(); // Наш сервер app express

// позволяет преобразовывать запрос из клиента в JSON, но ввиде объекта
// чтобы запрос приходит в типе string, смотри файл http.hook.js в клиенте
app.use(express.json({extended: true}));

// регистрации роутов
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/get_last_oper', require('./routes/get_last_oper.routes'));
app.use('/api/dislocation', require('./routes/dislocation.routes'));
//job_get_last_oper();

const PORT = config.port || 5000; //передача порта из конфига в переменную PORT (|| означает, если порт не определился, то по умолчанию 5000)

async function start() {
    try{
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`)); //запуск сервера и вывод сообщения
    }catch (e) {
        console.log('Server error', e.message);
        process.exit(1); // выход из процесса node js
    }
}

start();


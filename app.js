const express = require('express'); //подключение пакета express
const config = require('./config/config'); //подключение конфига из ./config/config.json
const cors = require('cors')
//const job_get_last_oper = require('./job_get_last_oper');

const app = express(); // Наш сервер app express

// позволяет преобразовывать запрос из клиента в JSON, но ввиде объекта
// чтобы запрос приходит в типе string, смотри файл http.hook.js в клиенте
app.use(express.json({extended: true}));

// регистрации роутов
app.use(cors);
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/get_last_oper', require('./routes/get_last_oper.routes'));
app.use('/api/dislocation', require('./routes/dislocation.routes'));
app.use('/api/history_wagon', require('./routes/history_wagon.routes'));
app.use('/api/wagon_tracking', require('./routes/wagon_tracking_post.routes'));
app.use('/api/send_email', require('./routes/send_email.routes'));
app.use('/api/wagon_remove', require('./routes/rem_fr_trak.router'));
//job_get_last_oper();

const PORT = config.port || 5000; //передача порта из конфига в переменную PORT (|| означает, если порт не определился, то по умолчанию 5000)

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});


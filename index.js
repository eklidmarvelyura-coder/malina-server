const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

// ====== НАСТРОЙКИ ======
const TOKEN = '8102974446:AAHfcB1zH7cfsWPxml8QEnsHT0h8YL0KqrI''; // вставь токен своего бота
const CHANNEL_ID = '@personalthaigroup'; // твой канал

const app = express();
app.use(cors());
app.use(bodyParser.json());

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', msg => {
    console.log('📩 message:', msg.text);
});

// ====== РАБОТА С FEEDBACK/ORDERS ======
app.post('/feedback', (req, res) => {
    const { text, type } = req.body;

    if (!text) return res.sendStatus(400);

    if (type === 'order') {
        console.log('Получен заказ:', text);
        bot.sendMessage(CHANNEL_ID, text);
    } else {
        console.log('Получен отзыв:', text);
        bot.sendMessage(CHANNEL_ID, `💬 Новый отзыв:\n\n${text}`);
    }

    res.sendStatus(200);
});

// ====== ЗАПУСК СЕРВЕРА ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});

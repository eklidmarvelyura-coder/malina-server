
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8102974446:AAHfcB1zH7cfsWPxml8QEnsHT0h8YL0KqrI';
const CHANNEL_ID = '@personalthaigroup';

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(TOKEN);
bot.setWebHook(`https://malina-server.onrender.com/bot${TOKEN}`);

// Telegram присылает обновления сюда
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Обработка сообщений
bot.on('message', msg => {
    console.log('📩 message:', msg.text);
});

// Обратная связь и заказы
app.post('/feedback', (req, res) => {
    const { text, type } = req.body;
    if (!text) return res.sendStatus(400);

    if (type === 'order') {
        bot.sendMessage(CHANNEL_ID, text);
    } else {
        bot.sendMessage(CHANNEL_ID, `💬 Новый отзыв:\n\n${text}`);
    }

    res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

// ====== НАСТРОЙКИ ======
const TOKEN = '8102974446:AAHfcB1zH7cfsWPxml8QEnsHT0h8YL0KqrI'; // Вставь токен своего бота
const CHANNEL_ID = '@personalthaigroup'; // Твой канал

const app = express();
app.use(bodyParser.json());

// ====== Webhook бот ======
const bot = new TelegramBot(TOKEN);
bot.setWebHook(`https://malina-server.onrender.com/bot${TOKEN}`);

// ====== Получение обновлений от Telegram ======
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// ====== Обработка сообщений в канале (по желанию) ======
bot.on('message', msg => {
    console.log('📩 Сообщение от', msg.from.username, ':', msg.text);
});

// ====== Обратная связь и заказы ======
app.post('/feedback', (req, res) => {
    const { text, type } = req.body;

    if (!text) return res.sendStatus(400);

    if (type === 'order') {
        console.log('Получен заказ:', text);
        bot.sendMessage(CHANNEL_ID, text); // заказ без префикса
    } else {
        console.log('Получен отзыв:', text);
        bot.sendMessage(CHANNEL_ID, `💬 Новый отзыв:\n\n${text}`); // только отзывы получают префикс
    }

    res.sendStatus(200);
});

// ====== Запуск сервера ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});

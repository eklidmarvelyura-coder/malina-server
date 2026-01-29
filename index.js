const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN = '8102974446:AAHfcB1zH7cfsWPxml8QEnsHT0h8YL0KqrI';
//const ADMIN_ID = 343607859;
const CHANNEL_ID = '@personalthaigroup';


const bot = new TelegramBot(TOKEN, { polling: true });

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


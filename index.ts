import express from "express";

const app = express();
const port = 8000;

app.get('/messages', (req, res) => {
    res.send('Получен весь список сообщений');
});

app.post('/messages', (req, res) => {
    res.send('Создали новое сообщение');
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})


const express = require('express');
const app = express();
const port = 3000

const connect = require('./schemas')
connect();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static('public'));

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

const router = require('./routers/router');
app.use('/', [router]);

// Making API
const userRouter = require('./routers/user');
app.use('/api/user', [userRouter]);
const roomRouter = require('./routers/room');
app.use('/api/room', [roomRouter]);
const reviewRouter = require('./routers/review');
app.use('/api/review', [reviewRouter]);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})
const PORT = 4000;

const express = require("express");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config();

app.use(
    morgan('dev'),
    // express.static('/', path.join(__dirname, 'public')),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(process.env.COOKIE_SECRET),
);

app.use(cors());

// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     // secret: process.env.COOKIE_SECRET,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//     },
//     name: 'session-cookie',
// }));

const productRoutes = require('./app/routes/product.router');
app.use('/products', productRoutes);

// app.get('/', (req, res, next)=>{
//     console.log('GET / 요청에서만 실행됩니다.');
//     next();
// }, (req, res)=>{
//     throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
// });
  
// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).send(err.message);
// });

app.listen(PORT, () => {
console.log(`Example app listening on port ${PORT}`)
});
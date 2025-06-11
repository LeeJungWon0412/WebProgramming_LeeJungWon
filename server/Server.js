const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

const uploadPath = path.join(__dirname, 'public', 'image');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
const storage = multer.diskStorage({
  destination: function(req, file, cb) { cb(null, uploadPath); },
  filename: function(req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const url = process.env.DB_URL;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let mydb;

(async () => {
  try {
    await client.connect();
    mydb = client.db('myboard');
    console.log('DB 연결 완료');

    app.get('/enter', (req, res) => {
      res.render('enter.ejs', { imagepath: null });
    });

    app.post('/photo', upload.single('picture'), (req, res) => {
      const imagepath = req.file ? '/image/' + req.file.filename : null;
      res.render('enter.ejs', { imagepath });
    });

    app.post('/save', async (req, res) => {
      await mydb.collection('post').insertOne({
        title: req.body.title,
        content: req.body.content,
        date: req.body.someDate,
        imagepath: req.body.imagepath
      });
      res.redirect('/list');
    });

    app.get('/list', async (req, res) => {
      const docs = await mydb.collection('post').find().toArray();
      res.render('list.ejs', { data: docs });
    });

    app.get('/content/:id', async (req, res) => {
      const doc = await mydb.collection('post').findOne({ _id: new ObjectId(req.params.id) });
      res.render('content.ejs', { data: doc });
    });

    app.get('/', (req, res) => {
      res.redirect('/list');
    });

    app.get("/search", function(req, res){
      console.log(req.query);
      mydb
        .collection("post")
        .find({ title : req.query.value }).toArray()
        .then((result) => {
          console.log(result);
          res.render("sresult.ejs", { data : result, keyword : req.query.value });
        })
    })

    app.get('/edit/:id', async (req, res) => {
      try {
        const postId = req.params.id;
        const postToEdit = await mydb.collection('post').findOne({ _id: new ObjectId(postId) });

        if (!postToEdit) {
          return res.status(404).send('게시물을 찾을 수 없습니다.');
        }

        res.render('edit', { data: postToEdit });
      } catch (error) {
        console.error(error);
        res.status(500).send('서버 에러가 발생했습니다.');
      }
    });

    const PORT = 8080;
    app.listen(PORT, () => console.log(`서버 대기 중: http://localhost:${PORT}`));
  } catch (err) {
    console.error('DB 연결 에러:', err);
  }
})();
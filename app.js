const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
let todo = [];
let done = [];

app.engine('handlebars', handlebars());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.render('index', {
    todo: todo,
    done: done
  })
});

app.post("/", (req, res) => {
  // console.log('request: ', req.body);
  todo.push(req.body.todoItem);
  // console.log('todo: ', todo);
  // console.log('done: ', done);
  res.redirect('/');
})

app.post('/done', (req, res) => {
  // console.log('request: ', req.body);
  // console.log('req done: ', req.body.done);
  todo.forEach((item, i) => {
    // console.log('item: ', item);
    // console.log('todo: ', todo);
    // console.log('done: ', done);
    for (var j = 0; j < req.body.done.length; j++) {
      if (req.body.done[j] === item) {
        done.push(item);
        todo.splice(i, 1);
        // console.log(done);
      }
    }
  })
  res.redirect('/');
})


app.listen(3000, () => {
  console.log("Listening on 3000");
});

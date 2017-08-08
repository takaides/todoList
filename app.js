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

app.get('/', function(req, res) {
  res.render('index', {
    todo: todo,
    done: done
  })
});

app.post("/", function(req, res) {
  console.log('request: ', req.body);
  todo.push(req.body.todoItem);
  console.log('todo: ', todo);
  console.log('done: ', done);
  res.redirect('/');
})

app.post('/done', function(req, res) {
  console.log('request: ', req.body);
  console.log('req done: ', req.body.done);
  todo.forEach(function(item, i) {
    console.log('item: ', item);
    console.log('todo: ', todo);
    console.log('done: ', done);
    for (var j = 0; j < req.body.done.length; j++) {
      if (req.body.done[j] === item) {
        done.push(item);
        todo.splice(i, 1);
        console.log(done);
      }
    }
  })
  res.redirect('/');
})


app.listen(3000, () => {
  console.log("Listening on 3000");
});


// // When the form submits, push the todo content to the todos array, reload the page

//
// // When my todo complete buttons submit, compare the value of the input with my todos array, if they are the same, push that index to my completed array and then remove it from todos.
// app.post('/complete', function(request, response) {
//   console.log(request.body);
//   for (let i = 0; i < todos.length; i++) {
//     if (request.body.completed === todos[i]) {
//       completed.push(todos[i]);
//       todos.splice(i,1);
//       console.log(completed);
//     }
//   }
//   response.redirect('/');
// })

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up database connection
mongoose.connect('mongodb+srv://khissdhave:yosoyunnino44@cluster0.uyg0agl.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

// define student schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  studentId: String
});

// define student model
const Student = mongoose.model('Student', studentSchema);

// GET endpoint to retrieve student details by ID
app.get('/students/:id', (req, res) => {
  const id = req.params.id;

  Student.findById(id, (err, student) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(student);
    }
  });
});

// POST endpoint to register new student
app.post('/students', (req, res) => {
  const { name, email, age, studentId } = req.body;

  const student = new Student({
    name,
    email,
    age,
    studentId
  });

  student.save((err, savedStudent) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(savedStudent);
    }
  });
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

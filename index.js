const http = require("http");
const express = require("express");
const { time } = require("console");
const morgan = require("morgan")
const cors = require("cors")

const app = express();
app.use(cors())
// app.use(morgan('tiny'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json());

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];
//   const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
//   })

app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((note) => note.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.get("/info", (request, response) => {
    const size = persons.length;
    const now = new Date();
    const date = `${now.toGMTString()}`;
    response.send(
        "<div>Phonebook has info for " + size + " people</div> \n" + date
    );
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    personsNew = persons.filter((note) => note.id !== id);
    persons = personsNew;

    response.status(204).end();
});

app.post("/api/persons", (request, response) => {
    const id = Math.floor(Math.random() * 1000000);
    const person = request.body;
    //  console.log(request.body)
    const newPerson = {}
    newPerson.name = person.name
    newPerson.number = person.number
    newPerson.id = id;

    if (persons.find((p) => p.number == person.number)) {
        response.json({ error: "number already in list" });
    } else if (!person.name) {
        response.json({ error: "name must be present" });
    } else if (!person.number) {
        response.json({ error: "number must be present" });
    } else {
        persons.push(newPerson);
        response.json(persons);
    }
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();
const port = 3000;
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

// middleware logger for express
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  }),
);

let data = [];
let nextId = 1;

app.post("/coffees", (req, res) => {
  const { name, price } = req.body;
  const newCoffee = { id: nextId++, name, price };
  data.push(newCoffee);
  res.status(200).send(data);
});

app.get("/coffees", (req, res) => {
  res.status(200).send(data);
});

app.get("/coffees/:id", (req, res) => {
  const coffee = data.find((d) => d.id === parseInt(req.params.id));
  if (!coffee) {
    return res.status(404).send("Coffee Not Found");
  }
  res.status(200).send(coffee);
});

app.put("/coffees/:id", (req, res) => {
  const coffee = data.find((d) => d.id === parseInt(req.params.id));

  if (!coffee) {
    return res.status(400).send("Coffee Not Found");
  }

  const { name, price } = req.body;
  coffee.name = name;
  coffee.price = price;
  res.status(200).send(coffee);
});

app.delete("/coffees/:id", (req, res) => {
  const index = data.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Coffee Not Found");
  }

  data.splice(index, 1);
  return res.status(204).send("Deleted");
});

app.listen(port, () => {
  console.log(`server running over ${port}...`);
});

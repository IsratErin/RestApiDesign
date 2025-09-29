import express from "express";

const app = express();

const PORT = 3000;

//app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

interface Pastry {
  id: number;
  flavour: string;
  name: string;
}

const pastries: Pastry[] = [
  {
    id: 1,
    flavour: "chocolate",
    name: "chocolate brownie",
  },
  {
    id: 3,
    flavour: "vanilla",
    name: "vanilla brownie",
  },
  {
    id: 3,
    flavour: "strawberry",
    name: "strawberry cheesecake",
  },
];

app.get("/", (req, res) => {
  const bakerry = {
    pastries: "wee",
  };
  res.json(bakerry);
});

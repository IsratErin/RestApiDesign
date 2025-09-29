import express from "express";
import {z} from "zod";

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
  price: number;
}

let pastries: Pastry[] = [
  {
    id: 1,
    flavour: "chocolate",
    name: "chocolate brownie",
    price: 55,
  },
  {
    id: 2,
    flavour: "vanilla",
    name: "vanilla brownie",
    price: 50,
  },
  {
    id: 3,
    flavour: "strawberry",
    name: "strawberry cheesecake",
    price: 45,
  },
];


const pastrySchema = z.array(
    z.object({
      id: z.number(),
      flavour: z.string(),
      name: z.string(),
      price: z.number(),
    })
  )


app.get("/", (req, res) => {
  const validatedPastries = pastrySchema.safeParse(pastries);
  if(!validatedPastries){
    return res.status(404).json({
      error: "The data is not in right format",
      //details: validatedPastries.error,
    })
  }
  res.json({
    pastries: validatedPastries.data,
  });
});

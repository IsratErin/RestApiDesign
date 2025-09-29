
import express from "express";
import {z} from "zod";

const app = express();

const PORT = 3000;

app.use(express.json());

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

app.get("/pastries", (req, res) => {
  try {
    const validatedPastries = pastrySchema.safeParse(pastries);
  if(!validatedPastries.success){
    return res.status(400).json({
      error: "The data is not in right format",
      details: validatedPastries.error,
    })
  }
  res.json({
    pastries: validatedPastries.data,
  });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching data!",
    }); 
  }
});

const pastryInputSchema = z.object({
  flavour: z.string(),
  name: z.string(),
  price: z.number(),
});

app.post("/pastries",(req,res)=>{
  const validatedPastry = pastryInputSchema.safeParse(req.body);
  if(!validatedPastry.success){
    return res.status(400).json({
      error: "Invalid pastry data",
      details: validatedPastry.error,
    });
  }
  const newaddedPastry ={
    id: pastries.length + 1,
    flavour: validatedPastry.data.flavour,
    name: validatedPastry.data.name,
    price: validatedPastry.data.price,
  };
  pastries.push(newaddedPastry);
  res.json({
    message:"New pastry added successfully",
    pastry:  newaddedPastry,
  })
})

const pastryUpdateSchema = z.object({
  flavour: z.string().optional(),
  name: z.string().optional(),
  price: z.number().optional(),
});

app.put("/pastries/:id",(req,res)=>{
  const pastryId = parseInt(req.params.id);
  const pastry= pastries.find(b=>b.id === pastryId);
  if(!pastry){
    return res.status(404).json({
      message: "Pastry not found",
    })
  }
  const validatedUpdate = pastryUpdateSchema.safeParse(req.body);
  if(!validatedUpdate.success){
    return res.status(400).json({
      error: "Invalid update data",
      details: validatedUpdate.error,
    });
  }
  pastry.flavour= validatedUpdate.data.flavour || pastry.flavour;
  pastry.name= validatedUpdate.data.name || pastry.name;
  pastry.price= validatedUpdate.data.price || pastry.price;
  res.json({
    message: "Pastry details updated successfully!"
  });
})

app.delete("/pastries/:id",(req,res)=>{
  const pastryId =  parseInt(req.params.id);
  const pastryListNew = pastries.filter(b=>b.id !== pastryId);
  pastries =pastryListNew;
  res.json({
    message: `The pastry with id ${pastryId} is deleted successfully`,
  })
})

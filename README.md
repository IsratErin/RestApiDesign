# REST API Design 

# Swedish Pastries Bakery Management System 

## Description 

This project manages inventory for a bakery specializing in Swedish pastries. 
## Zod Schema Explanation

In this project, we use Zod to ensure the integrity and correctness of the data being Sent To and From our API.

### `pastrySchema`

```typescript
const pastrySchema = z.array(
    z.object({
      id: z.number(),
      flavour: z.string(),
      name: z.string(),
      price: z.number(),
    })
  )
```

This schema validates an array of `Pastries` that contains `Pastry` objects. Each `Pastry` object must have:
- `id`: A number representing the unique identifier of the pastry.
- `flavour`: A string representing the flavour of the pastry (e.g., "chocolate", "vanilla").
- `name`: A string representing the name of the pastry (e.g., "chocolate brownie", "vanilla brownie").
- `price`: A number representing the price of the pastry.

This schema is used to validate the data returned by the `/pastries` GET endpoint, ensuring that the list of pastries always conforms to the expected structure.

### `pastryInputSchema`

```typescript
const pastryInputSchema = z.object({
  flavour: z.string(),
  name: z.string(),
  price: z.number(),
});
```

This schema validates the input data when creating a new pastry via the `/pastries` POST endpoint. It ensures that the request body contains:
- `flavour`: A string.
- `name`: A string.
- `price`: A number.

### `pastryUpdateSchema`

```typescript
const pastryUpdateSchema = z.object({
  flavour: z.string().optional(),
  name: z.string().optional(),
  price: z.number().optional(),
});
```

This schema validates the input data when updating an existing pastry via the `/pastries/:id` PUT endpoint. It allows also for partial updates, meaning any of the fields (`flavour`, `name`, `price`) can be provided, and they are all optional.

## How to Run the Code

To run this project, follow these steps:

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/IsratErin/RestApiDesign.git
    cd RestApiDesign
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

    This will start the server using `nodemon`, which automatically restarts the server when file changes are detected. The API will be accessible at `http://localhost:3000`.

# RestApiDesign
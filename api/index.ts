import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (_, res) => res.end("Working...."));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

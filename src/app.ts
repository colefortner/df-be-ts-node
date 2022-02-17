import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import mongoose from "mongoose";

import businessRoutes from "./routes/businesses-routes";
import userRoutes from "./routes/users-routes";

const app = express();

app.use(json());

app.use("/businesses", businessRoutes);
app.use("/user", userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

mongoose
  .connect(
    "mongodb+srv://colefortner:colefortner@cluster0.psdhm.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5050, () => {
      console.log("Serving on port 5050");
    });
  })
  .catch((err) => {
    console.log(err);
  });

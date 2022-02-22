import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import path from "path";

import businessRoutes from "./routes/businesses-routes";
import userRoutes from "./routes/users-routes";
import commentRoutes from "./routes/comments-routes";
import ratingRoutes from "./routes/ratings-routes";

const app = express();

app.use(express.json());

app.use(
  "src/uploads/images",
  express.static(path.join("src", "uploads", "images"))
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/businesses", businessRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);
app.use("/ratings", ratingRoutes);

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

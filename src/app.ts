import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";

import businessRoutes from "./routes/businesses-routes";
import userRoutes from "./routes/users-routes";

const app = express();

app.use(json());

app.use("/businesses", businessRoutes);
app.use("/user", userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(4000);

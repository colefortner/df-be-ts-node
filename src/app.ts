import express, { Request, Response, NextFunction } from "express";

import businessRoutes from "./routes/businesses";
import userRoutes from "./routes/users";

const app = express();

app.use("/businesses", businessRoutes);
app.use("/user", userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(4000);

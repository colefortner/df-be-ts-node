import express from "express";

import businessRoutes from "./routes/businesses";
import userRoutes from "./routes/users";

const app = express();

app.use("/businesses", businessRoutes);
app.use("/user", userRoutes);

app.listen(4000);

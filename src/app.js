import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/product";
import userRouter from "./routers/auth";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/wd19321");

app.use("/api", productRouter);
app.use("/api", userRouter);

export const viteNodeApp = app;

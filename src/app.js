import express from "express";
import productRouter from "./routers/product";
import cors from "cors";
import mongoose from "mongoose";
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/wd19321");

app.use(cors());

app.use("/api", productRouter);

export const viteNodeApp = app;

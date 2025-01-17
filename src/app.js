import express from "express";
import productRouter from "./routers/product";
import mongoose from "mongoose";

const app = express();
// middleware
app.use(express.json());
// connect db
mongoose.connect("mongodb://localhost:27017/wd19321");
// router
app.use("/api", productRouter);
export const viteNodeApp = app;

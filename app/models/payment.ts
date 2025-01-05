import mongoose from "mongoose";

const Schema = new mongoose.Schema({});

export const PaymentModel = mongoose.model("payment", Schema);

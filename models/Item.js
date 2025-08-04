import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: Number,

  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);
export default Item;

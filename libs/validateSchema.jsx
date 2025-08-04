import { object, string, number } from "yup";

let itemSchema = object({
  name: string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  description: string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),
  price: number().required("Price is required"),
});

export default itemSchema;

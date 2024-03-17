import express from "express";
import axios from "axios";

const PORT = 8000;
const app = express();

// Middleware để phân tích cú pháp dữ liệu JSON từ yêu cầu


const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json", // Thiết lập header để gửi dữ liệu dưới dạng JSON
  },
});
app.use(express.json());
app.get("/products", (req, res) => {
  res.send("Hello World");
});

app.post("/products", async (req, res) => {
  try {
   const {data}=await instance.post("/products",req.body);
   if(data){
    return res.status(201).json({
        message: "Thêm sản phẩm thành công!",
        data,
   });
    
  }}
   catch (error) {
    return res.status(500).json({ name: error.name, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

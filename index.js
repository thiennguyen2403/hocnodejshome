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
app.get("/products", async(req, res) => {
  try {
    const {data}=await instance.get("/products");
    if(data && data.length>0){
        return res.status(200).json({
            message:"lay san pham thanh cong",
            data,
        })
    }
  } catch (error) {
    return res.status(500).json({ name: error.name, error: error.message });
  }
});
app.get("/products/:id", async (req, res) => {
    try {
      const { data } = await instance.get(`/products/${req.params.id}`);
      if (!data) {
        return res.status(400).json({ message: "Lay san pham that bai!" });
      }
      return res.status(201).json({
        message: "Lay san pham thanh cong!",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  });
app.put("/products/:id", async (req, res) => {
    try {
      const { data } = await instance.put(`/products/${req.params.id}`,req.body);
      if (!data) {
        return res.status(400).json({ message: "cập nhật san pham that bai!" });
      }
      return res.status(201).json({
        message: "cập nhật pham thanh cong!",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
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
app.delete("/products/:id", async (req, res) => {
    try {
        const response = await instance.delete(`/products/${req.params.id}`);
        const { status } = response;
        console.log(status);
        if (status !== 200) {
            return res.status(400).json({ message: "Xoa san pham that bai!" });
        }
        return res.status(200).json({
            message: "Xoa san pham thanh cong!",
        });
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

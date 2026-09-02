require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const core=require("cors");

const app = express();
app.use(core());
app.use(express.json());
app.use(express.static('../public'));

// connect mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("เชื่อมต่อกับ MongoDB เรียบร้อยแล้ว"))
    .catch(err => console.error("ไม่สามารถเชื่อมต่อกับ MongoDB", err))
//นิยามโครงสร้างข้อมูล
const menuSchema = new mongoose.Schema({
    name: String,
    price: Number,
    cat: String
});
const Menus = mongoose.model('Menus', menuSchema);
app.get("/api/menus/:filter", async(req,res)=>{
    const {filter} = req.params;
    let menuItems;
    if(filter==="all"){
        menuItems = await Menus.find();
    }else{
        menuItems = await Menus.find({cat: filter});
    }
    res.json(menuItems);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server กำลังทำงาน");
})
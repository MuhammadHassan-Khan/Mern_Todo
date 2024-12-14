const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb+srv://hassankhan:hassankhan@protfoliodb.chacc.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error: ", err));

const todoSchema = new mongoose.Schema({ text: String });
const Todo = mongoose.model("Todo", todoSchema);

app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post("/todos", async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text
    });
    await newTodo.save();
    res.json(newTodo);
});

app.put("/todos/:id",async (req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const edit = await Todo.findByIdAndUpdate(id,body,{new :true})

    res.status(200).json(edit)

})

app.delete("/todos/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));

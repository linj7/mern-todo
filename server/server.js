// require关键字用于导入模块
const express = require('express'); // 导入express模块，并返回一个构造函数
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./mongodb/models/Todo');
const dotenv = require('dotenv');
const connectDB = require('./mongodb/connect');


dotenv.config();

const app = express(); // 使用构造函数初始化一个express Web应用程序
app.use(cors());
app.use(express.json()); // 添加了该中间件后就会将请求的内容解析为JSON格式，并将解析后的数据附加到request对象的body属性上

connectDB(process.env.MONGODB_URL);

/** Connect to a local database 
mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);
*/

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos/new', (req, res) => {
    // 新建一个Todo模型的document
    const todo = new Todo({
        text: req.body.text
    });
    todo.save(); // save to the collection
    res.json(todo);
});

app.delete("/todos/delete/:id", async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});

app.get('/todos/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo); 
});

app.listen(3001, () => { console.log("Server started on port 3001") });






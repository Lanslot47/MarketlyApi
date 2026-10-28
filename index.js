require("dotenv").config()
const express = require('express')
const app = express();
const port = 5000;
const mongoose = require('mongoose')
const mongodbUrl = "mongodb://localhost:27017/marketly";
const cors =require('cors')




mongoose.connect(mongodbUrl)
    .then(() => console.log('database connected'))
    .catch((error) => console.log(`mongoDb connection ${error}`))

app.use(express.json())
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001'
    ]
}))

app.get('/', (req, res) => {
    res.send({ message: "API is running", status: 200 });
})
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/users", require("./src/routes/user.routes"));
app.use("/api/producer", require("./src/routes/producer.routes"));
app.use("/api/client", require("./src/routes/client.routes"));
app.use("/api/listing", require("./src/routes/listing.routes"));
app.use("/api/save", require("./src/routes/saved.route"));



app.use((err, req, res, next)=>{
    console.log("GLOBAL ERROR: ", err.message || err)
    console.log(err.stack || "")
    res.status(500).json({
        success: false,
        message: err.message || "Internal server error"
    })
})
app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
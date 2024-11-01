const express = require("express");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/api/carrera", require("./routes/carrera"));
app.use("/api/ciclo", require("./routes/ciclo"));

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto: "+ port);
})
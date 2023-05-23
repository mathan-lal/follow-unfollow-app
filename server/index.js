const express = require("express"),
app = express(),
mongoose = require("mongoose"),
userRoutes = require("./routes/user");
const dotenv = require('dotenv');
// const {MONGOURI} = require('./config/keys')
dotenv.config();
const PORT = 8080;
var cors = require('cors')
app.use(cors());

// Connect to database mongoose atlas online/realtime
try {
mongoose.connect("mongodb://127.0.0.1:27017/userslogin", {
useUnifiedTopology: true,
useNewUrlParser: true
});
console.log("connected to db");
} catch (error) {
handleError(error);
}



process.on('unhandledRejection', error => {
console.log('unhandledRejection', error.message);
});
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
extended: true
}));
//using user route
app.use(userRoutes);
//setup server to listen on port 8080
app.listen(PORT || 8080, () => {
console.log("Server is live on port 8080");
})

// if(process.env.NODE_ENV=="production"){
    
//     const path = require(userRoutes)
//     app.get('/',(req,res)=>{
//         app.use(userRoutes);

//         app.use(express.static(path.resolve(__dirname, 'client','build')))

//         res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
//     })

// }
// parse requests of content-type - application/json

// if (process.env.NODE_ENV === "production") {
//     const express = require("express");
//     const path = require("path");
//     const app = express();
    
//     // Serve static files from the React app
//     app.use(express.static(path.join(__dirname, "client/build")));
  
//     // Serve API routes
//     const userRoutes = require("./routes/user");
//     app.use("/api/users", userRoutes);
  
//     // Serve the React app
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname + "/client/build/index.html"));
//     });
    
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   }
  

// if (process.env.NODE_ENV === "production") {
//     const express = require("express");
//     const path = require("path");
//     const app = express();
  
//     // Serve static files from the React app
//     app.use(express.static(path.join(__dirname, "client", "build")));
  
//     // API routes
//     const userRoutes = require("./routes/user");
//     app.use("/api", userRoutes);
  
//     // Catch-all route for React app
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//     });
  
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`Server started on port ${PORT}`);
//     });
//   }
  


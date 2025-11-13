const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=> {
            console.log("MongoDb Atlas connected");
        })
        .catch((err) => {
            console.log(err);
        })

    }
    catch(err) {
        return err;
    }
}

module.exports = connectDB;
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connection: ', connection.connection.host);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB
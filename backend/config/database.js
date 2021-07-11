const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
    })
        .then(con => {
            console.log(`MongoDB database connected with HOST: ${con.connection.host}`);
        });
};

module.exports = connectDatabase;
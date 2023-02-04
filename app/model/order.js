require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
    {
        userId: { type: String, required: true, unique: true },
        subTotal: { type: Number, required: true, unique: true },
        phoneNumber: { type: Number, required: true},
        image: {
            type: String,
            required: true,
            get: (image) => {
                // http://localhost:5000/uploads/1616443169266-52350494.png
                // if (process.env.ON_HEROKU == 'true') {
                //     return `${image}`;
                // }
                // return `${APP_URL}/${image}`;
                return `${APP_URL}/${image}`;
            }
        },
    },
    {  timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Order", OrderSchema);
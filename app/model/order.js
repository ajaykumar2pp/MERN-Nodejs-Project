require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema(
    {
        user_id: {
            type: String, required: true, unique: true
        },
        sub_total: {
            type: Number, required: true, unique: true
        },
        phone_number: {
            type: String, required: true
        },
        image: {
            type: String,
            required: true,
            get: (image) => {
                // http://localhost:5000/uploads/1616443169266-52350494.png
                if (process.env.ON_HEROKU == 'true') {
                    return `${image}`;
                }
                return `${APP_URL}/${image}`;
            },
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", OrderSchema);
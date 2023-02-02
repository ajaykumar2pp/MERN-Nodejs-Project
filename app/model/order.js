const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema= new Schema(
    {
        user_id:{
             type:String,
             required:true,
             unique:true
         },
         sub_total:{
             type:String,
             required:true,
             unique:true
         },
         phone_number:{
             type:String,
             required:true
         },
    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model("Order",OrderSchema);
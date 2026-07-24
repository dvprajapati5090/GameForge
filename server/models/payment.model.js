import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    tournament:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tournament",
        required:true
    },

    team:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Team",
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    currency:{
        type:String,
        default:"INR"
    },

    razorpayOrderId:String,

    razorpayPaymentId:String,

    razorpaySignature:String,

    status:{
        type:String,
        enum:[
            "CREATED",
            "SUCCESS",
            "PAID",
            "FAILED",
            "REFUNDED"
        ],
        default:"CREATED"
    }

},
{
    timestamps:true
});

export default mongoose.model(
    "Payment",
    paymentSchema
);
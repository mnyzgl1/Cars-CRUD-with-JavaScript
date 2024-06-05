

const {Schema,model}=require("mongoose")

const productSchema=new Schema({
    carsModel:{type:String,require:[true,'CarsModel field is required!']},
    price:{type:Number,require:[true,'Price field is required!']},
    quantity:{type:Number,require:[true,'Quantity field is required!']},
    color:{type:String,require:[true,'Color field is required!']},
    image:{type:String,require:[true,'Image field is required!']}

})
const Cars=model("Cars",productSchema)
module.exports=Cars
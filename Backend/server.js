const express = require("express")
const mongoose = require("mongoose")
const Cars = require("./models/ProductModel")

mongoose.connect("mongodb+srv://emineyuzgul95:emineyuzgul95@cluster0.99009u4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => { console.log(err) })

const app = express()
app.use(express.json())

app.get('/', (req, res) => {


})

//Post İle CREATE İşlemi

app.post("/addCars", async (req, res) => {
    try {
        let newCar = req.body
        let savedData = await Cars.create(newCar)

        res.send(
            {
                status: true,
                data: savedData,
                message: "Product Created"
            })

    } catch (error) {
        res.status(404).send({ status: false, message: error.message })
        console.log(error.message)
    }
})

//Tüm ürünlerin çekilmesi-READ

app.get("/Cars", async (req, res) => {
    try {
        const allCars = await Cars.find({})
        res.status(200).send({ status: true, message: "All Cars", data: allCars })
    } catch (error) {
        res.status(404).send({ status: false, message: error.message })
    }
})

//id ile ürün gösterme işlemi

app.get(`/Cars/:id`, async (req, res) => {
    try {
        let { id } = req.params
        const Car = await Cars.findById(id)
        res.status(200).send({ status: 200, message: 'Car Get', data: Car })

    } catch (error) {
        res.status(404).send({ status: false, message: error.message })
    }
})


//ürün DELETE işlemi
app.delete(`/Cars`, async (req, res) => {
    try {
        let { id } = req.body
        const deletedCar = await Cars.findByIdAndDelete(id)
        console.log(deletedCar)

        //zaten silinen bir araba kaydını tekrar silme işleminde göstermemek için 
        if(!deletedCar){
          return  res.status(404).send({ status: false, message: 'Car Already Deleted!'})
        }
        res.status(200).send({ status: 200, message: 'Car Deleted!' })
    } catch (error) {
        res.status(404).send({ status: false, message: error.message })
    }
})

//ürün UPDATE işlemi
app.put("/Cars",async(req,res)=>{
    try {
        let data=req.body
        if(!data._id){
        return  res.status(404).send({ status: false, message: 'Update yapılacak ID gönderilmedi.'})
        }
       let updatedData= await Cars.findByIdAndUpdate(data._id,data)
       console.log(updatedData)
        res.status(200).send({ status:true, message: 'Car Updated!' })

    } catch (error) {
        res.status(404).send({ status: false, message: error.message })
    }
})



app.listen(7000, () => {
    console.log("merhaba ben çalıştım")
})
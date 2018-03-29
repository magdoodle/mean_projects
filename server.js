//express
var express = require('express');
var app = express();
//mongoose
var mongoose = require('mongoose')
//path
var path = require('path');
//body parser
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, '/clientapp/dist')));
app.use(bodyParser.json());


//Connect Mongoose

mongoose.connect('mongodb://localhost/meanthree')

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name field is required"], minlength: [3, 'Name must be at least 3 chars!'] },
    qty: { type: Number, required: [true, "Quantity is required"], min: [1, "Quantity must be greater than 0"] }, 
    price: { type: Number, required: [true, "Price is required"], min: [1, "Price must be greater than $0"] } 
}, { timestamps: true })
mongoose.model('Product', ProductSchema);
const Product = mongoose.model('Product');

app.get('/things', function (req, res) {
    Product.find({}, function (err, data) {
        res.json(data);
    })
})
app.post('/things', function (req, res) {
    var product = new Product({ name: req.body.name, qty: req.body.qty, price: req.body.price })
    product.save(function (err, data) {
        console.log(product)
        if (err) {
            console.log("errors");
            res.json(err)
        }
        else {
            console.log("successfully added");
            res.json(data);
        }
    })
})
//retrieve product by id
app.get('/things/:id', function (req, res) {
    Product.findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            console.log("Oooooppppppsssiiieessss in my get author by id")
        }
        else {
            console.log('yaaaasssss 👸🏼');
            res.json(data);
        }
    })
})
//update || edit product by id
app.put('/things/:id', function (req, res) {
    Product.findById(req.params.id, function (err, foundProduct) {
        foundProduct.name = req.body.name;
        foundProduct.qty = req.body.qty;
        foundProduct.price = req.body.price;
        foundProduct.save(function (err, data) {
            if (err) {
                console.log("errors in the update by id yo");
                res.json(err);
            } else {
                console.log("you updated yo!");
                res.json(data);
            }
        })
    })
})
//deleting shit by id
app.delete('/things/:id', function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, data) {
        res.json(data);
    })
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./clientapp/dist/index.html"))
});
///Port
app.listen(8000, function () {
    console.log('MEAN 😈 Products 📱 listening on port 8000');
})
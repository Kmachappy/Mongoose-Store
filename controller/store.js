const express = require("express");
const Product = require("../models/store");
const productSeed = require("../models/storeSeed")
const storeRouter = express.Router();

// restfulroutes
// index
storeRouter.get("/",(req,res)=>{
    Product.find({}, (err, allProducts)=>{
        res.render("index.ejs",{
            Products: allProducts
        });
    });
});

// seed
storeRouter.get("/seed",(req,res)=>{
    Product.deleteMany({},(error, allProducts)=>{
        Product.create(productSeed, (err,data)=>{
            res.redirect("/")
        })
    })
})

// new
storeRouter.get("/new",(req,res)=>{
    res.render("new.ejs")
})

// show
storeRouter.get("/:id",(req,res)=>{
    Product.findById(req.params.id, (error, product)=>{
        res.render("show.ejs", {product})
    })
})


// create
storeRouter.post("/",(req,res)=>{
    Product.create(req.body, (err,createdProduct)=>{
        if(err) return res.send(err)
        res.redirect("/")
    })
})

// delete
storeRouter.delete("/:id",(req,res)=>{
    Product.findByIdAndDelete(req.params.id, (err,deletedProduct)=>{
        res.redirect("/")
    })
})

// edit
storeRouter.get("/:id/edit",(req,res)=>{
    Product.findById(req.params.id,(err, product)=>{
        res.render("edit.ejs",{product})
    })
})

// update
storeRouter.put("/:id", (req,res)=>{
    Product.findByIdAndUpdate(req.params.id,req.body,(err,updatedProduct)=>{
        if(err) console.log(err)
        res.redirect(`/${req.params.id}`)
        
    })
})








module.exports = storeRouter
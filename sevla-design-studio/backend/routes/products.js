
// Import the required dependecies
const router = require('express').Router();
let Product = require('../models/product.models');
let Pagination = require('../models/pagination.models');


//
// For development purposes only
//
router.route('/').get((req, res) => {
    Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

// var page;
// var size;

// 
// POST method for changing pagination page and size
//
// router.route('/pagination').post(async(req, res) => {
//     try {
//         page = req.body.page;
//         size = req.body.size;
//     }
//     catch {
//         res.status(400).json('Error: ' + err);
//     }
// });

// router.route('/pag').get(async(req, res) => {
//     Pagination.find()
//     .then(products => res.json(products))
//     .catch(err => res.status(400).json('Error: ' + err));
// });


//
// GET method for getting all the products at once with Pagination
//
router.route('/send').get(async (req, res) => {


    try{

        let { page, size, sort } = req.query;

        // If the page is not applied in query.
        if (!page) {

            // Make the Default value one.
            page = 1;

        }
        if (!size) {

            size = 10;

        }

        //  We have to make it integer because query parameter passed is string
        const limit = parseInt(size);
  

        // We pass 1 for sorting data in ascending order using ids
        const prdct = await Product.find()
            .sort({ votes: 1, _id: 1 }).limit(limit)
            res.send({
                page,
                size,
                info: prdct,
            });
    }
    catch (error) {
        res.sendStatus(500);
    }
    
});


// 
// POST method for adding a new product
//
router.route('/add').post(async(req, res) => {
    try {
        const ProductName = req.body.ProductName;
        const ProductDescription = req.body.ProductDescription;
        const ProductPrice = req.body.ProductPrice;
        const ProductSize = req.body.ProductSize;
        const ProductType = req.body.ProductType;
        const ProductQuantity = req.body.ProductQuantity;
        

        const newProduct = new Product({ProductName, ProductDescription, ProductPrice, ProductSize, ProductType, ProductQuantity});
        newProduct.save()
        .then(() => res.json('Product added!'))
    }
    catch {
        res.status(400).json('Error: ' + err);
    }
});



// 
// GET method for finding an specific product
//
router.route('/:item').get((req, res) => {
    
    Product.find({item: req.params['item']})
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));

});




// Export the router to the module
module.exports = router;



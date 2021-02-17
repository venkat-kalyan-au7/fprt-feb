import formidable from "formidable"
import fs from "fs"
import _ from "lodash"
import Category from "../models/categoryModel"
import Product from "../models/productModel"
import errors from "../errors/dataBaseErrors"



//creating new category
exports.addNewCategory =(req,res)=>{
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errors.dataBaseErrors(err)
            });
        }
        res.json({ data });
    });
}
//to view single category
exports.viewCategory=(req,res)=>{
    return res.json(req.category)
}


//to delete a category
exports.deleteCategory=(req,res)=>{
    const category = req.category;
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errors.dataBaseErrors(err)
            });
        }
        res.json({
            message: "Category deleted"
        });
    });
}

//to get all catogories
exports.allCategories=(req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err||!categories){
            return res.status(400).json({
                error:errors.dataBaseErrors(err)
            })
        }
        else{
            res.json(categories)
        }
    })
}
//adding new product

exports.addProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        
        const {name,price,description,quantity,shipping,category} = fields
        if(!name||!price||!description||!quantity||!shipping||!category){
            return res.status(400).json({
                error:'All Fields Are Required'
            })
        }
        let product = new Product(fields);

        if (files.photo) {
            if(files.photo.size>1000000){
                return res.status(400).json({
                    error:'File Size Cannot Be Exceeded More Than 1MB'
                })
            } //--Photo sized staged to 1MB only--
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errors.dataBaseErrors(err)
                });
            }
            res.json(result);
        });
    });
};


//to see a single product

exports.viewProduct=(req,res)=>{
    req.product.photo=undefined
    return res.json(req.product)
}

//delete product

exports.removeProduct=(req,res)=>{
    let product = req.product
    product.remove((err,done)=>{
        if(err){
            return res.status(400).json({
                error:errors.dataBaseErrors(err)
            })
        }
        else{
            res.json({
                message:'Product Deleted'
            })
        }
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        
        
        //updating the product by using lodash extends method
        let product = req.product
                    product = _.extend(product,fields)
         
        if (files.photo) {
            if(files.photo.size>1000000){
                return res.status(400).json({
                    error:'File Size Cannot Be Exceeded More Than 1MB'
                })
            } //--Photo sized staged to 1MB only--
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errors.dataBaseErrors(err)
                });
            }
            res.json(result);
        });
    });
};



exports.allMedicines=(req,res)=>{
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";//we can sort the data or default it will show by id
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Medicines not found"
                });
            }
            res.json(products);
        });
}

/**showing related medicine
 * first we will request the single item by id and remaining related items are obtained from
 * category of current item (excluding the current)
 */


//this will give all the categories from the products which we are selling
exports.allProductCategories=(req,res)=>{
    //here i'm using mongoose distinct method
    Product.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Categories not found"
            });
        }
        res.json(categories);
    });
}



exports.showBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };

            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Medicines not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

/**i'm making a separate request to get the image of item because
 *  i stored in the form of buffer data if i requested for a product 
 * along with the image it will take time so i separated image request*/
exports.imageOfProduct=(req,res)=>{
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}


exports.Search=(req,res)=>{
      // create query object to hold search value and category value
      const query = {};
      // assign search value to query.name
      if (req.query.search) {
          query.name = { $regex: req.query.search, $options: "i" };
          // assigne category value to query.category
          if (req.query.category && req.query.category != "All") {
              query.category = req.query.category;
          }
          // find the product based on query object with 2 properties
          // search and category
          Product.find(query, (err, products) => {
              if (err) {
                  return res.status(400).json({
                      error: errorHandler(err)
                  });
              }
              res.json(products);
          }).select("-photo");
      }
}
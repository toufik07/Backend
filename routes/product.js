const Product = require("../models/Product");
const Category = require("../models/Category");
const { log } = require("console");
const router = require("express").Router();
//CREATE
router.post("/", async (req, res) => {
  if(req.body.imgcontent != "")
  {
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < 10; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    var base64Data = req.body.imgcontent.replace(/^data:image\/png;base64,/, "");
    base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, "");
    base64Data = base64Data.replace(/^data:image\/jpg;base64,/, "");
    if(base64Data != ""){
        req.body.imgpath = "productpics/" + randomString + ".png";
        require("fs").writeFile("assets/" + req.body.imgpath, base64Data, 'base64', function(err) {
          console.log(err);
      });
    }
  }
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    let data = {
        data: {
          status: "success",
          data: savedProduct,
        },
      };
    res.end(JSON.stringify(data));
  } catch (err) {
    console.log(err);
    let data = {
      data: {
        status: "fail",
      },
    };
    res.end(JSON.stringify(data));
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {

    if(req.body.imgcontent != "")
    {
      var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var randomString = '';
      for (var i = 0; i < 10; i++) {
          var randomPoz = Math.floor(Math.random() * charSet.length);
          randomString += charSet.substring(randomPoz,randomPoz+1);
      }
      var base64Data = req.body.imgcontent.replace(/^data:image\/png;base64,/, "");
      base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, "");
      base64Data = base64Data.replace(/^data:image\/jpg;base64,/, "");
      if(base64Data != ""){
          req.body.imgpath = "productpics/" + randomString + ".png";
          require("fs").writeFile("assets/" + req.body.imgpath, base64Data, 'base64', function(err) {
            console.log(err);
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    let data = {
      data: {
        status: "success",
        data: updatedProduct,
      },
    };
    res.end(JSON.stringify(data));
  } catch (err) {
    let data = {
      data: {
        status: "fail",
      },
    };
    res.end(JSON.stringify(data));
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    let data = {
      data: {
        status: "success",
      },
    };
    res.end(JSON.stringify(data));
  } catch (err) {
    let data = {
      data: {
        status: "fail",
      },
    };
    res.end(JSON.stringify(data));
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    let data = {
      data: {
        status: "success",
        data: product,
      },
    };
    res.end(JSON.stringify(data));
  } catch (err) {
    let data = {
      data: {
        status: "fail",
      },
    };
    res.end(JSON.stringify(data));
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    let data = {
      data: {
        status: "success",
        data: products,
      },
    };
    res.end(JSON.stringify(data));
    
  } catch (err) {
    let data = {
      data: {
        status: "fail",
      },
    };
    res.end(JSON.stringify(data));
  }
});


//GET ALL PRODUCTS
router.get("/list/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);    
    let products = await Product.find({category:category.name});
    let data = {
      data: {
        status: "success",
        data: products,
      },
    };
    res.end(JSON.stringify(data));
    
  } catch (err) {
    let data = {
      data: {
        status: "fail",
      },
    };
    res.end(JSON.stringify(data));
  }
});


//GET ALL PRODUCTS
router.get("/search", async (req, res) => {
  try {
    let products = await Product.find();
    let data = {
      data: {
        status: "success",
        data: products,
      },
    };
    res.end(JSON.stringify(data));
    
  } catch (err) {
    let data = {
      data: {
        status: "fail",
      },
    };
    res.end(JSON.stringify(data));
  }
});


module.exports = router;

const Category = require("../models/Category");
const router = require("express").Router();
//CREATE
router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    let data = {
        data: {
          status: "success",
          data: savedCategory,
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
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    let data = {
      data: {
        status: "success",
        data: updatedCategory,
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
    await Category.findByIdAndDelete(req.params.id);
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

//GET Category
router.get("/find/:id", async (req, res) => {
  try {
    const Category = await Category.findById(req.params.id);
    let data = {
      data: {
        status: "success",
        data: Category,
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

//GET ALL Categories
router.get("/", async (req, res) => {
  try {
    let Categories = await Category.find();
    let data = {
      data: {
        status: "success",
        data: Categories,
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

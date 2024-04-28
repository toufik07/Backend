const Order = require("../models/Order");
const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    let data = {
      data: {
        status: "success",
        data: savedOrder,
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


router.post("/markpaid/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: {status:"paid"},
      },
      { new: true }
    );
    let data = {
      data: {
        status: "success",
        data:updatedOrder
      },
    };
    res.end(JSON.stringify(data));
  } catch (err) {
    let data = {
      data: {
        status: "fail"
      },
    };
    res.end(JSON.stringify(data));
  }
});

router.get("/list/:id", async (req, res) => {
  try {
    const orders = await Order.find({userid:req.params.id, status:"paid"});
    let data = {
      data: {
        status: "success",
        data:orders
      },
    };
    res.end(JSON.stringify(data));
  } catch (err) {
    let data = {
      data: {
        status: "fail"
      },
    };
    res.end(JSON.stringify(data));
  }
});


router.get("/listall", async (req, res) => {
  try {
    const orders = await Order.find({status:"paid"});
    let data = {
      data: {
        status: "success",
        data:orders
      },
    };
    res.end(JSON.stringify(data));
  } catch (err) {
    let data = {
      data: {
        status: "fail"
      },
    };
    res.end(JSON.stringify(data));
  }
});

module.exports = router;

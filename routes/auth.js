const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    mobileno: req.body.mobileno,
    password:req.body.password,
  });
  try {
    let user = await newUser.save();
    let data = {
        data: {
          status: "success",
          data: user,
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

//LOGIN

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                email: req.body.username
            }
        );
        if(user == null)
        {
            let data = {
                data: {
                  status: "fail",
                  message: "Invalid email",
                },
              };
              res.end(JSON.stringify(data));
        }
        else{
            const inputPassword = req.body.password;
            const originalPassword=user.password;
            if(originalPassword != inputPassword)
            {
                let data = {
                    data: {
                      status: "fail",
                      message: "Invalid password",
                    },
                  };
                  res.end(JSON.stringify(data));
            }            
            else{
                let data = {
                    data: {
                      status: "success",
                      data: user,
                    },
                  };
                res.end(JSON.stringify(data));
            }
        }
    }catch(err){
        let data = {
            data: {
              status: "fail",
              message: "something went wrong",
            },
          };
          res.end(JSON.stringify(data));
    }
});


router.post('/adminlogin', async (req, res) => {
  try{
      if(req.body.username == "admin" && req.body.password == "admin")
      {
        let data = {
          data: {
            status: "success"
          },
        };
        res.end(JSON.stringify(data));
      }
      else{
        let data = {
          data: {
            status: "fail"
          },
        };
        res.end(JSON.stringify(data));
      }
  }catch(err){
      let data = {
          data: {
            status: "fail",
          },
        };
        res.end(JSON.stringify(data));
  }
});



module.exports = router;

import User from "../model/User.js";

const getHealthApi = (req, res) => {
  res.send("Chat-bliss app Health is Ok.");
};

const postApiV1Signup = async (req, res) => {
    const { username, email, password } = req.body;
  
    const checkUserName = await User.findOne({username});
  
    if(checkUserName){
      return res.status(400).json({
          success : false,
          message : "Username is already exist try another username."
      })
    }
  
    const checkUserEmail = await User.findOne({email});
  
    if(checkUserEmail){
      return res.status(400).json({
          success : false,
          message : "Email is already exist try another email."
      })
    }
  
    const userData = new User({
      username,
      email,
      password,
    });
  
    try {
      const saveUserData = await userData.save();
  
      res.json({
        success: true,
        data: saveUserData,
        message: "Signup successfull",
      })
  
    } catch (err) {
      res.json({
        success: false,
        message: err.message
      });
    }
  };


  const postApiV1Login = async (req, res) => {
    const { email, password } = req.body;
    if (!(email || password)) {
      res.status(400).json({
        success: false,
        message: "please provide email password",
      });
    }
    try {
      const user = await User.findOne({ email, password});
      if (user) {
        res.status(200).json({
          success: true,
          data: user,
          message: "login successfull",
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid Credintial",
        });
      }
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  };

export { getHealthApi, postApiV1Signup, postApiV1Login }
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


export { getHealthApi, postApiV1Signup }
const jwt = require("jsonwebtoken");

exports.authCheck = (req, res, next) =>{
  try {
      if(req.url.includes( "/login")) return next();
    const token = req.header("Authorization").replace("Bearer ", "");
    
    jwt.verify(
      token,
      process.env.SECRET,
      function (error, user) {
        if (error) {
          res.send({
            error: true,
            statusCode: 401,
            message: error.message,
          });
        } else {
          next();
        }
      }
    );
  } catch (error) {
    res.send({
      error: true,
      statusCode: 501,
      message: error.message,
    });
  }
};

exports.generateToken =  (req,res)=>{
    try{
    const token = jwt.sign(
        "sample",
        process.env.SECRET
      );
      res.send({accessToken: token});
    } catch (error) {
        res.send({
          error: true,
          statusCode: 501,
          message: error.message,
        });
      }
}
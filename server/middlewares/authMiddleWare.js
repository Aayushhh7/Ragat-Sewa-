const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    const decryptedData = JWT.verify(token, process.env.JWT_SECRET);
    req.body.userId = decryptedData.userId;
    next();
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

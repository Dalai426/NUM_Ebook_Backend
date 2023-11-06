const jwt = require("jsonwebtoken");
require('dotenv').config();


const signAccessToken = ({ user, refreshToken }) => {
  try {
    const accessToken = jwt.sign(
      {
        user,
        refreshToken,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h'
      }
    );
    return accessToken;
  } catch (error) {
    throw error;
  }
};

const signRefreshToken = ({ user }) => {
  try {
    const refreshToken = jwt.sign(
      {
        user
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '2d'
      }
    );

    return refreshToken;
  } catch (error) {
    throw error;
  }
};

const createUserTokens = (user) => {
  // - JWT token
  try {
    const refreshToken = signRefreshToken({
      user
    });
    const accessToken = signAccessToken({
      user,
      refreshToken
    });
    return { accessToken, refreshToken };
  }
  catch (error) {
    throw error;
  }
};

const verifyTokens = (token) => {
  
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken)=>{
    if(err){
      return null;
    }else{
      return decodedToken;
    }
  });
};

module.exports = { createUserTokens, verifyTokens};
const jwt = require("jsonwebtoken");
require('dotenv').config({path:`.env.${process.env.NODE_ENV}`});


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
        expiresIn: '1d'
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
      return {err, error:true};
    }else{
      return {decodedToken, error:false};
    }
  });
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decodedToken)=>{
    if(err){
      return {err, error:true};
    }else{
      return {decodedToken, error:false};
    }
  });
};

module.exports = { createUserTokens, verifyTokens, verifyRefreshToken, signAccessToken};
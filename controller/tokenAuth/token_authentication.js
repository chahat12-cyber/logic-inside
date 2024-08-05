const jwt = require("jsonwebtoken");
require("dotenv").config();

const Login = {
    createLogin: (req, res) => {
        const user = {
            id: 1,
            userName: "chahat",
            email: "schahat801@gmail.com"
        };

        jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                res.status(500).json({ error: "Error generating token" });
            } else {
                res.json({ token });
            }
        });
    },

    verifyToken: (req, res, next) => {
        const bearerHeader = req.header('Authorization');
        if (typeof bearerHeader !== 'undefined') {
          const bearer = bearerHeader.split(" ");
          const token = bearer[1];
          jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
            if (err) {
              res.status(403).json({ message: "Invalid Token" });
            } else {
              req.user = authData;
              next();
            }
          });
        } else {
          res.status(403).json({ message: "Token is not provided" });
        }
      },
    

      getProfile: (req, res) => {
        res.json({ message: "Profile accessed", authData: req.user });
      }

};

module.exports = Login;

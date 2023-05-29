var jwt = require('jsonwebtoken');
const JWT_SECRET = 'onelastride';
 

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: "Please authenticate with a valid token 01" })
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate with a valid token 02" })
  }
};

module.exports = fetchuser;

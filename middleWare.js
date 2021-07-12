const jwt = require("jsonwebtoken");
const User = require("./schemas/user");

export const auth = (req, res, next) => {
  const { token } = req.headers;

  if (token !== null || token !== undefined) {
    const { nickname } = jwt.verify(token, "secret");
    User.findOne({ nickname }).then((result) => {
      res.locals.user = result;
    });
  } else {
  }
};

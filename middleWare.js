// exports.authMiddleWare = (req, res, next) => {
//     res.locals.isLoggedIn = req.session.isLoggedIn;
//     res.locals.usernickname = req.session.usernickname;
  
//     return next();
//   };
  
  //프론트엔드에서 는 일이므로 굳이추가 안해도 될듯
  // exports.onlyAuthed = (req, res, next) => {
  //   if(req.session.isLoggedIn){
  //       return next();
  //   }
  
  // }
  
  // exports.onlyAnnoymous = (req, res, next) => {
  //   if(!req.session.isLoggedIn){
  //     return next();
  // }
  
  // }
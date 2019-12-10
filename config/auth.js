module.exports = {
  //var check_user = res.locals.user;
 //console.log(user);
  ensureAuthenticated: function(req, res, next) {
    //console.log(req.user);
    if (!req.user) {
      //nếu ko tồn tại xác thực thì bắt đăng nhập
      req.flash('error_msg', 'Bạn không được phép truy cập vào đây!');
      res.redirect('/login');
    } else if (req.isAuthenticated()) {//chưa đăng đăng nhập nếu tồn tại xác thực
      return next();// chuyển tới middleware kế 
    }

  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {// nếu ko tồn tại xác thực thì bắt chuyển tới trang phía sau là login 
      return next();
    }
    //nếu tồn tại xác thực thì khi gõ /login sẽ render vào trang account và bỏ qua trang login
    //console.log("đã đăng nhập");
    res.redirect('/account');  
  }
};
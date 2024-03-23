class HomeController {
  static index(req, res) {
    res.send(`${req.options} MiddleWare is working`);
  }
}

export default HomeController;

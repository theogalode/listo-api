const { authJwt } = require("../middlewares");
const controller = require("../controllers/recipe.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/recipes", [authJwt.verifyToken], controller.getAll);
  app.post("/api/recipes", [authJwt.verifyToken], controller.create);
  app.get("/api/recipes/:id", [authJwt.verifyToken], controller.get);
  app.put("/api/recipes/:id", [authJwt.verifyToken], controller.update);
  app.delete("/api/recipes/:id", [authJwt.verifyToken], controller.delete);

  app.get("/api/recipes/:id/ingredients", [authJwt.verifyToken], controller.getIngredients);
  app.post("/api/recipes/:id/ingredients", [authJwt.verifyToken], controller.addIngredient);
  app.get("/api/recipes/:id/ingredients/:i_id", [authJwt.verifyToken], controller.getIngredient);
  app.put("/api/recipes/:id/ingredients/:i_id", [authJwt.verifyToken], controller.updateIngredient);
  app.delete("/api/recipes/:id/ingredients/:i_id", [authJwt.verifyToken], controller.deleteIngredient);
};
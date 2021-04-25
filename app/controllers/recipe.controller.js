const db = require('../models');
const Recipe = db.recipe;
const Ingredient = db.ingredient;

exports.getAll = async (req, res) => {
  try {
    const { count, rows } = await Recipe.findAndCountAll();
    res.status(200).send({ count: count, rows: rows });
  } catch (error) {
    res.status(500).send({ status: 'fail', error: error });
  }
}

exports.create = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(200).send({
      status: 'OK',
      message: 'Recipe created',
      recipe: recipe
    });
  } catch (error) {
    res.status(500).send({ 
      status: 'failed',
      error: error || 'An error are occurred.'
    })
  }
}

exports.addIngredient = async (req, res) => {
  const id = req.params.id;

  try {
    Ingredient.findOne({where: {recipeId: id, name: req.body.name}})
    .then((item) => {
      if (item != null) {
        Ingredient.update({quantity: db.Sequelize.literal(`quantity + ${req.body.quantity || 1}`)}, {where: {recipeId: id, name: req.body.name}});
      } else {
        ingredient = Ingredient.create({
          name: req.body.name,
          price: req.body.price,
          userId: req.body.userId,
          recipeId: id,
          quantity: req.body.quantity,
          unit: req.body.unit
        });
      }
      res.status(200).send({
        status: 'OK',
        ingredient: 'The ingredient has added to the recipe.'
      }); 
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
      error: error || 'An error are occurred.'
    });
  }
}

exports.get = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const recipe = await Recipe.findOne({
      where: { id: id },
    });
    if (recipe == null) {
      res.status(404).send({
        status: 'fail',
        message: 'Recipe not found.'
      });
    }
    res.status(200).send({
      status: 'OK',
      recipe: recipe
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
      error: error || 'An error are occurred.'
    });
  }
}

exports.getIngredients = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const recipe = await Recipe.findOne({
      where: { id: id },
      include: Ingredient
    });

    if (recipe == null) {
      res.status(404).send({
        status: 'fail',
        message: 'Recipe not found.'
      });
    }

    res.status(200).send({
      status: 'OK',
      ingredients: await recipe.getIngredients()
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
      error: error || 'An error are occurred.'
    });
  }
}

exports.getIngredient = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const ingredientId = parseInt(req.params.i_id, 10);

  try {
    const recipe = await Recipe.findOne({where: { id: id }});
    const ingredient = await Ingredient.findOne({where: { id: ingredientId, recipeId: id }});

    if (recipe != null && ingredient != null ) {
      res.status(200).send({
        status: 'OK',
        ingredient: ingredient
      });
    }
    res.status(404).send({
      status: 'fail',
      message: 'Ingredient not found for this recipe.'
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
      error: error || 'An error are occurred.'
    });
  }
}

exports.update = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const recipe = await Recipe.update(req.body, {
      where: { id: id },
    });
    if (recipe == 1) {
      res.status(200).send({
        status: 'OK',
        message: `Recipe with id ${id} has updated.`
      });
    } else {
      res.status(404).send({
        status: 'fail',
        message: 'Recipe not found.'
      });
    }

  } catch (error) {
    res.status(500).send({
      status: 'failed',
      error: error || 'An error are occurred.'
    });
  }
}

exports.updateIngredient = async (req, res) => {
  const id = req.params.id;
  const ingredientId = req.params.i_id;

  try {
    const recipe = await Recipe.findOne({where: { id: id }});
    const ingredient = await Ingredient.findOne({where: { id: ingredientId, recipeId: id }});

    if (recipe != null && ingredient != null) {
      await ingredient.update(req.body);
      res.status(200).send({
        status: 'OK',
        message: 'Ingredient updated.'
      });
    }
    res.status(404).send({
      status: 'fail',
      message: 'Ingredient not found for this recipe.'
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
      error: error || 'An error are occurred.'
    });
  }
}

exports.delete = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  try {
    const recipe = await Recipe.findOne({where:{id:id}});
    if (recipe == null) {
      res.status(404).send({
        status: 'fail',
        message: `Recipe not found with id ${id}.`
      });
    } else {
      Recipe.destroy({
        where: { id: id },
      });
  
      res.status(200).send({
        status: 'OK',
        message: `Recipe with id ${id} has deleted.`
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 'failed',
      error: error || 'An error are occurred.'
    });
  }
};

exports.deleteIngredient = async (req, res) => {
  const id = req.params.id;
  const ingredientId = req.params.i_id;

  try {
    const recipe = await Recipe.findOne({where: { id: id }});
    const ingredient = await Ingredient.findOne({where: { id: ingredientId, recipeId: id }});

    if (recipe != null && ingredient != null) {
      await ingredient.destroy();
      res.status(200).send({
        status: 'OK',
        message: 'Ingredient deleted'
      });
    }
    res.status(404).send({
      status: 'fail',
      message: 'Ingredient not found for this recipe.'
    });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
      error: error || 'An error are occurred.'
    });
  }
}
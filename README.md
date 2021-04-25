# Recipe Manager API

## How use

Try following requests to this url : https://theogalode.zapto.org/api/
  - /recipes
  o GET: Get all recipes
  o POST: Add a new recipe
  - /recipes/{id}
  o GET: Get recipe with id {id}
  o PUT: Update recipe with id {id}
  o DELETE: Remove recipe with id {id}
  - /recipes/{id}/ingredients
  o GET: Get all ingredients for recipe with id {id}
  o POST: Add ingredient for recipe with id {id}
  - /recipes/{id}/ingredients/{r_id}
  o GET recipe with id {r_id}
  o PUT: Update recipe with id {r_id}
  o DELETE: Remove recipe with id {r_id}
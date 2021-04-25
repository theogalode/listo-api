# Recipe Manager API

## How use

Try following requests to this url : https://theogalode.zapto.org/api/
  - /recipes
    - GET: Get all recipes
    - POST: Add a new recipe
  - /recipes/{id}
    - GET: Get recipe with id {id}
    - PUT: Update recipe with id {id}
    - DELETE: Remove recipe with id {id}
  - /recipes/{id}/ingredients
    - GET: Get all ingredients for recipe with id {id}
    - POST: Add ingredient for recipe with id {id}
  - /recipes/{id}/ingredients/{r_id}
    - GET recipe with id {r_id}
    - PUT: Update recipe with id {r_id}
    - DELETE: Remove recipe with id {r_id}
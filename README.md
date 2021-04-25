# Recipe Manager API

## How use

Try following requests on postman with this url : https://theogalode.zapto.org/api
  - /auth/signup
    - POST: Create an account
      ```json
      body exemple: 
      {
        "username": "fooname",
        "email": "fooname@hotmail.com",
        "password": "mdpFooname"
      }
      ```
      
  - /auth/signin
    - POST: Connect to your account.
      ```json
      body exemple: 
      {
        "username": "fooname", //or "email": "fooname@hotmail.com" 
        "password": "mdpFooname"
      }
      ```

  - /recipes
    - GET: Get all recipes
    - POST: Add a new recipe
      ```json
      body exemple: 
      {
        "title": "pates",
        "description": "Repas de pates",
        "cooking_instructions": "instructions for cooking",
        "preparation_time": 30,
        "difficulty": 1,
        "userId": 1
      }
      ```
  
  - /recipes/{id}
    - GET: Get recipe with id {id}
    - PUT: Update recipe with id {id}
    - DELETE: Remove recipe with id {id}
  
  - /recipes/{id}/ingredients
    - GET: Get all ingredients for recipe with id {id}
    - POST: Add ingredient for recipe with id {id}
      ```json
      body exemple: 
      {
        "name": "2",
        "price": 12.47,
        "userId": 1,
        "quantity": 1,
        "unit": "piece"
      }
      ```
      
  - /recipes/{id}/ingredients/{i_id}
    - GET recipe with id {i_id}
    - PUT: Update recipe with id {i_id}
    - DELETE: Remove recipe with id {i_id}


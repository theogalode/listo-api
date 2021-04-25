# Recipe Manager API

## How use

Try following requests on postman with this url : https://theogalode.zapto.org/api
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
  - /recipes/{id}/ingredients/{i_id}
    - GET recipe with id {i_id}
    - PUT: Update recipe with id {i_id}
    - DELETE: Remove recipe with id {i_id}

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5631094-3dc5a5ea-abd0-4425-a55d-1d5c0fac715b?action=collection%2Ffork&collection-url=entityId%3D5631094-3dc5a5ea-abd0-4425-a55d-1d5c0fac715b%26entityType%3Dcollection%26workspaceId%3Dd9a87695-b8ea-4f42-8b91-f4f3dcbeafb5)

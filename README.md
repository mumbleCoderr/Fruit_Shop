to run a project you have to:
1. add a file "application.properties" into src/main/resources/application.properties.
2. in "application.properties" file add:
   
   spring.application.name=backend
  
   spring.datasource.url= {database_url}
   spring.datasource.username= {database_username}
   spring.datasource.password= {database_password}

   security.jwt.secret-key=3cfa76ef14937c1c0ea519f8fc057a80fcd04a7420f8e8bcd0a7567c272e007b
   # 1h in millisecond
   security.jwt.expiration-time=7200000

   ## Hibernate properties
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.open-in-view=false

3. run your database.
4. run backend application.
5. run forntend application via "npm run dev" in a project console.
6. to get the full potential of the application insert some inserts into database tables especially connect user with authority table (in authority table you must have ROLE_USER and ROLE_ADMIN records)

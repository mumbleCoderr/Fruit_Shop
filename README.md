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

3. run your database.
4. create entities in your database via:
   
   CREATE TABLE address (
id int NOT NULL AUTO_INCREMENT,
address_line varchar(100) NOT NULL,
address_line_2 varchar(100) NULL,
city varchar(100) NOT NULL,
zip_code varchar(50) NOT NULL,
country varchar(100) NOT NULL,
CONSTRAINT address_pk PRIMARY KEY (id)
);
CREATE TABLE authority (
id int NOT NULL AUTO_INCREMENT,
name varchar(20) NOT NULL,
CONSTRAINT authority_pk PRIMARY KEY (id)
);
CREATE TABLE authority_user (
id int NOT NULL AUTO_INCREMENT,
user_id int NOT NULL,
authority_id int NOT NULL,
CONSTRAINT authority_user_pk PRIMARY KEY (id)
);
CREATE TABLE `order` (
id int NOT NULL AUTO_INCREMENT,
address_id int NOT NULL,
user_id int NOT NULL,
date datetime NOT NULL,
total_summary double NOT NULL,
CONSTRAINT order_pk PRIMARY KEY (id)
);
CREATE TABLE ordered_product (
id int NOT NULL AUTO_INCREMENT,
product_id int NOT NULL,
order_id int NOT NULL,
quantity int NOT NULL,
CONSTRAINT ordered_product_pk PRIMARY KEY (id)
);
CREATE TABLE product (
id int NOT NULL AUTO_INCREMENT,
name varchar(50) NOT NULL,
quantity int NOT NULL,
price double NOT NULL,
img text NOT NULL,
CONSTRAINT product_pk PRIMARY KEY (id)
);
CREATE TABLE user (
id int NOT NULL AUTO_INCREMENT,
username varchar(20) NOT NULL,
password varchar(500) NOT NULL,
name varchar(50) NOT NULL,
surname varchar(50) NOT NULL,
phone_number varchar(20) NOT NULL,
CONSTRAINT user_pk PRIMARY KEY (id)
);
ALTER TABLE authority_user ADD CONSTRAINT authority_user_authority FOREIGN KEY authority_user_authority (authority_id)
REFERENCES authority (id);
ALTER TABLE authority_user ADD CONSTRAINT authority_user_user FOREIGN KEY authority_user_user (user_id)
REFERENCES user (id);
ALTER TABLE ordered_product ADD CONSTRAINT cart_product_product FOREIGN KEY cart_product_product (product_id)
REFERENCES product (id);
ALTER TABLE `order` ADD CONSTRAINT order_adress FOREIGN KEY order_adress (address_id)
REFERENCES address (id);
ALTER TABLE `order` ADD CONSTRAINT order_user FOREIGN KEY order_user (user_id)
REFERENCES user (id);
ALTER TABLE ordered_product ADD CONSTRAINT ordered_product_order FOREIGN KEY ordered_product_order (order_id)
REFERENCES `order` (id);

5. insert records to your database via:
   
INSERT INTO user (username, password, name, surname, phone_number)
VALUES ('administrator123', '$2a$12$tkSH97g1tuzoCOk.FJZLXu9MZLwFaRAKJSIeaAIIWYirgPz18AitK',
'worker_01_admin_name', 'worker_01_admin_surname', '000000000');
INSERT INTO authority (name)
VALUES ('ROLE_ADMIN');
INSERT INTO authority (name)
VALUES ('ROLE_USER');
INSERT INTO authority_user (authority_id, user_id)
VALUES (1, 1);
   
6. run backend application.
7. insert: 'npm install' command in a front app console to install all necessary libraries required for a frontend app.
8. run frontend application via 'npm run dev' in a project console.

You should be able to log in into the admin account to get augmented features that you can use for example adding new fruits, removing them or take a look for all orders made.
username: administrator123
password: turbohardpassword
When you logout from a user account and log in to the admin account or vice versa, you have to refresh page to see components that are signed to the corresponding user role.


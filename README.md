Store Rating Platform – Usage & Setup Guide

Executive Summary: This guide explains how to set up, configure, and run the Store Rating Platform (a full-stack web application). It covers prerequisites (OS, Node, npm, MYSQL), cloning the repo, installing dependencies, configuring environment variables, initializing the database, and running the backend and frontend. Example API calls (signup, login, submit rating) are shown. If certain files or instructions are unspecified in the repository, the guide notes that.

Prerequisites
Operating System: Linux/macOS/Windows (with appropriate shells; this guide uses bash).
Node.js: Version 14.x or later (for server and client)
.
Package Manager: npm (v6+) or yarn (v1+) installed.
PostgreSQL: Version 12 or later, with a database created for the app.
Git: To clone the repository.
Ensure PostgreSQL is running (on default port 5432) and you have permissions to create a database. Also, optionally install a tool like Postman or curl to test the APIs.

Clone Repository
Open a terminal and run:

bash
Copy
# Clone the repository (replace with actual repo URL if different)
git clone https://github.com/Dnyana13/store-rating-platform.git
cd store-rating-platform
Note: We assume the repo has a root backend and a client/ React frontend (like similar projects)
. If the structure differs, adjust accordingly.

Install Dependencies
Backend
bash
Copy
# In project root (backend)
npm install
This installs all server dependencies listed in package.json (Express, pg, jsonwebtoken, etc).

Frontend
bash
Copy
cd client
npm install
cd ..
This installs frontend dependencies (React, axios, etc) from client/package.json.

Environment Variables
Create a .env file in the root (backend) directory. Based on similar projects, expected variables include:

Variable	Example Value	Description
DB_NAME	store_rating_db	Database name
DB_USER	your_db_username	DB user with access to above DB
DB_PASSWORD	your_db_password	Password for DB user (empty if none)
JWT_SECRET	some_random_secret	Secret key for JWT signing
JWT_EXPIRE	7d	JWT expiration (e.g. 7d for 7 days)
PORT	5001	Port for backend server (default 5001)
CLIENT_URL	http://localhost:3000	Frontend URL (for CORS)
ADMIN_EMAIL	admin@storerating.com	Default admin user email
ADMIN_PASSWORD	Admin@123	Default admin password
ADMIN_NAME	System Administrator	Default admin name

Example .env content:

ini
Copy
DB_HOST=localhost
DB_PORT=5432
DB_NAME=store_rating_db
DB_USER=postgres
DB_PASSWORD=secretpassword
JWT_SECRET=myjwtsecret
JWT_EXPIRE=7d
PORT=5001
CLIENT_URL=http://localhost:3000
ADMIN_EMAIL=admin@storerating.com
ADMIN_PASSWORD=Admin@123
ADMIN_NAME=Admin User
If any variable is missing from .env.example, mark it unspecified.

Database Setup
Create Database: In psql or any SQL client, run:

sql
Copy
CREATE DATABASE store_rating_db;
(Replace name if using different DB_NAME from .env
.)

Initialize Schema: Run any provided init script or migrate manually. For example:

bash
Copy
node scripts/init-db.js
This script (if present) typically creates tables (users, stores, ratings)
 and inserts the default admin using ADMIN_EMAIL/ADMIN_PASSWORD. If the repo lacks such a script, one must create tables manually or mark unspecified.

Running the Backend
From project root:

Development Mode:

bash
Copy
npm run dev
(This often uses nodemon; or simply npm start for no-restart.)

Production Mode:

bash
Copy
NODE_ENV=production npm start
The server listens on the port from PORT (e.g. 5001)
. Ensure CLIENT_URL in .env matches your frontend.

Running the Frontend
From project root or in client/ directory:

bash
Copy
cd client
npm start
This starts React on http://localhost:3000. It uses the REACT_APP_API_URL env var (if defined in client/.env, e.g. http://localhost:5001/api
) to contact the backend.

Build for Production
Backend: Typically no build step (unless using TypeScript). Deploy as per Node norms.

Frontend:

bash
Copy
cd client
npm run build
Generates a build/ folder for deployment.

Default Admin Credentials
After initialization, log in with the defaults (from .env):

Email: admin@storerating.com
Password: Admin@123
If these fail, either the init script wasn’t run or the values differ. You can also manually insert an admin user in the users table with role SYSTEM_ADMIN
.

Example API Usage
Below are sample HTTP requests (using JSON) for common actions. Replace <token> with the JWT obtained after login.

Sign Up (Normal User):

http
Copy
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123",
  "address": "123 Main St"
}
Response: 201 Created with user info or error if exists.

Login:

http
Copy
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password@123"
}
Response: 200 OK with { token: "<JWT>" }.

Submit Store Rating:

http
Copy
POST /api/ratings
Authorization: Bearer <token>
Content-Type: application/json

{
  "storeId": 42,
  "rating": 4,
  "comment": "Great service!"
}
Response: 200 OK with confirmation message.

Adjust endpoint paths as needed (some setups use /api). See routes for exact paths (e.g. /api/auth/login).

Troubleshooting
DB Connection Errors: Ensure PostgreSQL is running and .env credentials are correct
. Check DB name and port.
Port Conflicts: Default backend port is 5001
; change if needed. Frontend port 3000 may conflict if already in use.
Missing Env: If an error says an env var is missing, ensure .env has all keys (see table above)
.
Cannot Insert Default Admin: If admin is not created, either rerun init-db.js or manually insert:
sql
Copy
INSERT INTO users (name,email,password,role,address) VALUES 
  ('System Admin','admin@storerating.com','<hashed-password>','SYSTEM_ADMIN','Admin Address');
Use bcrypt to hash the ADMIN_PASSWORD (the init script typically does this).
Invalid JWT: Verify JWT_SECRET matches on both backend and any script. Reset token if needed.
For other issues (missing files or values), refer to project documentation or source.

Environment & Commands Tables
Env Variable	Example Value	Description
DB_HOST	localhost	PostgreSQL host
DB_PORT	5432	PostgreSQL port
DB_NAME	store_rating_db	Database name
DB_USER	postgres	DB username
DB_PASSWORD	secretpassword	DB user’s password
JWT_SECRET	myjwtsecret	Secret for signing JWT
JWT_EXPIRE	7d	JWT expiry (e.g. 7d for 7 days)
PORT	5001	Backend server port
CLIENT_URL	http://localhost:3000	Frontend URL (for CORS)
ADMIN_EMAIL	admin@storerating.com	Default admin email
ADMIN_PASSWORD	Admin@123	Default admin password
ADMIN_NAME	System Administrator	Admin’s name

Purpose	Command
Clone repository	git clone https://github.com/Dnyana13/store-rating-platform.git
Install backend deps	npm install (in project root)
Install frontend deps	cd client && npm install && cd ..
Create PostgreSQL DB	psql -U postgres -c "CREATE DATABASE store_rating_db;"
Initialize DB schema	node scripts/init-db.js (if provided)
Run backend (dev)	npm run dev or npm start
Run frontend (dev)	cd client && npm start
Build frontend (prod)	cd client && npm run build

Each step should be executed in the project’s root directory unless specified.

This completes the setup and usage instructions for the Store Rating Platform. Follow each step, using the example values as a guide.











Postman Testing Screenshots:-

ToSearchSearch+Pagination+Sort :
<img width="1919" height="1000" alt="ToSearchSearch+Pagination+Sort" src="https://github.com/user-attachments/assets/bfc49ec2-dadc-4820-a68a-af689b5228ad" />
ToTestValidation :
<img width="1919" height="1008" alt="ToTestValidation" src="https://github.com/user-attachments/assets/c820182b-6e12-4107-8af2-eb10387a980c" />
ToTestOwnerLogin :
<img width="1919" height="1007" alt="ToTestOwnerLogin" src="https://github.com/user-attachments/assets/60594de3-c198-41bd-a329-920a72583ca8" />
ToTestSignUpAsOwner :
<img width="1919" height="1008" alt="ToTestSignUpAsOwner" src="https://github.com/user-attachments/assets/e59ce1f0-e4de-4a85-a4b8-73747ff56eca" />
ToTestLogInAsOwner :
<img width="1919" height="1003" alt="ToTestLogInAsOwner" src="https://github.com/user-attachments/assets/071102a1-b7a5-498c-b38f-1f6c3294d5ca" />
ToTestCallDashboardAPI :
<img width="1919" height="1008" alt="ToTestCallDashboardAPI" src="https://github.com/user-attachments/assets/0267887c-9436-4a8e-92ac-30b63e9ad206" />
ToGetUsersByUsingAdminRole :
<img width="1919" height="1006" alt="ToGetUsersByUsingAdminRole" src="https://github.com/user-attachments/assets/64be2c7c-829f-433d-8af5-d1be297f97b7" />
ToGetStoresByUsingAdminRole :
<img width="1919" height="1000" alt="ToGetStoresByUsingAdminRole" src="https://github.com/user-attachments/assets/ac337683-4ca1-4af4-93da-e1aae57c8710" />
ToDeleteUserByUsingAdminRole :
<img width="1919" height="1001" alt="ToDeleteUserByUsingAdminRole" src="https://github.com/user-attachments/assets/5d819cfb-ee07-4b6a-9bd3-c78e6813fe9b" />
ToGetStatsUsingAdminRole :
<img width="1919" height="1009" alt="ToGetStatsUsingAdminRole" src="https://github.com/user-attachments/assets/b39c3050-59f7-48dc-a133-0b5aebf2ab09" />
ToCreateStoreByUsingAdminRole :
<img width="1919" height="1009" alt="ToCreateStoreByUsingAdminRole" src="https://github.com/user-attachments/assets/b29d7d31-02e4-4772-955e-5eb6f471dd01" />
ToTestAPIRunning :
<img width="1919" height="1009" alt="ToTestAPIRunning" src="https://github.com/user-attachments/assets/ecda0076-68b3-40e5-b007-6af68139f54d" />
ToTestDB :
<img width="1919" height="1011" alt="ToTestDB" src="https://github.com/user-attachments/assets/bac4a147-400e-46db-b2e4-bdc188d2987b" />
ToTestSignUpAPI :
<img width="1919" height="1009" alt="ToTestSignUpAPI" src="https://github.com/user-attachments/assets/6152baaf-3f5e-42a9-ae67-6c6468e260a6" />
ToTestLoginAPI
<img width="1919" height="1005" alt="ToTestLoginAPI" src="https://github.com/user-attachments/assets/cadebb80-a52a-4f32-8cca-a6dadf4bc8b0" />
ToTestProtectedRoute
<img width="1919" height="1007" alt="ToTestProtectedRoute" src="https://github.com/user-attachments/assets/41c78ed0-9877-4dd3-9ed7-b6f59a8c4354" />
ToTestAdminSignUp
<img width="1919" height="973" alt="ToTestAdminSignUp" src="https://github.com/user-attachments/assets/78456189-5f98-42ad-ad5e-ccfdf4f314d2" />
ToTestAdminLogin
<img width="1919" height="1004" alt="ToTestAdminLogin" src="https://github.com/user-attachments/assets/4b095eba-5366-4fcb-bd3c-f74ad5da953a" />
ToTestAddUserUsingAdmin
<img width="1919" height="1015" alt="ToTestAddUserUsingAdmin" src="https://github.com/user-attachments/assets/ba0f94ba-ca45-48ec-8678-67b85e2f7d27" />
ToTestAddStoreUsingAdmin
<img width="1919" height="1006" alt="ToTestAddStoreUsingAdmin" src="https://github.com/user-attachments/assets/80a44129-9249-4372-8b58-41e6fbe58fc1" />
ToGetAllUsers
<img width="1919" height="1007" alt="ToGetAllUsers" src="https://github.com/user-attachments/assets/34e059d1-1c94-4d0a-902e-ff80923959fd" />
ToGetAllStores
<img width="1919" height="1008" alt="ToGetAllStores" src="https://github.com/user-attachments/assets/4abd9586-0b40-4f82-97cf-11e83f55737a" />
ToGetDashboard
<img width="1919" height="1009" alt="ToGetDashboard" src="https://github.com/user-attachments/assets/80756e9e-c635-4843-adb2-d4923b6a4dfd" />
ToTestPagination(NewAddedFeature)
<img width="1919" height="1011" alt="ToTestPagination(NewAddedFeature)" src="https://github.com/user-attachments/assets/2dd4f32d-0b8c-442c-8064-1efad16b5524" />
ToGetStoreFromUser
<img width="1919" height="1006" alt="ToGetStoreFromUser" src="https://github.com/user-attachments/assets/9c7d247c-c4b3-4680-8e00-0de91ea33e3d" />
ToSearchStoreByUser
<img width="1919" height="1005" alt="ToSearchStoreByUser" src="https://github.com/user-attachments/assets/1a528ea3-4b7c-44ef-87f5-362e6adf4d42" />
ToSubmitRatingByUser
<img width="1919" height="1006" alt="ToSubmitRatingByUser" src="https://github.com/user-attachments/assets/a7ed4917-d9d4-494f-b6a5-fbe0de3e5413" />
ToUpdateRating
<img width="1919" height="1003" alt="ToUpdateRating" src="https://github.com/user-attachments/assets/d34cea88-d892-4af7-8a17-319cdb57ffab" />
FinalToGetStoreWithRatingFromUser
<img width="1919" height="1004" alt="FinalToGetStoreWithRatingFromUser" src="https://github.com/user-attachments/assets/d47f3c38-3d2b-4e76-bf29-97bb17c9a7a2" />


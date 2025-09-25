Features:-
           * Single login system for all roles.
           * JWT -based authentication.
           * Role-based access control.

System Administrator:-
                    * Add new Users(Normal/Admin)
                    * Add new stores(Stores Owners with login credentials).
                    * Dashboard with:
                                   - Total users
                                   - Total stores
                                   - Total ratings
                    * View and filter users/stores.
                    * Delete users
                    *Logout


Normal User:-
            * Sign up and log in
            * Update password
            * View list of all stores
            * Search stores by name or address
            * Submit ratings(1-5)
            * Update submitted rating
            * Logout

Store Owner:-
            * Log in with credentials
            * Update Password
            * View users who rated their store
            * View average rating of their store
            * Logout


Setup instructions

 * clone Repository:-
                   - git clone <repo url>
                   - cd project-folder

 * Backend Setup:-
                - cd backend
                - npm install

    -create .env file inside backend:-
         - DB_HOST = localhost
         - DB_USER = root
         - DB_PASSWORD = Dkvd@123
         - DB_NAME = rating_app
         - JWT_SECRET = your_jwt_secret_key
         - PORT = 5000

 Start Backend:- npm run dev

 * Frontend Setup:-
       - cd frontend
       - npm install
       - npm run dev


* API Testing:-
      - Login: POST /auth/login
      - Signup: POST /auth/signup(Normal user only)
      - Add store: POST /admin/stores
      - Add User: POST /admin/users
      - Submit Rating: POST /user/ratings


* Database Schema:-
    - User table = 
        > id (PK)
        > name
        > email
        > password (hashed with bcrypt)
        > address
        > role (admin, normal, store_owner)

    - ratings Table =
        > id (PK)
        > user_id (FK - users)
        > store_id (FK - users, where role = store_owner)
        > rating (1-5)

* Developer:-
      - Dnyaneshwar Patil
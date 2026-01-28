### Snaphire - Simplified Hiring Platform (Backend)
Snaphire is a "Microservices-Ready Monolith" backend built with Spring Boot and PostgreSQL. It streamlines the connection between Recruiters and Candidates, featuring robust JWT-based security, role-based access control, and a clean architecture.

### Screenshots
<img width="1728" height="872" alt="Screenshot 2026-01-28 at 12 28 36 PM" src="https://github.com/user-attachments/assets/efce3ff4-8b20-4d98-ae87-a24d7e3cc9e2" />
<img width="1727" height="872" alt="Screenshot 2026-01-28 at 12 28 28 PM" src="https://github.com/user-attachments/assets/430f9729-a45d-4b3a-83b6-a612ba682f20" />
<img width="1728" height="866" alt="Screenshot 2026-01-28 at 12 27 45 PM" src="https://github.com/user-attachments/assets/a04ea1a0-a60a-4240-9b95-14168121606a" />
<img width="1727" height="870" alt="Screenshot 2026-01-28 at 12 27 37 PM" src="https://github.com/user-attachments/assets/d21be224-83fc-48b7-909d-24c56b90f2dc" />

### Screen-recordings



https://github.com/user-attachments/assets/219ac855-cec4-47f3-91c2-f49ed7c6c925


https://github.com/user-attachments/assets/2a1377e3-c592-4238-90ca-d210fd83ef26


### 🛠 Tech Stack
Java 17

Spring Boot 3.x (Web, Data JPA, Security)

PostgreSQL (Database)

JWT (JSON Web Tokens) (Stateless Authentication)

BCrypt (Password Encryption)

Swagger/OpenAPI (API Documentation)

### 📂 Project Structure & Classes
#### 1. Entities (Database Tables)
User: Represents platform users. Stores email, password (encrypted), role (RECRUITER/CANDIDATE).

Job: A job posting created by a Recruiter. Contains title, description, salary, etc.

Application: Links a User (Candidate) to a Job. Tracks when they applied.

#### 2. DTOs (Data Transfer Objects)
AuthRequest: Envelops login credentials (email, password) to keep the Controller clean.

AuthResponse: Carries the JWT token back to the user upon successful login.

#### 3. Repositories (Data Access)
UserRepository: Finds users by email (crucial for login/signup).

JobRepository: Standard CRUD for jobs.

ApplicationRepository: Custom methods to find applications by JobId (for Recruiters) or check for duplicates.

#### 4. Services (Business Logic)
UserServiceImpl: Handles signup. Crucially, it encrypts passwords using BCryptPasswordEncoder before saving.

JobServiceImpl: logic for creating and retrieving jobs.

ApplicationServiceImpl: Prevents duplicate applications and links Candidates to Jobs.

CustomUserDetailsService: Bridges our User entity with Spring Security, translating roles (e.g., RECRUITER → ROLE_RECRUITER).

#### 5. Security & Utilities (The JWT Core)
JwtUtil: The "Badge Maker." Generates signed JWTs and validates incoming tokens.

JwtFilter: The "Door Guard." Intercepts every request, extracts the token, and sets the user's authentication context.

SecurityConfig: The "Rule Book." Configures which endpoints are public (/auth/login, /users) and which are protected by role.

#### 6. Controllers (API Endpoints)
AuthController: Handles Login requests.

UserController: Handles Signup and user management.

JobController: CRUD operations for jobs.

ApplicationController: Handles applying for jobs and viewing applicants.

### 🔄 Project Workflows
#### 1. User Registration (Signup)
User sends POST /users with JSON data (email, password, role).

SecurityConfig allows this public endpoint.

UserService checks for duplicate emails.

PasswordEncoder encrypts the raw password (e.g., "pass123" → $2a$10$Xy...).

User is saved to the PostgreSQL database.

#### 2. Authentication (Login & Token Generation)
User sends POST /auth/login with email and password.

AuthController passes credentials to the AuthenticationManager.

Manager retrieves the user via CustomUserDetailsService and verifies the hash matches.

JwtUtil generates a JWT (Badge) signed with a secret key.

Server returns the token: { "token": "eyJhGci..." }.

#### 3. Authorization (The Access Control Flow)
Scenario: A Recruiter tries to post a job.

Recruiter sends POST /jobs with Header: Authorization: Bearer <TOKEN>.

JwtFilter intercepts the request:

Validates the token signature.

Extracts Role: ROLE_RECRUITER.

SecurityConfig checks the rule: requestMatchers(POST, "/jobs/**").hasRole("RECRUITER").

Access Granted: The request proceeds to JobController.

(Note: If a Candidate tried this, the filter would identify ROLE_CANDIDATE, and SecurityConfig would block it with 403 Forbidden.)

### 🚀 API Endpoints Summary
#### 🔓 Public
POST /auth/login - Authenticate & get Token.

POST /users - Create a new account (Sign up).

GET /swagger-ui.html - View API Documentation.

#### 🔒 Recruiter Only
POST /jobs - Create a new job.

DELETE /jobs/{id} - Remove a job.

GET /applications/job/{jobId} - View all applicants for a specific job.

🔒 Candidate Only
POST /applications/apply?userId=x&jobId=y - Apply for a job.

🔐 Authenticated (Both)
GET /jobs - View the job feed.

GET /jobs/{id} - View job details.

### ⚙️ How to Run
Database: Ensure PostgreSQL is running and a database named snaphire exists.

Config: Check application.properties for correct DB credentials.

Run: Start the application via IntelliJ or mvn spring-boot:run.

Docs: Open http://localhost:8080/swagger-ui.html to test APIs.

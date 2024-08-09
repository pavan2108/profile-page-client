
# Hackingly's Profile Page

This project is a Hackingly's Profile Page application built using Nextjs (React), Tailwind CSS, and TypeScript on the front end, and Express with MongoDB on the back end. This project is used to display user's profile information including User Information, Social Links, Experience, Achievements as shown in the below screenshot link.

[Sample Profile](https://github.com/user-attachments/assets/8de65efc-16fe-4148-8b2d-39aef5f63c0c)

## Design & Implementation Choices

1. Frontend - Nextjs (React), Tailwind CSS, Typescript

   - I have experience with the above frameworks / libraries
   - These are lightweight, easy to use and setup

2. Backend - Express.js (Node.js)

   - I have experience with the above framework
   - It is widely used framework
   - It is lightweight and easy to setup

3. Database - MongoDB (NoSQL)

   - Easy to use with Express.js framework
   - Matches with the use-case
   - Easy to deploy, has it's own cloud deployment service free of cost (250 mb limit per project)

4. Database Tables

   I used the below normalized tables to store users information, so that performing transactions (CRUD) would be easier

   - Certification
   - Experience
   - UserInfo
   - Project
   - Social

## Technical Approch

1. Create repositories for Client and Server in github.
2. Inside the client Application
   1. Create a base codebase using Nextjs template in the client codebase in local.
      ```
      npx create-next-app@latest
      ```
      1. Select react from the steps show in cli
      2. Select typescript template from the given options
      3. Install packages using ```npm install```
   2. Install and set up Tailwind CSS in the client application
   3. Create static frontend profile page with required functionalities (UserInfo, Expereience, Achivements) in the client application
3. Inside the server application
   1. Create a folder for backend
   2. Initiate node template using ```npm init -y```
   3. Install dependencies `express`, `cors`, `mongoose`, `dotenv` with the help of command ```npm install <package_name>```
   4. Setup HTTP server using Express package
   5. Create MongoDB server using MongoDB atlas 
   6. Add the server uri and port number to `.env` file
   7. Create models / database schemas for the fields respectively.
   8. Create api end points -> to get, update, delete the data.
   9. Add CORS middleware to express to enable frontend communicate with the backend.
4. Integrate the backend apis with the above created frontend page in client application (2.iii)
5. Add forms in the above frontend page for editing and displaying the data from backend api.


## How to Setup

### Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v16 or later)
- npm (v6 or later) or Yarn (v1.22 or later)

### Getting Started

1. **Clone the client repository:**
   ```bash
   git clone https://github.com/pavan2108/profile-page-client
   ```

2. **Clone the server repository:**
   ```bash
   git clone https://github.com/pavan2108/profile-page-server
   ```

3. **Install client dependencies and run the client:**
   ```bash
   cd profile-page-client
   npm install
   echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api" > .env
   npm run dev
   ```
   or
   ```bash
   cd profile-page-client
   yarn install
   echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api" > .env
   yarn dev
   ```
   This will start the development client on `http://localhost:5173`.

4. **Install Server dependencies and run the server:**
   ```bash
   cd profile-page-server
   npm install
   echo "PORT=8000" > .env
   echo "MONGODB_URL=<mongodb_url>" >> .env
   npm run start
   ```
   or
   ```bash
   cd profile-page-server
   yarn install
   echo "PORT=8000" > .env
   echo "MONGODB_URL=<mongodb_url>" >> .env
   yarn start
   ```
   This will start the development server on `http://localhost:8000`.


5. **Open the application:**
   Open your web browser and navigate to `http://localhost:5173`. Ensure you include a username in the query string, e.g., `http://localhost:5173/?name=yourname`. For Demo visit `https://profile-page-client.vercel.app/?name=pavan`


## Features

### Covered

- Resposivness
- User identification via URL query string
- Prompt for missing username
- Updating user socials
- Adding / Updating / Deleting User experience
- Adding / Updating / Deleting User Projects
- Adding / Updating / Deleting User hackathons
- Adding / Updating / Deleting User Certifications

### Not Covered

- User authentication
- Storage of users profile / banner images in backend (database)
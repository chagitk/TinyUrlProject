# TinyURL Project - URL Shortener Service

## 📜 Project Description

This project is a robust backend service for shortening long URLs, similar to services like Bitly or TinyURL. It provides a RESTful API to manage users, create custom short links, and track their usage statistics. This project was built to demonstrate proficiency in creating scalable and secure backend systems using Node.js and modern web technologies.


## ✨ Key Features

*   **User Registration:** Secure endpoint for new user registration with password hashing.
*   **URL Shortening:** Create short, unique aliases for any long URL.
*   **Full CRUD for Links:** Create, Read, Update, and Delete shortened links.
*   **Link Statistics:** Track analytics for each link.
*   **RESTful API:** A well-structured and documented API for easy integration.

## 🛠️ Technologies Used

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB with Mongoose ODM
*   **Authentication:** bcryptjs for password hashing
*   **Utilities:** `shortid` for unique string generation, `dotenv` for environment variable management.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js installed
*   MongoDB Atlas account (or a local MongoDB instance)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/chagitk/TinyUrlProject.git
    cd TinyUrlProject
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add the following environment variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:5000`.

## <caption> API Endpoints

The API is structured around users and links.

### User Routes

| Method | Endpoint      | Description        | Access |
| :----- | :------------ | :----------------- | :----- |
| `POST` | `/api/users`  | Register a new user| Public |

### Link Routes

| Method | Endpoint            | Description                      | Access    |
| :----- | :------------------ | :------------------------------- | :-------- |
| `GET`  | `/api/links`        | Get all links for the logged-in user | Private   |
| `POST` | `/api/links`        | Create a new short link          | Private   |
| `PUT`  | `/api/links/:id`    | Update an existing link          | Private   |
| `DELETE`| `/api/links/:id`  | Delete a link                    | Private   |
| `GET`  | `/api/links/:id/stats` | Get usage statistics for a link | Private   |
| `GET`  | `/:shortId`         | Redirect to the original URL     | Public    |

**(Note: Authentication middleware should be added to make routes private)**

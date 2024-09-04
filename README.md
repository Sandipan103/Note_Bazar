# Note_Bazar

**Note_Bazar** is a platform where students can buy and sell educational notes. It includes features like a rating and feedback system for notes, email authentication, and secure payment processing.

## Features

- **Buy and Sell Notes**: Students can upload their notes for sale or purchase notes uploaded by others.
- **Rating & Feedback**: Users can rate notes and leave feedback to help others decide on the quality of the notes.
- **Authentication**: Nodemailer is used to handle user authentication via email.
- **File Storage**: Cloudinary is used to store PDF files securely.
- **Payments**: Razorpay integration allows for secure and smooth transactions.
- **Modern UI**: The frontend is built with React and styled using Material UI, offering a clean and responsive user interface.

## Tech Stack

- **Frontend**: React, Material UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Storage**: Cloudinary
- **Payment Gateway**: Razorpay
- **Authentication**: Nodemailer

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB (either locally or via a service like MongoDB Atlas)
- Cloudinary account (for file storage)
- Razorpay account (for payments)

### Installation

1. **Fork the Repository**

   Click the "Fork" button at the top right of this repository to create your own fork.

2. **Clone the Repository**

   Clone the forked repository to your local machine using the following command:

   ```bash
   git clone https://github.com/Sandipan103/Note_Bazar.git
   cd note_hub

3. **Client Setup**
   1. Navigate to the client directory:
      ```bash
      cd client
   2. Install the dependencies:
      ```bash
      npm install
   3. Start the client development server:
      ```bash
      npm run dev
4.  **Server Setup**
   1. Navigate to the server directory:
      ```bash
      cd server
   2. Install the dependencies:
      ```bash
      npm install
   3. Start the server development server:
      ```bash
      npm run dev

5. **Environment Variables**
   Create a .env file in the server directory and add the following variables:
   ```bash
    PORT =
    DB_URL = 
    
    MAIL_HOST =
    MAIL_USER =
    MAIL_PASS =
    JWT_SECRET =
    
    CLOUD_NAME =
    API_KEY =
    API_SECRET =
    FOLDER_NAME =

**Contributing**
Feel free to contribute to this project by creating issues or pull requests. Please ensure you follow the project's coding style and guidelines.

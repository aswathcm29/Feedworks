# Feedworks

Feedworks is an open-source project that provides actionable insights via AI for feedback collected through surveys and forms. It analyzes data in XLSX and CSV formats, generating charts and analysis while segregating categories. The project also includes a chatbot for querying feedback data.

## Features

- Analysis of feedback data from XLSX and CSV files
- AI-driven insights and categorization
- Visual representations through charts
- Chatbot for querying feedback data
- Built with MERN stack (MongoDB, Express, React, Node.js)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/feedworks.git
   cd feedworks
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:

   For the backend, create a `.env` file in the backend directory with the following content:
   ```
   PORT=5000
   JWT_SECRET=mysecretkey
   MONGO_URI=your_mongodb_connection_string
   GROQ_KEY=your_groq_api_key
   ```
   Replace `your_mongodb_connection_string` and `your_groq_api_key` with your actual MongoDB connection string and Groq API key.

   For the frontend, create a `.env` file in the frontend directory with the following content:
   ```
   VITE_BASE_URL=http://localhost:5000/
   ```

### Creating a Groq API Key

To use the AI-powered features of Feedworks, you'll need a Groq API key. Here's how to obtain one:

1. Visit the [Groq console](https://console.groq.com/docs/quickstart) and sign up for an account if you haven't already.
2. After logging in, navigate to your account settings or API section.
3. Look for an option to create a new API key or view existing keys.
4. Generate a new API key and copy it securely.
5. Keep this key confidential and use it in the `.env` file as instructed above.

Alternatively, you can create your own API key by following similar steps on the Groq website. The process is straightforward and typically involves creating an account and generating an API key in your account settings.

4. Start the application:
   ```
   # In the backend directory
   npm start

   # In a new terminal, navigate to the frontend directory
   npm start
   ```

The application should now be running on `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

## Contributing

We welcome contributions to Feedworks! Please see our [Contributing Guide](CONTRIBUTING.md) for more details on how to get started.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

## Contact

For any questions or concerns, please open an issue on this repository or contact the maintainers directly.

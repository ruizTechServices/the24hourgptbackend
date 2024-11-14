# 24HourGPT Backend

## Description

Backend server for the 24HourGPT Chrome extension, integrating various language models (LLMs) and Pinecone for chatbot functionality.

## Features

- **Chatbot Integration:** Supports GPT-4, GPT-4o, Mistral, and Gemini models.
- **Embedding Storage:** Uses Pinecone to store and manage embeddings for user and bot messages.
- **Stateless Design:** Ensures all services are stateless, making them reusable and scalable.
- **Security:** Implements security best practices including rate limiting, secure HTTP headers, and input validation.
- **Logging:** Utilizes Morgan for HTTP request logging.
- **Environment Management:** Validates and manages environment variables using `dotenv`.

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/24HourGPT.git
   cd 24HourGPT/backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   OPENAI_API_KEY=your_openai_api_key
   MISTRAL_API_KEY=your_mistral_api_key
   GOOGLEAI_API_KEY=your_googleai_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   ```

4. **Start the Server:**

   ```bash
   npm start
   ```

   The server will be running on `http://localhost:3000`.

## API Endpoints

### LLM API

- **Endpoint:** `/llm/chatbot`
- **Method:** `POST`
- **Description:** Handles requests to different language models.
- **Request Body:**
  ```json
  {
    "userMessage": "Your message here",
    "model": "gpt-4" // or "gpt-4o", "mistral", "Gemini"
  }
  ```
- **Response:**
  ```json
  {
    "botResponse": "Response from the model"
  }
  ```

### Embeddings API

- **Endpoint:** `/embeddings`
- **Method:** `POST`
- **Description:** Creates embeddings for the provided text.
- **Request Body:**
  ```json
  {
    "inputText": "Text to create embedding for"
  }
  ```
- **Response:**
  ```json
  {
    "embedding": [/* embedding vector */]
  }
  ```

### Save Vector API

- **Endpoint:** `/save-vector`
- **Method:** `POST`
- **Description:** Saves the vector to the Pinecone database.
- **Request Body:**
  ```json
  {
    "text": "Text to create embedding for",
    "namespace": "Namespace for the vector",
    "customId": "Optional custom ID",
    "metadata": {
      "genre": "userMessage or botMessage",
      "category": "Category of the message"
    }
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "vectorId": "Generated or provided ID",
      "namespace": "Namespace",
      "metadata": {
        "genre": "userMessage or botMessage",
        "category": "Category"
      },
      "upsertResponse": {/* Pinecone response */}
    }
  }
  ```

## Contributing

Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

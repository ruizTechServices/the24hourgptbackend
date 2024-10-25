# 24HourGPT Backend

## Description

Backend server for the 24HourGPT Chrome extension, integrating OpenAI and Pinecone for chatbot functionality.

## Features

- **Chatbot Integration:** Supports GPT-4, GPT-4o, and Mistral models.
- **Embedding Storage:** Uses Pinecone to store and manage embeddings for user messages.
- **Security:** Implements security best practices including rate limiting, secure HTTP headers, and input validation.
- **Logging:** Utilizes Morgan for HTTP request logging.
- **Environment Management:** Validates and manages environment variables using `envalid`.

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/24HourGPT.git
   cd 24HourGPT/backend

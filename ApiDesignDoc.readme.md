### API Design Document

# KryptoniteApp API Design

## Base URL

`https://kryptonite-app-xmil.onrender.com`

## Endpoints

### User Registration and Authentication

#### Register a New User

- **Endpoint**: `POST /auth/register`
- **Description**: Registers a new user and sends a confirmation email which includes the api key.
- **Request Body**:
  ```json
  {
    "name": "username",
    "email": "user@example.com",
    "password": "yourpassword",
    "confirmPassword": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Registration successful. Please check your email for confirmation."
  }
  ```
  
#### Login and Request OTP

- **Endpoint**: `POST /auth/login`
- **Description**: Logs in the user and sends a 6-digit OTP to their email.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "OTP sent to your email."
  }
  ```

#### Submit OTP and Get Token

- **Endpoint**: `POST /auth/verify-otp`
- **Description**: Verifies the OTP and returns an authentication token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token"
  }
  ```

### File Upload

#### Upload Image

- **Endpoint**: `POST /files/upload`
- **Description**: Uploads an image file and saves as Base64 string.
- **Headers**:
  ```json
  {
    "x-api-key": "your_api_key"
  }
  ```
- **Request**: `multipart/form-data` with an image file.
- **Response**:
  ```json
  {
    "message": "File uploaded successfully."
  }
  ```

### Public Image Access

#### Get All Images

- **Endpoint**: `GET /files/images`
- **Description**: Retrieves all images.
- **Response**:
  ```json
  [
    {
      "_id": "image_id",
      "kryptonianId": "user_id",
      "data": "base64_image_string",
      "mimetype": "image/jpeg"
    },
  ]
  ```

#### Get Single Image

- **Endpoint**: `GET /files/images/:id`
- **Description**: Retrieves a single image by its ID.
- **Response**:
  ```json
  {
    "_id": "image_id",
    "kryptonianId": "user_id",
    "data": "base64_image_string",
    "mimetype": "image/jpeg"
  }
  ```

### API Key Management

#### Invalidate API Key

- **Endpoint**: `POST /auth/invalidateApiKey`
- **Description**: Invalidates an API key, making it unusable.
- **Request Body**:
  ```json
  {
    "apiKey": "your_api_key"
  }
  ```
- **Response**:
  ```json
  {
    "message": "API key invalidated successfully."
  }
  ```

---
# Kryptonite-App

## Overview

KryptoniteApp is an advanced authentication system developed for the relocated human civilization on planet Krypton in the year 3030. This system utilizes two-factor authentication (2FA) via email and supports the storage and retrieval of image files. The project is designed following RESTful API principles and uses class-based services and controllers.

## Background Story

In the year 3030, after the destruction of Earth, humans have relocated to Krypton and transformed into Kryptonians. Authentication systems have evolved to use voice and biometric details instead of traditional usernames and passwords. CelestialCode, led by Kamsi and Adaeze, in collaboration with Oluoma, is developing the first 2FA system on Krypton. This system will also store images and videos for training PlasmaAI, a future competitor to ChatGPT.

## Features

1. **Kryptonian Registration and Authentication**:
   - User registration with email confirmation.
   - 2FA login using OTP.
   - OTP storage using in-memory cache, Redis, or database.

2. **File Upload Service**:
   - API key generation for Kryptonians.
   - File upload functionality associated with the API key.
   - Only image files are allowed, stored as Base64 strings.
   - Files are deleted from the system after being stored in the database.

3. **Access Control**:
   - Endpoints for uploading images authenticated with an API key.
   - Public access to images for Supergirl (Kara Zor-El) without authentication.

## Requirements

1. **File Uploads**:
   - All users must have API keys.
   - Files can be uploaded using the API key without an auth token.
   - Only image files are allowed and stored as Base64 strings.

2. **API Design**:
   - Follow RESTful API principles.
   - Implement class-based services and controllers.

3. **Accessing Images**:
   - Public endpoints to access all images or a single image.

4. **API Key Design**:
   - Ability to invalidate an API key.
   - API keys are issued once and never shown again.

## Endpoints

### Authentication

- **Register**: `POST /auth/register`
  - Request Body: 
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
- **Confirm Email**: `POST /auth/confirm`
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "code": "123456"
    }
    ```
- **Login**: `POST /auth/login`
  - Request Body:
    ```json
    {
      "email": "user@example.com"
    }
    ```
- **Verify OTP**: `POST /auth/verify-otp`
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "otp": "123456"
    }
    ```

### File Uploads

- **Upload Image**: `POST /files/upload`
  - Headers: `api-key: your_api_key`
  - Form-Data: 
    - Key: `image`, Type: `File`, Value: (select an image file)
- **Get All Images**: `GET /files/`
- **Get Single Image**: `GET /files/:id`

## Setup

### Prerequisites

- Node.js
- MongoDB
- Redis
- ElasticEmail API key
- nodemailer
- handlebars
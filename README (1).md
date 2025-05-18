# Notification Service - Multi-Vendor Platform

The **Notification Service** handles all communication-related functionalities within the Multi-Vendor Platform. It ensures users and sellers are notified of important events such as order confirmations and updates via email.

---

## Features

- **Email Notifications**:
  - Sends order confirmation and status update emails to users and sellers.
  - Supports bulk and individual email sending.

- **Extensibility**:
  - Designed to support future SMS and push notification integration.

- **Event-Driven Communication**:
  - Subscribes to RabbitMQ queues to process notification events from other services.

---

## Technology Stack

- **Node.js**: Runtime environment.
- **Express.js**: Framework for API creation.
- **Nodemailer**: Email service for sending notifications.
- **RabbitMQ**: Message broker for inter-service communication.

---

## API Endpoints

1. **Send Email**
   - **Endpoint**: `POST /send-email`
   - **Description**: Sends an email notification.
   - **Request Body**:
     ```json
     {
       "to": "user@example.com",
       "subject": "Order Confirmation",
       "message": "<p>Your order has been confirmed!</p>"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "messageId": "email-message-id"
     }
     ```

---

## Setup and Installation

### Prerequisites

- **Node.js**: >=16.x
- **npm** or **yarn**
- **RabbitMQ**: For message queues.
- **Email Credentials**: Gmail account credentials for Nodemailer.

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/AWESOME04/Notification-Service.git
   cd Notification-Service
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - RabbitMQ URL.
   - Gmail credentials (`GMAIL_USER` and `GMAIL_APP_PASSWORD`).
4. Start the server:
   ```bash
   node index.js
   ```
   The service will run on `http://localhost:5003`.

---

## Deployment

- **Hosting**: Deployed on Render.
- **Message Queue**: RabbitMQ via CloudAMQP.

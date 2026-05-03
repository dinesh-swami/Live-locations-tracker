# 🌍 Live Location Tracker

A real-time location tracking application built with Express.js, Socket.io, and Kafka. Track and monitor locations in real-time with persistent data storage using MongoDB.

---

## ✨ Features

- **Real-Time Location Updates** - Live location tracking using Socket.io
- **Secure Authentication** - JWT-based authentication system
- **Data Streaming** - Apache Kafka for reliable message processing
- **Location History** - Persistent storage of location logs
- **RESTful API** - Easy-to-use API endpoints
- **Responsive UI** - Clean and intuitive web interface
- **Docker Support** - Containerized deployment with Docker Compose

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **Socket.io** | Real-time bi-directional communication |
| **Kafka** | Message streaming & event processing |
| **MongoDB** | Database for location history |
| **Mongoose** | MongoDB object modeling |
| **JWT** | Authentication & authorization |
| **Docker** | Container orchestration |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- MongoDB
- Apache Kafka
- Docker & Docker Compose (optional)
- pnpm (package manager)

---

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Live-location-tracker
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/location-tracker
JWT_SECRET=your-secret-key
KAFKA_BROKERS=localhost:9092
NODE_ENV=development
```

### 4. Start Services with Docker Compose
```bash
docker-compose up -d
```

### 5. Run the Application
```bash
# Development mode with auto-reload
pnpm run dev

# Production mode
node index.js
```

---

## 🚀 Usage

### Health Check
```bash
curl http://localhost:8000/health
```

### Authentication
```bash
POST /authenticate
Content-Type: application/json

{
  "code": "authorization-code",
  "nonce": "nonce-value"
}
```

### Real-Time Location Tracking
The application uses Socket.io for real-time location updates. Connect to the server and listen for location events.

---

## 📁 Project Structure

```
Live-location-tracker/
├── index.js                      # Main application entry point
├── socket.js                     # Socket.io configuration
├── db.js                         # MongoDB connection
├── kafka-client.js               # Kafka producer
├── kafka-admin.js                # Kafka administration
├── location-history-consumer.js  # Kafka consumer for location data
├── config.yml                    # Application configuration
├── docker-compose.yml            # Docker services configuration
├── package.json                  # Dependencies
│
├── models/
│   └── location-log.js           # MongoDB location log schema
│
└── public/
    ├── index.html                # Main page
    ├── login.html                # Login page
    └── callback.html             # OAuth callback page
```

---

## 🔄 Architecture Overview

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ Socket.io
       ▼
┌─────────────────────┐
│   Express Server    │
│   (Port 8000)       │
└────┬─────────────┬──┘
     │             │
     ▼             ▼
┌─────────────┐ ┌──────────────┐
│  MongoDB    │ │    Kafka     │
│ (Location   │ │  (Message    │
│  History)   │ │  Streaming)  │
└─────────────┘ └──────────────┘
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |
| POST | `/authenticate` | User authentication |

---

## 🗄️ Database Schema

### Location Log
```javascript
{
  _id: ObjectId,
  userId: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date,
  accuracy: Number,
  // ... other tracking fields
}
```

---

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication:

1. User provides authorization code
2. Server validates and issues JWT
3. JWT is used for subsequent requests
4. Socket.io connections are authenticated via tokens

---

## 📦 Docker Deployment

### Start All Services
```bash
docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f
```

### Stop Services
```bash
docker-compose down
```

---

## 🚨 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/tracker` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key` |
| `KAFKA_BROKERS` | Kafka broker addresses | `localhost:9092` |
| `NODE_ENV` | Environment mode | `development` |

---

## 🔧 Available Scripts

```bash
# Development with auto-reload
pnpm run dev

# Start production server
node index.js

# Install dependencies
pnpm install
```

---

## 📊 Data Flow

1. **Location Submission** - Client sends location via Socket.io
2. **Processing** - Server receives and validates location data
3. **Kafka Publishing** - Location event published to Kafka topic
4. **Storage** - Location history consumer writes to MongoDB
5. **Broadcasting** - Real-time updates sent to all connected clients

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running on your system
- Verify `MONGODB_URI` in `.env` file

### Kafka Connection Issues
- Check if Kafka broker is running
- Verify `KAFKA_BROKERS` configuration
- Check Kafka admin client logs

### Socket.io Connection Problems
- Ensure CORS is properly configured
- Check browser console for connection errors
- Verify server is running on correct port

---

## 📝 Environment Setup Guide

### Local Development
1. Install MongoDB locally or use MongoDB Atlas
2. Set up local Kafka or use Docker
3. Create `.env` with local connections
4. Run `pnpm install` and `pnpm run dev`

### Docker Setup
1. Ensure Docker & Docker Compose are installed
2. Run `docker-compose up -d`
3. Application starts automatically

---

## 🔄 Kafka Topics

The application uses Kafka for event streaming:

- **location-events** - Real-time location data
- **location-history** - Historical location records

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📄 License

This project is licensed under the ISC License.

---

## 🆘 Support

For issues and questions:

- Check the troubleshooting section
- Review server logs with `docker-compose logs`
- Verify all environment variables are set correctly

---

## 🎯 Future Enhancements

- [ ] Advanced location filtering
- [ ] Geofencing capabilities
- [ ] Analytics dashboard
- [ ] Mobile app support
- [ ] Route optimization
- [ ] Performance metrics

---

**Last Updated:** May 2026

Made with ❤️ for real-time location tracking

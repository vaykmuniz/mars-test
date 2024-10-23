# 🚀 Mars Rover Project

Welcome to the **Mars Rover Project**! This project aims to simulate a Mars rover's operations using a modern tech stack, including **TypeScript** for enhanced code quality. Explore the vast Martian landscape and gather data as our rover navigates the terrain!

![image](https://github.com/user-attachments/assets/18f4f16e-7c84-4c2a-a501-d4ed3271cdc6)

## 🌐 Frontend

The frontend is built using:

- **Vue 3** 🌟: A progressive JavaScript framework for building user interfaces.
- **Vue Query** 🔍: For data fetching and synchronization.
- **Vue Router** 🛣️: For managing navigation and routes.
- **Axios** 🌐: To make HTTP requests.
- **Font Awesome** ⭐: For adding scalable vector icons and social logos.

## 🛠️ Backend

The backend is developed using:

- **Node.js** 🟩: A JavaScript runtime built on Chrome's V8 engine, enabling server-side programming.
- **Express** ⚙️: A minimal and flexible Node.js web application framework.
- **Prisma** 🗄️: An ORM for Node.js, providing a seamless database interaction.
- **MySQL** 🐬: The relational database management system to store our rover's data.

## 📦 Requirements + Installation

You will need Docker and Docker Compose, and here are some links to help you:

- 📄 [Docker installation on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- 🛠️ [Step-by-step tutorial for installing Docker and Docker Compose on Ubuntu](https://medium.com/@tomer.klein/step-by-step-tutorial-installing-docker-and-docker-compose-on-ubuntu-a98a1b7aaed0)

💡 Tip: Before starting, you might want to clean up old containers and images using `docker system prune` and shut down any running containers with `docker-compose down`. This will give you a fresh start!

To get started with the project, follow these steps:

1. **Clone the repository + Run Docker**
   ```bash
   git clone https://github.com/vaykmuniz/mars-test.git
   cd ./mars-test
   docker-compose up --build

2. **Wait install + build, then check `http://localhost:8080/`**

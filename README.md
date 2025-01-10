# Social Media Engagement Analytics Platform

## 🚀 Live Demo
[Click here to explore the live platform](https://socialmetric.onrender.com/)

---

## 📖 About the Project
This platform analyzes engagement data from social media posts to provide insights into their performance. It processes data such as likes, comments, and shares to deliver actionable insights on which post types perform best.

### What It Does
- **Analyze Engagement**: Calculates average engagement metrics (likes, comments, shares) for each post type (e.g., reels, static images, carousels).
- **Generate Insights**: Utilizes LangFlow and Gemini API to generate meaningful text insights like:
  - *"Reels generate 30% more likes compared to carousels."*
  - *"Static posts receive the fewest comments on average."*
- **Interactive Dashboard**: Visualize data and insights on a user-friendly interface.

---

## 🛠️ How It Works
1. **Frontend**: Built with **React Vite** and styled using **ShadCN** for a polished UI.
2. **Backend**: Powered by **Node.js**, the backend connects the frontend to the analytics engine and database.
3. **RAG Model**: Uses **LangFlow** for building the Retrieval-Augmented Generation (RAG) model to enhance text generation with contextual data.
4. **Gemini API**: Generates human-like text insights from engagement data.
5. **Deployment**: Hosted on **Render** for seamless live access.

---

## 🧰 Tech Stack
### **Frontend**
- **React Vite**: Fast and modern web development framework.
- **ShadCN**: Component library for beautiful, consistent UI.

### **Backend**
- **Node.js**: Backend server handling requests and API logic.

### **AI and Workflow**
- **LangFlow**: Workflow creation for the RAG model.
- **Gemini API**: Natural language generation for insights.

### **Database**
- **DataStax Astra DB**: Stores engagement data and enables vector-based queries.

### **Hosting**
- **Render**: Cloud hosting for both frontend and backend.

---

## 🖼️ Screenshots
> Add screenshots below showcasing the platform's UI, dashboard, and insights.


![Langflow Screenshot](https://i.ibb.co/mqqrrt4/Screenshot-2025-01-10-133337.png)

![Dashboard Screenshot](https://i.ibb.co/CQMdtP2/Screenshot-2025-01-10-133907.png)

![Insights Screenshot](https://i.ibb.co/jr4HWbv/Screenshot-2025-01-10-134152.png)

## 📂 Project Setup
### Prerequisites
- Node.js installed
- DataStax Astra DB setup
- Gemini API key
- LangFlow workflow file

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/harshit6239/supermind-hackathon-assignment.git
   cd supermind-hackathon-assignment

2. Use langflow for rag model. import the rag_model.json file from server/model into langflow and generate api key for langflow inorder to use it's api
   
3. Create .env file from .env.example:

4. Run the server:
   ```bash
   cd server && npm start

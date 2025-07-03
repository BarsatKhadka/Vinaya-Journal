# Running It Locally

## 1. Clone the Repository

```
git clone https://github.com/BarsatKhadka/Vinaya-Journal.git
```

## 2. Frontend Setup

Make sure you have **Node.js** installed on your computer.

```
cd Vinaya-Journal
cd desktop
npm install
npm run dev
```

> ⚠️ You may encounter an error because the full app is not yet set up. Don’t worry — continue with the next steps.

## 3. Backend Setup (Spring Boot)

Open a **new terminal** in your editor and navigate to the backend:

```
cd backend
cd app
```

Ensure **Java** and **Maven** are installed on your system.

Then run:

```
./mvnw install
./mvnw spring-boot:run
```

## 4. AI Service Setup (Python & Ollama)

Make sure you have:

- **Python** installed  
- **Ollama** installed and a model pulled (follow [Ollama's installation guide](https://ollama.com/))

### Steps:
In a new terminal 
```
cd ai
```

Create a **virtual environment**:

**For Mac/Linux:**
```
python3 -m venv venv
source venv/bin/activate
```

**For Windows:**
```
python -m venv venv
venv\Scripts\activate
```

Install the dependencies:

```
pip install -r requirements.txt
```

Run the AI server:

```
uvicorn main:app --reload
```

## 5. Final Step

Go to your app and press:

```
Ctrl + R
```

to refresh — and you can start using the app!

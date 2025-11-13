const API_URL = 
       process.env.NODE_ENV === "production" 
       ? "https://notes-keeper-app-backend-7cxe.onrender.com" 
       : "http://localhost:5000"

export default API_URL

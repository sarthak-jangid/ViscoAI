🚀 ViscoAI — AI Resume Analyzer & Career Booster

ViscoAI is a full-stack AI-powered SaaS platform that analyzes resumes and provides intelligent career insights. It helps users improve their resumes by generating skill analysis, ATS-style scoring, keyword optimization, and personalized suggestions using AI.

It also includes authentication, subscription plans, and Razorpay payment integration to unlock premium AI features.

🌐 Live Demo
[https://your-vercel-domain.vercel.app](https://viscoaifrontend.vercel.app/)

✨ Key Features

🧠 AI Resume Analysis
• Skill Analysis resume scoring
• ATS-Style Scoring
• Missing Skill Detection
• Smart Improvement Suggestions
• Keyword Optimization for Job Matchingstyle resume scoring

📊 Smart Insights
• Resume strength breakdown
• Category-wise analysis (skills, experience, formatting)
• High-priority improvement suggestions
• Career readiness evaluation

💳 Subscription System (Razorpay)
• EnhancedFree tier with limited AI analysis
• EnhancedPremium plans (monthly / yearly)
• EnhancedSecure Razorpay payment gateway integration
• EnhancedSubscription-based access control

🔐 Authentication System
• Secure login/signup
• Cookie-based authentication
• Protected routes for premium users

⚡ Full-Stack SaaS Architecture
• Scalable backend with Node.js + Express
• MongoDB database integration
• REST API architecture
• Frontend built with React + Vite

<!-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> -->

🧱 Tech Stack

🎨 Frontend
• React 19
• TypeScript
• Vite
• Tailwind CSS
• React Router DOM
• Axios
• React Hot Toast
• Lucide Icons
• jsPDF (resume export feature)

⚙️ Backend
• Node.js
• Express.js
• TypeScript
• MongoDB + Mongoose
• JWT Authentication
• Cookie Parser
• CORS

🤖 AI Engine
• Google Generative AI (@google/genai)
• Prompt-based resume analysis system
• Structured AI response formatting

💰 Payments
• Razorpay Payment Gateway (Test + Live mode ready)

📁 Project Structure
ViscoAI/
│
├── client/ # Frontend (React + Vite)
├── server/ # Backend (Node + Express + AI)

🔐 Environment Variables
• Server .env
• PORT=5000
• MONGO_URI=your_mongodb_url
• JWT_SECRET=your_secret
• FRONTEND_URL=http://localhost:5173
• VITE_SERVER_URL=http://localhost:5000

• GOOGLE_CLIENT_ID=your_google_id
• GOOGLE_SECRET=google_secret
• GOOGLE_GEMINI_API_KEY=google_api_key

• RAZORPAY_KEY=your_key
• AZORPAY_KEY_SECRET=your_secret

💳 Subscription Flow
• User uploads/analyzes resume
• Free limit is checked
• If limit exceeded → redirect to payment
• Razorpay checkout opens
• Payment verification on backend
• Subscription activated in database
• Premium AI features unlocked

🧠 AI Working Logic
• User sends resume data
• Backend sends structured prompt to AI model
• AI returns:
• Score (0–100)
• Missing skills
• Suggestions
• Keyword improvements
• Backend formats and sends response to frontend

🚀 Deployment
• Frontend -> Vercel
• Backend -> Render
• Database -> MongoDB Atlas

📌 Future Improvements (V2 Plan)
• PDF resume upload + parsing
• Advanced ATS scoring engine
• Email report generation
• Multi-language support
• AI career roadmap generator
• Better analytics dashboard

👨‍💻 Author
• Sarthak Jangid

Full Stack Developer (MERN + AI SaaS)
Passionate about AI + scalable web apps

⭐ Show Your Support
• If you like this project:

⭐ Star the repository
🍴 Fork it
🚀 Share it with others

If you want, I can also help you next with:

👉
GitHub profile optimization (so recruiters get impressed instantly)
👉
README badges (build status, tech stack icons, live demo buttons)
👉
“Resume-ready project description” for LinkedIn
👉
V2 roadmap planning like a real SaaS startup

Just tell 👍
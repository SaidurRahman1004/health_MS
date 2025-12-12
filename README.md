# 🏥 HealthCheck Pro - স্বাস্থ্য পরীক্ষা করুন বাংলায় (Health Management System)

<div align="center">



**একটি সম্পূর্ণ বাংলা স্বাস্থ্য ব্যবস্থাপনা ওয়েব অ্যাপ্লিকেশন**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=flat-square)](https://healthcheck-pro-bd.netlify.app)
[![Backend API](https://img.shields.io/badge/Backend-API-informational?style=flat-square)](https://healthcheck-backend-9pai.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[🌐 Live Demo](https://healthcheck-pro-bd.netlify.app) • [📖 Documentation](#-features) • [🚀 Getting Started](#-installation)

</div>

---

## 📋 সূচিপত্র

- [পরিচিতি](#-পরিচিতি)
- [বৈশিষ্ট্যসমূহ](#-বৈশিষ্ট্যসমূহ)
- [প্রযুক্তি স্ট্যাক](#-প্রযুক্তি-স্ট্যাক)
- [স্ক্রিনশট](#-স্ক্রিনশট)
- [ইনস্টলেশন](#-ইনস্টলেশন)
- [ব্যবহারবিধি](#-ব্যবহারবিধি)
- [API ডকুমেন্টেশন](#-api-ডকুমেন্টেশন)
- [ডাটাবেস স্ট্রাকচার](#-ডাটাবেস-স্ট্রাকচার)
- [ডিপ্লয়মেন্ট](#-ডিপ্লয়মেন্ট)
- [ভবিষ্যৎ পরিকল্পনা](#-ভবিষ্যৎ-পরিকল্পনা)
- [অবদানকারী](#-অবদানকারী)
- [লাইসেন্স](#-লাইসেন্স)

---

## 🎯 পরিচিতি

**HealthCheck Pro** একটি আধুনিক, সম্পূর্ণ বাংলা ভাষায় তৈরি স্বাস্থ্য ব্যবস্থাপনা সিস্টেম। এই প্ল্যাটফর্মে ইউজাররা তাদের লক্ষণ দিয়ে সম্ভাব্য রোগ নির্ণয়, BMI হিসাব, স্বাস্থ্য টিপস, হাসপাতাল তথ্য এবং প্রাথমিক চিকিৎসা সম্পর্কে জানতে পারবেন।

### 🌟 কেন HealthCheck Pro? 

- ✅ **সম্পূর্ণ বাংলা ইন্টারফেস** - কোনো ভাষার বাধা নেই
- ✅ **বিনামূল্যে ব্যবহার** - কোনো খরচ নেই
- ✅ **24/7 উপলব্ধ** - যেকোনো সময় access করুন
- ✅ **মোবাইল ফ্রেন্ডলি** - যেকোনো ডিভাইস থেকে ব্যবহার করুন
- ✅ **নিরাপদ** - JWT authentication সহ secure system

---

## ✨ বৈশিষ্ট্যসমূহ

### 🩺 Symptom Checker (লক্ষণ পরীক্ষক)
- 40+ লক্ষণ ডাটাবেজ
- Auto-suggestion symptom search
- ঝুঁকি মাত্রা নির্ধারণ (High/Medium/Low)
- ডাক্তারের পরামর্শ ও সুপারিশ
- বিস্তারিত স্বাস্থ্য টিপস

### 📊 BMI Calculator (বিএমআই ক্যালকুলেটর)
- ফিট ও ইঞ্চি সাপোর্ট
- সেন্টিমিটার সাপোর্ট
- রঙিন risk level indicator
- স্বাস্থ্য পরামর্শ
- Interactive UI

### 📰 Health Articles (স্বাস্থ্য টিপস)
- দৈনন্দিন স্বাস্থ্য পরামর্শ
- বিভিন্ন রোগ সম্পর্কে তথ্য
- প্রতিরোধমূলক ব্যবস্থা

### 🏥 Hospital Listings (হাসপাতাল তালিকা)
- 12+ হাসপাতাল তথ্য
- ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, সিলেট সহ বিভিন্ন জেলা
- যোগাযোগ নম্বর
- সেবা তালিকা

### 🚑 First Aid Guide (প্রাথমিক চিকিৎসা)
- জরুরি পরিস্থিতিতে প্রাথমিক চিকিৎসা
- ধাপে ধাপে নির্দেশনা
- সচিত্র ব্যাখ্যা

### 👤 User Management (ইউজার ব্যবস্থাপনা)
- নিরাপদ রেজিস্ট্রেশন ও লগইন
- JWT authentication
- Password encryption
- User profile management

### 📜 Checkup History (চেকআপ ইতিহাস)
- সব চেকআপ রেকর্ড সংরক্ষণ
- তারিখ অনুযায়ী সাজানো
- বিস্তারিত ফলাফল দেখা

---

## 🛠️ প্রযুক্তি স্ট্যাক

### Frontend
```
⚛️  React.js v18+          - UI Library
🎨  React Bootstrap        - UI Components
🌐  Axios                  - HTTP Client
🚦  React Router v6        - Routing
🎭  React Icons            - Icon Library
💾  LocalStorage           - Data Persistence
```

### Backend
```
🟢  Node.js v14+           - Runtime Environment
⚡  Express.js v4+         - Web Framework
🍃  MongoDB                - NoSQL Database
🔐  JWT (jsonwebtoken)    - Authentication
🔒  bcryptjs               - Password Hashing
🌍  CORS                   - Cross-Origin Resource Sharing
🔧  dotenv                 - Environment Variables
```

### Deployment
```
🚀  Netlify                - Frontend Hosting
🌐  Render. com             - Backend Hosting
☁️   MongoDB Atlas          - Database Hosting
```

---

## 📸 স্ক্রিনশট

### 🏠 Homepage
```
Beautiful landing page with feature cards and gradient design
```

### 🩺 Symptom Checker
```
![alt text](image-4.png)
Interactive symptom selection with real-time suggestions
Results with risk levels, advice, and doctor recommendations
```

### 📊 BMI Calculator
```
![alt text](image-3.png)
Dual input mode (Feet/Inches & Centimeters)
Visual BMI indicator with color-coded results
```

### 📱 Mobile View
```
![alt text](image-5.png)
Fully responsive design
Touch-friendly interface
```

---

## 📦 ইনস্টলেশন

### Prerequisites (পূর্বশর্ত)

আপনার কম্পিউটারে এগুলো ইনস্টল থাকতে হবে: 

```bash
Node.js (v14 বা তার উপরে)
MongoDB (Local বা Atlas)
npm বা yarn
Git
```

### 🔧 Backend Setup

1. **Repository Clone করুন**
```bash
git clone https://github.com/SaidurRahman1004/health_MS.git
cd health_MS/backend
```

2. **Dependencies Install করুন**
```bash
npm install
```

3. **Environment Variables সেটআপ করুন**

`backend/.env` ফাইল তৈরি করুন:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/healthcheck?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

4. **Database Seed করুন**
```bash
npm run seed
```

5. **Server চালু করুন**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Backend চলবে:  `http://localhost:5000`

---

### 🎨 Frontend Setup

1. **Frontend Directory তে যান**
```bash
cd ../frontend
```

2. **Dependencies Install করুন**
```bash
npm install
```

3. **Environment Variables সেটআপ করুন**

`frontend/.env` ফাইল তৈরি করুন:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Application চালু করুন**
```bash
npm start
```

Frontend চলবে: `http://localhost:3000`

---

## 🎮 ব্যবহারবিধি

### Step 1: রেজিস্ট্রেশন
1. Homepage এ যান
2. **Register** button click করুন
3. নাম, ইমেইল, পাসওয়ার্ড দিন
4. **রেজিস্টার করুন** click করুন

### Step 2: লগইন
1. **Login** page এ যান
2. ইমেইল ও পাসওয়ার্ড দিন
3. **লগইন করুন** click করুন

### Step 3:  Symptom Check
1. **সিম্পটম চেকার** page এ যান
2. Search box এ লক্ষণ টাইপ করুন (যেমন: জ্বর)
3. Suggestion থেকে select করুন
4. 3-5টি লক্ষণ যোগ করুন
5. **পরীক্ষা শুরু করুন** click করুন
6. Result দেখুন

### Step 4: BMI হিসাব
1. **BMI ক্যালকুলেটর** page এ যান
2. উচ্চতা ও ওজন দিন
3. **হিসাব করুন** click করুন
4. আপনার BMI ও স্বাস্থ্য স্ট্যাটাস দেখুন

### Step 5: History দেখুন
1. **History** page এ যান
2. আগের সব checkup দেখুন

---

## 🔌 API ডকুমেন্টেশন

### Base URL
```
Production: https://healthcheck-backend-9pai.onrender.com/api
Development: http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 25,
  "gender": "male"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:  {
  "token": "jwt_token_here",
  "user": { ... user_data }
}
```

### Symptom Endpoints

#### Get All Symptoms
```http
GET /api/symptoms
```

#### Check Symptoms
```http
POST /api/symptoms/check
Authorization: Bearer {token}
Content-Type: application/json

{
  "symptom_ids": ["SYM001", "SYM002", "SYM003"],
  "user_id": "user_id_here"
}

Response: {
  "overall_risk": "Medium",
  "total_symptoms": 3,
  "results": [ ... diagnosis_results ],
  "message": "চেকআপ সম্পন্ন হয়েছে"
}
```

### Other Endpoints

```http
GET /api/categories          # Get all categories
GET /api/articles            # Get all articles
GET /api/hospitals           # Get all hospitals
GET /api/firstaid            # Get first aid tips
GET /api/history             # Get user's checkup history (requires auth)
```

---

## 🗄️ ডাটাবেস স্ট্রাকচার

### Collections (9টি)

#### 1. Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  age: Number,
  gender: String,
  createdAt: Date
}
```

#### 2. Symptoms
```javascript
{
  symptom_id: String (unique),
  symptom:  String,
  category_id: String,
  description: String
}
```

#### 3. Categories
```javascript
{
  category_id: String (unique),
  name: String,
  description: String
}
```

#### 4.  Mappings
```javascript
{
  symptom_id: String,
  category_id: String,
  risk_level: String (High/Medium/Low),
  advice_bangla: String,
  recommended_doctor: String
}
```

#### 5. Doctors
```javascript
{
  doctor_id: String,
  doctor_bangla: String,
  category_id: String,
  specialization: String
}
```

#### 6. Hospitals
```javascript
{
  hospital_id: String,
  name_bangla: String,
  location: String,
  contact:  String,
  services: [String]
}
```

#### 7. Articles
```javascript
{
  title: String,
  content: String,
  createdAt: Date
}
```

#### 8. FirstAid
```javascript
{
  title: String,
  steps: [String],
  createdAt: Date
}
```

#### 9. CheckupHistory
```javascript
{
  user_id: ObjectId,
  symptoms: [String],
  results: [Object],
  date: Date
}
```

---

## 🚀 ডিপ্লয়মেন্ট

### Frontend Deployment (Netlify)

1. **Build তৈরি করুন**
```bash
cd frontend
npm run build
```

2. **Netlify এ Upload**
- Netlify Dashboard এ যান
- Drag & drop `build` folder

3. **Environment Variables**
```
REACT_APP_API_URL = https://healthcheck-backend-9pai.onrender.com/api
```

---

### Backend Deployment (Render. com)

1. **Render Dashboard এ যান**
2. **New Web Service** তৈরি করুন
3. **GitHub Repository** connect করুন
4. **Settings**: 
```
Root Directory: backend
Build Command: npm install
Start Command: npm start
Environment Variables: 
  - MONGO_URI
  - JWT_SECRET
  - NODE_ENV=production
```

5. **Deploy** করুন

---

## 🔮 ভবিষ্যৎ পরিকল্পনা

### Version 2.0 Features

- [ ] 🤖 **AI/ML Integration** - আরও accurate diagnosis
- [ ] 📱 **Mobile App** - React Native দিয়ে Android/iOS app
- [ ] 🌍 **Multi-language Support** - English, Hindi
- [ ] 📞 **Telemedicine** - Real-time video consultation
- [ ] 💊 **Medicine Reminder** - Push notification
- [ ] 📈 **Health Tracking** - Weight, BP, sugar monitoring
- [ ] 🏃 **Exercise Tracker** - Fitness integration
- [ ] 🍎 **Diet Planner** - Personalized meal plans
- [ ] 📊 **Reports & Analytics** - Detailed health reports
- [ ] 🔔 **Push Notifications** - Health reminders
- [ ] 💬 **Chat Support** - Live chat with doctors
- [ ] 🏆 **Gamification** - Health challenges & rewards

---

## 👥 অবদানকারী

এই প্রজেক্টটি নিম্নলিখিত ডেভেলপারদের সম্মিলিত প্রচেষ্টায় তৈরি: 

<table>
  <tr>
    <td align="center">
     
      <sub><b>Md. Sifat Hossan</b></sub><br />
      <sub>Frontend Developer</sub>
    </td>
    <td align="center">
    
      <sub><b>Hemonta Debnath Tonmoy</b></sub><br />
      <sub>Backend Developer & Database Designer</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
    
      <sub><b>Md. Rifat Hasan</b></sub><br />
      <sub>Content Writer </sub>
    </td>
    <td align="center">

      <sub><b>MD Sabbir Ahmad</b></sub><br />
      <sub>UI/UX Designer</sub>
    </td>
    <td align="center">
      <sub><b>Md Imran Hossain</b></sub><br />
      <sub>QA Tester</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <sub><b>Md Mahim Hossen</b></sub><br />
      <sub>Content Writer</sub>
    </td>
    <td align="center">
      <sub><b>Md Shams al Siam</b></sub><br />
      <sub>Documentation</sub>
    </td>
        <td align="center">
        <sub><b>Md. Saidur Rahman</b></sub>
      </a><br />
      <sub>Full Stack Developer</sub>
    </td>
    <td></td>
  </tr>
</table>

---


## ⚠️ সতর্কতা (Disclaimer)

এই অ্যাপ্লিকেশনটি **শুধুমাত্র শিক্ষামূলক এবং তথ্যমূলক উদ্দেশ্যে** তৈরি করা হয়েছে। এটি কোনো পেশাদার চিকিৎসা পরামর্শ, নির্ণয় বা চিকিৎসার বিকল্প নয়। 

**গুরুত্বপূর্ণ নোট:**
- ✅ সব সময় **লাইসেন্সপ্রাপ্ত চিকিৎসকের** পরামর্শ নিন
- ✅ জরুরি অবস্থায় **নিকটস্থ হাসপাতালে** যান
- ✅ এই সিস্টেমের পরামর্শ **শেষ কথা নয়**
- ✅ নিজে নিজে ওষুধ খাবেন না

---

## 📄 লাইসেন্স

এই প্রজেক্টটি [MIT License](LICENSE) এর অধীনে লাইসেন্সকৃত।

```
MIT License

Copyright (c) 2025 HealthCheck Pro Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software... 
```

---

## 🙏 কৃতজ্ঞতা

বিশেষ ধন্যবাদ: 

- 🎓 **আমাদের শিক্ষক** - নির্দেশনার জন্য
- 💻 **Open Source Community** - অসাধারণ tools এর জন্য
- 📚 **Stack Overflow & GitHub** - সমস্যা সমাধানে সাহায্যের জন্য
- ❤️ **পরিবার ও বন্ধুরা** - support এর জন্য

---

## 🌟 Star এই Project টি! 

যদি এই প্রজেক্টটি আপনার ভালো লেগে থাকে, তাহলে একটি ⭐ দিয়ে support করুন! 

---

<div align="center">

**Made with ❤️ by HealthCheck Pro Team**

[![GitHub](https://img.shields.io/badge/GitHub-HealthCheck_Pro-black?style=flat-square&logo=github)](https://github.com/SaidurRahman1004/health_MS)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=flat-square&logo=netlify)](https://healthcheck-pro-bd.netlify.app)

**স্বাস্থ্যই সকল সুখের মূল**

</div>
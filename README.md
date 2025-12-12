# WayFare || [Frontend](https://github.com/YeasinWebDev/travel_next) || [Live](https://travel-api-brown.vercel.app/) 

WayFare is a modern travel planning platform where users can explore destinations, create trips, join trips through secure Stripe payments, and receive automated invoices via email. The system includes dedicated dashboards for both users and admins, enabling a smooth and organized travel experience.


---
## 👥 Test User Roles

| Role  | Email                    | Password |
|-------|--------------------------|----------|
| Admin | arafat@gmail.com         | 123456   |
| User  | user@gmail.com           | 123456   |
---

## 🧭 User Features  
- Browse all available destinations
- Create custom trips with detailed information.
- Join any trip using Stripe secure payments.
- Receive invoice emails automatically after successful payment.
- View personal activities, joined trips, and payments inside a dedicated User Dashboard.


## 🛠️ Admin Features  
- Full Admin Dashboard to manage
    - analaytic
    - users
    - destination
    - trips (status)
    - division


## 💳 Payment & Automation  
- Integrated Stripe Checkout for seamless, secure payments.
- Automatic invoice generation.
- Email delivery of invoices and payment receipts.

---

## 🛠️ Tech Stack

- mongoose
- cloudinary
- bcrypt
- cookie-parser
- cors
- express
- jsonwebtoken
- ts-node-dev

--- 

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YeasinWebDev/travel_api.git
cd travel_api
```

### 2.Install Dependencies

```bash
npm install
```

### 3.Environment Variables

```bash
PORT=5000
DB_URL=
JWT_SECRET=
ACCESS_EXPERTED=
REFRESH_EXPERTED=


STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
FRONTEND_URL=



CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


# SMTP GMAIL
SMTP_PASS=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_FROM=
```


### 4.Start the Server

```bash
npm run dev
```



## 📧 Contact
If you have any questions or suggestions, feel free to reach out!  

* Portfolio : [Yeasin Arafat](https://yeasin-arafat-portfolio.netlify.app)
* LinkedIn: [Yeasin Arafat](https://www.linkedin.com/in/yeasinarafat121)






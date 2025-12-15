# campus-management-sys-frontend

A Vue.js-based frontend application for the Campus Management System.

Refer to the [backend repository](https://github.com/DaSmelterSaif/campus-management-sys-backend?tab=readme-ov-file#endpoints).

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher recommended) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

Check your installations:

```bash
node --version
npm --version
git --version
```

## Setup

### 1. Clone the Repository

To run this project on your system, open up a terminal and clone it to a
directory of your choice:

**Windows:**

```bash
cd C:\your\path\here
```

**macOS/Linux:**

```bash
cd ~/your/path/here
```

Clone repo here:

```bash
git clone https://github.com/DaSmelterSaif/campus-management-sys-frontend.git
cd campus-management-sys-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

## Get Updates

To get the latest updates whenever I make a commit, run:

```bash
git pull
```

## How to Use

Running the dev server will host the app on http://localhost:5173/

There are a number of routes in the [routes](#routes) to navigate the app.

### Routes

- / - Redirects to /auth/login
- /auth/login - User login page
- /auth/register - User registration page
- /dashboard - Main dashboard (requires login)
- /bookings - View user bookings
- /form/:serviceId - Dynamic form page for different services

Notes:

- '/' just redirects you to '/auth/login'
- '/auth' is not supposed to work directly, navigate to /auth/login instead
- '/dashboard' should only work when signed in

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Documentation

**Note:** This is Saif's first attempt at a documentation. It may be incomplete,
or includes parts in other sections in this README file that are to be moved
in the near future.

Each service that is sent to the backend has an "internal" service ID.
This ID is passed through components through the URL (route '/form/:id') to determine
which backend URL to choose from. The following list shows all service IDs
along with their corresponding services and backend routes:

- **Room Booking**  
  Service ID: 1  
  Backend Route: '/bookroom'  
  Role: Student, Faculty

- **Schedule Events**  
  Service ID: 2  
  Backend Route: '/scheduleevents'  
  Role: Student, Faculty

- **Register/Dismiss Event**  
  Service ID: 3  
  Backend Route: '/registerevent'  
  Role: Student

- **Cancel Event**  
  Service ID: 4  
  Backend Route: '/cancelevent'  
  Role: Student, Admin, Faculty

- **Cancel Booking**  
  Service ID: 5  
  Backend Route: '/cancelbooking'  
  Role:

- **Submit Maintenance Request**  
  Service ID: 6  
  Backend Route: '/maintenancerequest'  
  Role:

- **View Maintenance Status**  
  Service ID: 7  
  Backend Route: '/viewmaintenance'  
  Role:

- **Ask Chatbot**  
  Service ID: 8  
  Backend Route: '/askchatbot'  
  Role:

- **Approve/Reject Booking**  
  Service ID: 9  
  Backend Route: '/approverejectbooking'  
  Role:

- **View Energy and Water Consumption**  
  Service ID: 10  
  Backend Route: '/energywaterreport'  
  Role:

- **Predict Future Resourse Demands**  
  Service ID: 11  
  Backend Route: '/predictenergywater'  
  Role:

- **View Student Feedback**  
  Service ID: 12  
  Backend Route: '/getstudentfeedback'  
  Role:

- **Summarize Student Feedback**  
  Service ID: 13  
  Backend Route: '/summarizestudentfeedback'  
  Role:

- **Update Maintenance Status**  
  Service ID: 14  
  Backend Route: '/updatemaintenancestatus'  
  Role:

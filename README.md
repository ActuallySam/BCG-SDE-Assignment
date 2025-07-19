# Project Setup Guide

This guide provides step-by-step instructions to set up and run the backend (Django) and frontend (React with Ant Design) for the project. Follow the steps below to get the project up and running on your local machine.

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Python 3.x** (for Django backend)
- **Node.js** (for React frontend)
- **pip** (Python package manager)
- **npm** or **yarn** (Node.js package manager)

If you don't have these installed, download and install them from the official websites:

- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/)
- [pip](https://pip.pypa.io/en/stable/installation/) (usually comes with Python)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [Yarn](https://yarnpkg.com/getting-started/install) (optional)

---

## Backend Setup (Django)

### 1. Download and Extract the ZIP file

- Download and extract the zip file from the email into your desired directory
- Navigate to the extracted directory

### 2. Create and Activate a Python Virtual Environment

Navigate to the backend directory and create a virtual environment to isolate the project dependencies:

```bash
cd BCG/price_optimization_backend
python -m venv venv
```

Activate the virtual environment:
- On macOS/Linux:
```
source venv/bin/activate
```
- On Windows:
```
venv\Scripts\activate
```

### 3. Install Python Dependencies

Install the required Python packages listed in the ```requirements.txt``` file:
```
pip install -r requirements.txt
```
This will install all the necessary dependencies for the Django backend.

### 4. Set Up the Database

Run Django migrations to set up the database:
```
python manage.py migrate
```
This will create the necessary database tables.

### 5. Set Up the Database

Start the Django backend server:
```
python manage.py runserver
```
The backend will be running at http://127.0.0.1:8000/. You can verify this by visiting the URL in your browser.

---

## Frontend Setup (React with Ant Design)

### 1. Navigate to the Frontend Directory

Open a new terminal window and navigate to the frontend directory:
```
cd BCG/price-optimization-tool
```
This will install all the necessary dependencies for the Django backend.

### 2. Install Node.js Dependencies

Install the required Node.js packages listed in the ```package.json``` file:
```
npm install
```
Alternatively, if you're using Yarn:
```
yarn install
```

This will install all the necessary dependencies for the React frontend, including Ant Design.

### 3. Run the React Development Server

Start the React frontend server:
```
npm start
```
or with Yarn:
```
yarn start
```
The frontend will be running at http://localhost:3000/. Open this URL in your browser to view the application.

---

## Running the Full Stack

- Ensure the Django backend is running (http://127.0.0.1:8000/).
- Ensure the React frontend is running (http://localhost:3000/).
- Open your browser and navigate to http://localhost:3000/ to view the application.

Open your browser and navigate to http://localhost:3000/register to view the application.

## Register a user

- On the Register Page (http://localhost:3000/register), create a user with an appropriate username, password, and email address, and select the role you want to assign the user from the DropDown Menu (Admin / Buyer / Supplier)

Role Specification:
- Buyer: Only has access to the landing page after login. Clicking-on or routing to any other page will result in Permission Denied error.
- Supplier: Only has access to the Pricing Optimization Page after logging in.
- Admin: Has access to both pages (Create/Manage Product and Pricing Optimization)


## Log-in with user credentials

- Once registered, use the username and password you used to register the user
- Click on the Login button
- User will be redirected to the landing page
- According to the specified role of the user, they will be accepted/denied to view the pages (Create/Manage Product and Pricing Optimization)

---

## Additional Notes

### Environment Variables

Required varibles of the frontend application have been stored in ```.env.local``` file in the frontend directory (price-optimization-tool)

### Ant Design

The frontend uses Ant Design (antd) for UI components. Refer to the [Ant Design documentation](https://ant.design/) for customization and usage.


## Troubleshooting

### Virtual Environment Issues

- If you encounter issues with the virtual environment, ensure Python and pip are correctly installed.
- Try recreating the virtual environment:
```
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

### Dependency Issues

- If there are issues with dependencies, delete the ```node_modules``` folder (for frontend) or ```venv``` folder (for backend) and reinstall the dependencies:
```
# For backend
pip install -r requirements.txt

# For frontend
npm install
```

### Port Conflicts

- If ports ```3000``` (frontend) or ```8000``` (backend) are already in use, stop the conflicting processes or update the ports in the respective configuration files.

- For Django, update the port in the ```runserver``` command:
```
python manage.py runserver 8001
```

- For React, update the port in the ```package.json``` file or use the ```PORT``` environment variable:
```
PORT=3001 npm start
```

## Summary

The assignment involves creating a Price Optimization Tool for a global enterprise, enabling users to manage product data, forecast demand, and determine optimal pricing. Key aspects include:

- Product Management: Implement CRUD operations for products, with advanced search and filter capabilities. Product data must include attributes like name, category, cost price, selling price, description, stock, and units sold.

- Demand Forecast and Pricing Optimization: Integrate a module to visualize demand forecasts and display optimized pricing in a tabular format.

- User Authentication and Authorization: Develop a robust system for user roles and permissions, supporting admins, buyers, and suppliers.

- Technology Stack: Use Django for the backend, and React.js for the frontend, with a focus on responsive UI/UX, data visualization using library of Recharts, and efficient database operations.

- Code Quality and Documentation: Ensure scalability, clear commenting, and provide setup instructions, project overview, and learnings in a README.md file.

- Delivery: Submit the project within two days, with screenshots, a properly structured code base, and thorough documentation.

Understanding these requirements helped align the development approach with functionality, performance, and user experience goals.


## License

This project is part of a test assignment and is not licensed for distribution.
# 🚀 Deployment Guide: Vercel Backend

This guide explains how to deploy the **Romantic Birthday Website Backend** to Vercel.

## 📋 Prerequisites

1.  A **Vercel account** (sign up at [vercel.com](https://vercel.com)).
2.  Your MongoDB Atlas connection string (from your `.env` file).
3.  The Vercel CLI installed (optional, but recommended): `npm install -g vercel`.

---

## 🛠️ Step 1: Prepare the Code

Ensure your repository has the following files (already configured for you):
-   `main.py`: The entry point of the FastAPI application.
-   `vercel.json`: Configuration file for Vercel deployment.
-   `requirements.txt`: List of Python dependencies.

---

## ☁️ Step 2: Deploy to Vercel

### Option A: Using the Vercel Dashboard (Recommended)
1.  Push your code to a **GitHub/GitLab/Bitbucket** repository.
2.  In the Vercel Dashboard, click **"Add New"** > **"Project"**.
3.  Import your repository.
4.  **Crucial:** Before clicking Deploy, expand the **"Environment Variables"** section and add the following:

| Key | Value |
| :--- | :--- |
| `MONGODB_URI` | `your_mongodb_atlas_connection_string` |
| `DB_NAME` | `mylove` |
| `ALLOWED_ORIGINS` | `*` (or your specific frontend URL like `https://project-name.vercel.app`) |

5.  Click **Deploy**.

### Option B: Using Vercel CLI
1.  Open your terminal in the `CreativeBirthdayWebsiteBE` folder.
2.  Run the command:
    ```bash
    vercel
    ```
3.  Follow the prompts to link your project.
4.  Add environment variables when prompted or via the dashboard as shown above.

---

## 🔍 Step 3: Verify the Deployment

Once the deployment is finished, Vercel will give you a URL (e.g., `https://creative-birthday-api.vercel.app`).

1.  **Check the Root Route:** Visit the URL in your browser. You should see:
    ```json
    {
      "message": "Welcome to the Romantic Birthday Website API",
      "documentation": "/docs",
      "status": "Running successfully on Vercel"
    }
    ```
2.  **API Documentation:** Visit `[your-vercel-url]/docs` to see the interactive Swagger UI.

---

## ⚠️ Important Considerations

### 1. Read-Only Filesystem
Vercel is **serverless**, meaning the filesystem is read-only. 
-   Images uploaded to `/static` via the API will be deleted when the server instance restarts.
-   **Solution:** For a permanent gallery, keep your images in the `static/` folder *before* you deploy (they will be bundled with the code), or connect a service like Cloudinary for dynamic uploads.

### 2. Startup Latency
The first request to your API after a period of inactivity might take a few seconds as Vercel "wakes up" your serverless function (Cold Start).

### 3. Database Whitelisting
Ensure your **MongoDB Atlas Network Access** allows connections from **"0.0.0.0/0"** (Anywhere), as Vercel's IP addresses are dynamic.

---

## 🔄 Updates
Every time you push to your `main` branch, Vercel will automatically redeploy your changes!

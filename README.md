# Campus Connect (Firebase Studio Project)

This is a Next.js project created in Firebase Studio. It's a simple social network for college students to connect with their peers.

## How to Run Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## How to Deploy

To make your project accessible to others, you need to deploy it to a hosting service. The easiest way is with a platform like Vercel or Netlify, which are optimized for Next.js.

### Step 1: Push Your Code to GitHub

1.  Download the source code for this project from Firebase Studio.
2.  Create a new repository on [GitHub](https://github.com/new).
3.  On your local computer, open a terminal in the project's root directory and run the following commands:
    ```bash
    # Initialize a new git repository
    git init -b main
    
    # Add all your files to be tracked by git
    git add .
    
    # Create your first commit
    git commit -m "Initial commit"
    
    # Add your GitHub repository's URL
    # (Replace <YOUR_GITHUB_USERNAME> and <YOUR_REPOSITORY_NAME>)
    git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
    
    # Push your code to GitHub
    git push -u origin main
    ```

### Step 2: Deploy with a Hosting Provider

#### Option A: Deploy with Vercel (Recommended)

1.  Go to [vercel.com/signup](https://vercel.com/signup) and create a free account. It's easiest to sign up with your GitHub account.
2.  After signing up, go to your dashboard and click **"Add New... > Project"**.
3.  Select the GitHub repository you just pushed your code to.
4.  Vercel will automatically detect that it's a Next.js project. You don't need to change any settings.
5.  Click **"Deploy"**.

That's it! Vercel will build your project and provide you with a public URL.

#### Option B: Deploy with Netlify

1.  Go to [app.netlify.com/signup](https://app.netlify.com/signup) and create a free account, preferably with your GitHub account.
2.  From your dashboard, click **"Add new site > Import an existing project"**.
3.  Connect to GitHub and authorize Netlify.
4.  Choose your project's repository from the list.
5.  Netlify will detect the correct settings for a Next.js app.
6.  Click **"Deploy site"**.

Netlify will then build and deploy your site, giving you a public URL.

# MTC LTD Deployment Guide

## Quick Deploy Commands

### 1. Install Heroku CLI
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

### 2. Deploy Backend
```bash
cd /home/ian-mabruk/minesoft/my-react-app/backend
heroku login
heroku create mtc-ltd-backend
heroku config:set EMAIL_ADDRESS=ianmabruk3@gmail.com
heroku config:set EMAIL_PASSWORD=YOUR_GMAIL_APP_PASSWORD
git push heroku master
```

### 3. Get Gmail App Password
1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to App passwords
4. Generate password for "Mail"
5. Copy the 16-character password
6. Replace YOUR_GMAIL_APP_PASSWORD above

### 4. Deploy Frontend to Netlify
1. Go to netlify.com
2. Connect GitHub repo: https://github.com/Ianmabruk/minesoft-mtc.git
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Environment variables:
   - `VITE_API_BASE_URL` = `https://mtc-ltd-backend.herokuapp.com`

### 5. Test Email
After deployment, test email by sending a quote from admin dashboard.

## Alternative: Railway Deployment
1. Go to railway.app
2. Connect GitHub
3. Deploy backend folder
4. Add same environment variables
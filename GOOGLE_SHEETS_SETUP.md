# Google Sheets API Setup Guide

This guide will help you connect your Next.js wedding app to Google Sheets API.

## Prerequisites

- A Google Cloud account
- A Google Sheet where you want to store RSVP data

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Make sure billing is enabled (required for API access)

### 2. Enable Google Sheets API

1. In the Google Cloud Console, navigate to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click on it and click **Enable**

### 3. Create a Service Account

1. Go to **IAM & Admin** > **Service Accounts**
2. Click **Create Service Account**
3. Give it a name (e.g., "wedding-rsvp-service")
4. Click **Create and Continue**
5. Grant it the **Editor** role (or a custom role with Sheets access)
6. Click **Done**

### 4. Create a Service Account Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Choose **JSON** format
5. Click **Create** - this will download a JSON file

### 5. Extract Credentials from JSON

Open the downloaded JSON file. You'll need these values:

- `client_email`: The email address of the service account
- `private_key`: The entire private key (keep the `\n` characters)
- `project_id`: Your Google Cloud project ID

### 6. Share Your Google Sheet

1. Open your Google Sheet
2. Click the **Share** button (top right)
3. Add the service account email (from `client_email` in the JSON)
4. Give it **Editor** permissions
5. Click **Share**

### 7. Get Your Spreadsheet ID

From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

Copy the `SPREADSHEET_ID` part.

### 8. Configure Environment Variables

Create a `.env.local` file in your project root with the following:

```env
# Google Service Account Credentials
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=your-project-id

# Google Sheets Configuration
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-here

# Optional: Sheet name within the spreadsheet (defaults to "RSVP" if not provided)
GOOGLE_SHEET_NAME=RSVP
```

**Important Notes:**
- The `GOOGLE_PRIVATE_KEY` must include the entire key with `\n` characters preserved
- Wrap the private key in quotes if it contains special characters
- Never commit `.env.local` to version control

### 9. Test the Integration

1. Start your development server: `pnpm dev`
2. Fill out the RSVP form on your website
3. Submit the form
4. Check your Google Sheet - you should see a new row with:
   - Timestamp
   - Invite Code
   - Asistirá (Sí/No)
   - Número de Invitados

## Troubleshooting

### Error: "Missing required Google Sheets environment variables"
- Make sure all environment variables are set in `.env.local`
- Restart your development server after adding environment variables

### Error: "The caller does not have permission"
- Make sure you've shared the Google Sheet with the service account email
- Verify the service account has Editor permissions

### Error: "Requested entity was not found"
- Check that the `GOOGLE_SPREADSHEET_ID` is correct
- Verify the spreadsheet exists and is accessible

### Data not appearing in sheet
- Check the browser console for errors
- Verify the sheet name matches `GOOGLE_SHEET_NAME` (defaults to "RSVP")
- Make sure the service account has write permissions

## Sheet Structure

The app will automatically create headers if the sheet is empty:
- Column A: Timestamp
- Column B: Código de Invitación
- Column C: Asistirá
- Column D: Número de Invitados
- Column E: Confirmado
- Column F: Codigo QR

You can manually add these headers or let the app create them automatically.


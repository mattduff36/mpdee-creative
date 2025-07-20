# Google Drive API Setup Guide

This guide will help you configure Google Drive API integration for the mpdee creative platform.

## Prerequisites

- Google Cloud Console access
- Google Drive account (matt.mpdee@gmail.com)
- Admin permissions to create service accounts

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Note down the Project ID

## Step 2: Enable Google Drive API

1. In Google Cloud Console, navigate to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click on "Google Drive API" and press "Enable"

## Step 3: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - **Service account name**: `mpdee-creative-drive-service`
   - **Service account ID**: `mpdee-creative-drive-service`
   - **Description**: `Service account for mpdee creative platform Google Drive integration`
4. Click "Create and Continue"
5. Skip role assignment for now (we'll set Drive permissions separately)
6. Click "Done"

## Step 4: Generate Service Account Key

1. In the Credentials page, find your service account
2. Click on the service account email
3. Go to "Keys" tab
4. Click "Add Key" > "Create New Key"
5. Select "JSON" format
6. Download the JSON file
7. **IMPORTANT**: Store this file securely and never commit it to version control

## Step 5: Configure Google Drive Permissions

1. Open Google Drive (drive.google.com) with matt.mpdee@gmail.com account
2. Create a main folder for mpdee creative (e.g., "mpdee creative Client Files")
3. Right-click the folder > "Share"
4. Add the service account email address with "Editor" permissions
5. Copy the folder ID from the URL (the long string after `/folders/`)

## Step 6: Environment Configuration

### Option A: Using JSON File (Recommended for Development)

1. Save the downloaded JSON file as `google-service-account.json` in your project root
2. Add to your `.env.local`:
   ```bash
   GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./google-service-account.json
   GOOGLE_DRIVE_FOLDER_ID=your_main_folder_id_here
   ```

### Option B: Using Environment Variable (Recommended for Production)

1. Convert the JSON file content to a single line (escape quotes)
2. Add to your `.env.local`:
   ```bash
   GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
   GOOGLE_DRIVE_FOLDER_ID=your_main_folder_id_here
   ```

## Step 7: Folder Structure

The platform will automatically create the following structure for each client:

```
mpdee creative Client Files/
├── CLIENT001 - Client Name/
│   ├── Current Projects/
│   ├── Completed Projects/
│   └── Archive/
├── CLIENT002 - Another Client/
│   ├── Current Projects/
│   ├── Completed Projects/
│   └── Archive/
└── ...
```

## Step 8: Testing the Setup

1. Ensure your environment variables are set correctly
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Check the console for "Google Drive API initialized successfully" message
4. Test file operations through the admin dashboard once implemented

## Security Considerations

### Service Account Key Security
- **NEVER** commit the JSON key file to version control
- Store the key file outside the web root in production
- Use environment variables for sensitive data
- Regularly rotate service account keys

### Drive Permissions
- Only grant necessary permissions to the service account
- Regularly audit folder sharing permissions
- Consider using separate service accounts for different environments

### File Access
- All client files are private by default
- Only authenticated users can access their specific folders
- Download links are temporary and authenticated

## Troubleshooting

### Common Issues

1. **"Google Drive authentication failed"**
   - Check if the JSON key file path is correct
   - Verify the service account has Drive API access
   - Ensure the service account email has folder permissions

2. **"Folder not found" errors**
   - Verify the `GOOGLE_DRIVE_FOLDER_ID` is correct
   - Check if the service account has access to the parent folder
   - Confirm the folder ID format (should be a long alphanumeric string)

3. **"Permission denied" errors**
   - Ensure the service account has "Editor" permissions on the main folder
   - Check if the Google Drive API is enabled in your project
   - Verify the service account key is valid and not expired

### Debug Mode

Enable debug logging by setting in your `.env.local`:
```bash
DEBUG_MODE=true
```

This will provide detailed logging for Google Drive operations.

## Production Deployment

### Vercel Deployment
1. Add environment variables to Vercel dashboard
2. Use the JSON string format for `GOOGLE_SERVICE_ACCOUNT_KEY`
3. Never upload the JSON file to your repository

### Other Hosting Platforms
1. Set environment variables through your hosting platform's dashboard
2. Ensure proper file permissions for credential access
3. Test the integration thoroughly in staging environment

## Support

For issues with Google Drive API integration:
1. Check the Google Cloud Console logs
2. Verify API quotas and limits
3. Review the service account permissions
4. Contact Google Cloud Support if needed 
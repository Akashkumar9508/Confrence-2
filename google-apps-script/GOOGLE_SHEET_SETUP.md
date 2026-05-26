# Google Sheets & Google Apps Script Setup Guide

Follow this guide step-by-step to link your registration Google Form to Google Sheets and deploy the automated confirmation email script.

---

## 1. Create and Configure Google Form

1. Go to [Google Forms](https://forms.google.com) and create a new form.
2. Title the form: **3rd East Zone Paediatric Rheumatology Conference (EZPRC 2026)**.
3. Add the following questions in this exact order (set them as **Required**):
   - **Full Name** (Short Answer)
   - **Designation** (Short Answer)
   - **Email Address** (Short Answer - set validation to "Email Address")
   - **Phone No** (Short Answer)
   - **Place of work** (Short Answer)
   - **Gender** (Short Answer / Dropdown / Multiple Choice)
   - **City** (Short Answer)

---

## 2. Link Form to Google Sheets

1. In your Google Form, click on the **Responses** tab.
2. Click the green **Link to Sheets** button (or "Create Spreadsheet").
3. Choose "Create a new spreadsheet" and click **Create**.
4. The spreadsheet will open. It will automatically contain columns like:
   - `Timestamp`
   - `Full Name`
   - `Designation`
   - `Email Address`
   - `Phone No`
   - `Place of work`
   - `Gender`
   - `City`

---

## 3. Deploy the Google Apps Script

1. Inside your new Google Sheet, go to the top menu and select **Extensions** -> **Apps Script**.
2. A new Apps Script editor will open.
3. Delete any default code in the editor (e.g., `function myFunction() {}`).
4. Copy the complete code from [google-apps-script.js](file:///e:/COdeNixxx/Confrence2/google-apps-script/google-apps-script.js) and paste it into the editor.
5. In the script, verify/locate the `ORGANIZER_EMAIL` variable on line 19 and replace it with your official registrar email (e.g., `iapranchi@gmail.com`).
6. Click the **Save** icon (the floppy disk) at the top of the editor.

---

## 4. Configure the Form Submission Trigger

To make the script run automatically whenever a user submits the Google Form:

1. In the Apps Script sidebar (left side of the screen), click on the **Triggers** icon (looks like an Alarm Clock).
2. Click the blue **+ Add Trigger** button in the bottom right corner.
3. Set the trigger fields as follows:
   - **Choose which function to run:** `onFormSubmit`
   - **Choose which deployment should run:** `Head`
   - **Select event source:** `From spreadsheet`
   - **Select event type:** `On form submit`
   - **Failure notification settings:** `Notify me daily` (or immediately)
4. Click **Save**.

---

## 5. Authorize Permissions

1. A popup window will appear asking you to choose a Google account to authorize the script. Choose the Google account that owns the spreadsheet.
2. You will see a warning screen: *"Google hasn't verified this app"*.
   - Click on **Advanced** (in small text).
   - Click on **Go to Untitled project (unsafe)** (or the name of your script).
3. Review the permissions requested by the script:
   - *Send email on your behalf* (MailApp service needs this to send ticket confirmations).
   - *View and manage your spreadsheets* (SpreadsheetApp needs this to read form inputs).
4. Click **Allow**.
5. Your trigger is now active!

## 6. How to Test

### Method A: Form Submission Test (Recommended)
1. Open your Google Form in Preview mode (click the Eye icon in the form editor).
2. Fill in the fields with your own details:
   - Full Name: *Dr. Test Participant*
   - Designation: *Senior Paediatrician*
   - Email Address: *your_personal_email@example.com*
   - Phone No: *+91 99999 99999*
   - Place of work: *Test Medical College*
   - Gender: *Male*
   - City: *Ranchi*
3. Click **Submit**.
4. Check your inbox! You should receive a beautifully styled HTML email confirming your registration, containing the event venue details, bank account details for payment verification, and a link to join the WhatsApp announcements group.
5. The organizer's email (`iapranchi@gmail.com`) will also receive an administrative notification containing a summary of the participant's entries.

### Method B: Manual Test Run (Inside Apps Script Editor)
Since we've added test simulation fallbacks directly in [google-apps-script.js](file:///e:/COdeNixxx/Confrence2/google-apps-script/google-apps-script.js), you can test the script execution directly:
1. In the Apps Script Editor, select the function `onFormSubmit` from the dropdown next to the **Run** and **Debug** buttons.
2. Click **Run**.
3. The script will automatically trigger manual simulation mode, use mock placeholders (such as Name: "John Doe", Email: "iapranchi@gmail.com"), send verification emails, and complete the execution.
4. Check the editor log at the bottom to verify: *"Manual execution detected. Using test placeholder values"* and *"Successfully sent emails for: John Doe"*.

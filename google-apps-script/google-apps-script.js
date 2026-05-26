/**
 * Google Apps Script for "3rd East Zone Paediatric Rheumatology Conference (EZPRC 2026)"
 * 
 * Instructions:
 * 1. Open your Google Sheets which is linked to your Google Form.
 * 2. In the menu, go to Extensions -> Apps Script.
 * 3. Delete any code in the editor and paste this code.
 * 4. Replace the ORGANIZER_EMAIL constant with your official contact email.
 * 5. Save the project (click the floppy disk icon).
 * 6. Set up a trigger: Click on the Alarm Clock icon (Triggers) on the left sidebar.
 *    - Click "+ Add Trigger"
 *    - Choose "onFormSubmit" as the function to run.
 *    - Select Event source: "From spreadsheet"
 *    - Select Event type: "On form submit"
 *    - Save. Grant necessary permissions when prompted.
 */

// Configuration
const ORGANIZER_EMAIL = "iapranchi@gmail.com"; 
const CONFERENCE_NAME = "3rd East Zone Paediatric Rheumatology Conference (EZPRC 2026)";
const VENUE = "The Royal Retreat, Ranchi";
const DATES = "31st October & 1st November 2026";
const WHATSAPP_GROUP = "https://chat.whatsapp.com/sample-group-link";

function onFormSubmit(e) {
  try {
    // If running manually from the Apps Script play button, mock the values to prevent errors
    let values;
    if (!e || !e.values) {
      Logger.log("Manual execution detected. Using test placeholder values.");
      values = [
        new Date().toISOString(),
        "John Doe",
        "Senior Pediatrician",
        "iapranchi@gmail.com",
        "+91 9508369383",
        "Ranchi Medical College",
        "Male",
        "Ranchi"
      ];
    } else {
      values = e.values;
    }

    const timestamp = values[0];
    const fullName = values[1];      // B: Name
    const designation = values[2];   // C: Designation
    const email = values[3];         // D: Email address
    const phoneNumber = values[4];   // E: Phone No
    const placeOfWork = values[5];   // F: Place of work
    const gender = values[6];        // G: Gender
    const city = values[7];          // H: City
    
    if (!email) {
      Logger.log("No email address provided in submission.");
      return;
    }

    // 2. Build the HTML Email Template for the Participant
    const participantHtml = getParticipantEmailHtml(fullName, designation, placeOfWork, gender, city, phoneNumber);
    
    // 3. Send confirmation email to the participant
    MailApp.sendEmail({
      to: email.trim(),
      subject: `Registration Confirmed: ${CONFERENCE_NAME}`,
      htmlBody: participantHtml,
      name: "EZPRC Ranchi Registrar",
      replyTo: ORGANIZER_EMAIL
    });

    // 4. Build notification HTML for the Organizers
    const adminHtml = getAdminEmailHtml(fullName, designation, email, phoneNumber, placeOfWork, gender, city, timestamp);

    // 5. Send notification to the Organizer
    MailApp.sendEmail({
      to: ORGANIZER_EMAIL,
      subject: `New EZPRC Registration: ${fullName} (${city})`,
      htmlBody: adminHtml,
      name: "EZPRC Web Portal Notification"
    });

    Logger.log(`Successfully sent emails for: ${fullName} (${email})`);
    
  } catch (error) {
    Logger.log(`Error running trigger: ${error.toString()}`);
  }
}

/**
 * Generates HTML email for the participant with premium styling (Purple/Blue brand colors)
 */
function getParticipantEmailHtml(name, designation, placeOfWork, gender, city, phone) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Confirmation</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f3ff; color: #1e1b4b; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
        .wrapper { width: 100%; table-layout: fixed; background-color: #f5f3ff; padding-bottom: 40px; padding-top: 40px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(109, 40, 217, 0.08); border: 1px solid #e9d5ff; }
        .header { background: linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%); padding: 40px 20px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px; }
        .header p { margin: 10px 0 0 0; font-size: 14px; color: #c4b5fd; font-weight: 500; }
        .content { padding: 30px 25px; }
        .greeting { font-size: 16px; font-weight: bold; color: #4c1d95; margin-bottom: 15px; }
        .intro-text { font-size: 14px; line-height: 1.6; color: #4b5563; margin-bottom: 25px; }
        .card { background-color: #faf5ff; border: 1px dashed #c4b5fd; border-radius: 12px; padding: 20px; margin-bottom: 25px; }
        .card-title { font-size: 12px; font-weight: bold; color: #7c3aed; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; border-bottom: 1px solid #ede9fe; padding-bottom: 8px; }
        .action-box { text-align: center; margin: 30px 0; }
        .btn { display: inline-block; padding: 12px 30px; background-color: #25d366; color: #ffffff !important; font-weight: bold; text-decoration: none; border-radius: 8px; font-size: 14px; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.2); }
        .btn:hover { background-color: #20ba5a; }
        .footer { background-color: #1e1b4b; color: #9ca3af; padding: 25px; text-align: center; font-size: 12px; line-height: 1.5; }
        .footer a { color: #c4b5fd; text-decoration: none; }
        .info-block { background-color: #ecfeff; border: 1px solid #a5f3fc; border-radius: 8px; padding: 15px; margin-bottom: 20px; font-size: 13px; color: #0e7490; line-height: 1.5; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <h1>REGISTRATION CONFIRMED</h1>
            <p>${CONFERENCE_NAME}</p>
          </div>
          
          <div class="content">
            <div class="greeting">Dear Dr. ${name},</div>
            <div class="intro-text">
              We are delighted to confirm your registration for the upcoming <strong>3rd East Zone Paediatric Rheumatology Conference (EZPRC 2026)</strong>. Your details have been successfully logged in our delegates database.
            </div>
            
            <div class="info-block">
              <strong>Event Dates:</strong> ${DATES}<br>
              <strong>Venue:</strong> ${VENUE}
            </div>

            <div class="card">
              <div class="card-title">Registration Summary</div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Full Name:</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #1e1b4b; font-weight: bold; text-align: right;">Dr. ${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Designation:</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #1e1b4b; font-weight: bold; text-align: right;">${designation}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Place of Work:</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #1e1b4b; font-weight: bold; text-align: right;">${placeOfWork}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Gender:</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #1e1b4b; font-weight: bold; text-align: right;">${gender}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">City:</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #1e1b4b; font-weight: bold; text-align: right;">${city}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #6b7280;">Contact Number:</td>
                  <td style="padding: 6px 0; font-size: 13px; color: #1e1b4b; font-weight: bold; text-align: right;">${phone}</td>
                </tr>
              </table>
            </div>

            <div class="card" style="background-color: #f0fdf4; border-color: #bbf7d0;">
              <div class="card-title" style="color: #166534; border-bottom-color: #dcfce7;">Bank Transfer / Payment Verification Details</div>
              <p style="font-size: 12px; margin: 0 0 10px 0; color: #166534;">If you have not already completed your registration fee payment, please transfer the amount to our official bank account:</p>
              <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #1e293b;">
                <tr>
                  <td style="padding: 4px 0; color: #475569;">Account Name:</td>
                  <td style="padding: 4px 0; font-weight: bold; text-align: right;">Indian Academy of Pediatrics Ranchi District Branch Jharkhand Paedicon 2016</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #475569;">Bank Name:</td>
                  <td style="padding: 4px 0; font-weight: bold; text-align: right;">Axis Bank</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #475569;">Account Number:</td>
                  <td style="padding: 4px 0; font-weight: bold; text-align: right;">916010023281913</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #475569;">IFSC Code:</td>
                  <td style="padding: 4px 0; font-weight: bold; text-align: right;">UTIH0001407</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; color: #475569;">UPI ID:</td>
                  <td style="padding: 4px 0; font-weight: bold; text-align: right; color: #166534;">9508369383@upi</td>
                </tr>
              </table>
            </div>

            <p style="font-size: 13px; color: #4b5563; line-height: 1.5;">
              <strong>Important Instruction:</strong> If you haven't done so, please make sure your registration fee transfer is complete. Our treasury team is verifying payments against transaction receipts. You will receive your Delegate badge once validated.
            </p>

            <div class="action-box">
              <p style="font-size: 12px; font-weight: bold; color: #4c1d95; margin-bottom: 10px; text-transform: uppercase;">Join official announcements chat</p>
              <a href="${WHATSAPP_GROUP}" class="btn">Join WhatsApp Group</a>
            </div>

            <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 30px;">
              For any booking or presentation inquiries, contact us at <a href="mailto:${ORGANIZER_EMAIL}">${ORGANIZER_EMAIL}</a> or call +91 8789305854.
            </p>
          </div>

          <div class="footer">
            <p><strong>Indian Academy of Pediatrics (IAP) Ranchi District Branch</strong></p>
            <p>The Royal Retreat, Ranchi, Ramgarh Rd, Krishna Nagar, Ranchi, Jharkhand 834012</p>
            <p style="margin-top: 15px; font-size: 11px;">This is an automated notification. Please do not reply directly to this mail.</p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
}

/**
 * Generates admin notification email for the organizers
 */
function getAdminEmailHtml(name, designation, email, phone, placeOfWork, gender, city, time) {
  return `
  <!DOCTYPE html>
  <html>
    <body>
      <div style="font-family: Arial, sans-serif; color: #333333; max-width: 600px; margin: 0 auto; border: 1px solid #dddddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #6d28d9; border-bottom: 2px solid #6d28d9; padding-bottom: 10px;">New Conference Registration Alert</h2>
        <p>A new delegate has registered online for <strong>EZPRC 2026</strong>. Details are listed below:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px; border: 1px solid #eeeeee; font-weight: bold; width: 35%;">Full Name:</td>
            <td style="padding: 8px; border: 1px solid #eeeeee;">Dr. ${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #eeeeee; font-weight: bold;">Designation:</td>
            <td style="padding: 8px; border: 1px solid #eeeeee;">${designation}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px; border: 1px solid #eeeeee; font-weight: bold;">Email Address:</td>
            <td style="padding: 8px; border: 1px solid #eeeeee;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #eeeeee; font-weight: bold;">Phone Number:</td>
            <td style="padding: 8px; border: 1px solid #eeeeee;">${phone}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px; border: 1px solid #eeeeee; font-weight: bold;">Place of Work:</td>
            <td style="padding: 8px; border: 1px solid #eeeeee;">${placeOfWork}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #eeeeee; font-weight: bold;">Gender:</td>
            <td style="padding: 8px; border: 1px solid #eeeeee;">${gender}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 8px; border: 1px solid #eeeeee; font-weight: bold;">City:</td>
            <td style="padding: 8px; border: 1px solid #eeeeee;">${city}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #eeeeee; font-weight: bold;">Submission Time:</td>
            <td style="padding: 8px; border: 1px solid #eeeeee;">${time}</td>
          </tr>
        </table>
        
        <p style="margin-top: 20px; font-size: 13px; color: #666666;">
          This record has been logged in the spreadsheet. Please verify the registration fee deposit against the delegate name.
        </p>
      </div>
    </body>
  </html>
  `;
}

const nodemailer=require('nodemailer');

const sendEmail = async (email, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email provider or SMTP server
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password (for Gmail)
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `Click the link below to reset your password:\n\n${resetLink}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Email sending failed');
  }
};

module.exports=sendEmail;
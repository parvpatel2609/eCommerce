import nodemailer from "nodemailer";

// Create a transporter object with SMTP configuration
export const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., Gmail, Yahoo, etc.
    auth: {
      user: 'unims2407@gmail.com',
      pass: 'fzahhlwzrpxcvmli'
    }
});
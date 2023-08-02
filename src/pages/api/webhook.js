import express from 'express';
import { json } from 'body-parser';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const app = express();
app.use(json());

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;


// Send email with PDF attachment
async function sendEmailWithPDF(email, pdfFilePaths) {

  console.log('Sending email with PDF to:', email);
  console.log('PDF File Paths:', pdfFilePaths);

  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'gmail', 'yahoo', etc.
    auth: {
      user: 'sundayonah94@gmail.com',
      pass: process.env.GMAIL_PASSWORD,
    },
    secure: true,
  });

  const attachments = pdfFilePaths.map((pdfFilePath) => {
    const absolutePath = path.join(process.cwd(), 'public', pdfFilePath);
    return {
      filename: path.basename(pdfFilePath),
      path: absolutePath,
    };
  });

  const mailOptions = {
    from: 'sundayonah94@gmail.com',
    to: email,
    subject: 'Purchase Confirmation',
    text: 'Test Test',
    html: '<h1>Thank you for your purchase! Attached are your purchased books.</h1>',
    attachments,
    
    // attachments: pdfFilePaths.map((pdfFilePath) => ({
    //   filename: path.basename(pdfFilePath),
    //   path: path.join(process.cwd(), 'public', pdfFilePath), // Adjust the path to the actual location of the PDFs
    // })),
  };
  console.log(mailOptions)

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


function verify(eventData, signature) {
  const hmac = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY);
  const expectedSignature = hmac.update(JSON.stringify(eventData)).digest('hex');

  console.log('Received Signature:', signature);
  console.log('Expected Signature:', expectedSignature);

  const isSignatureValid = expectedSignature === signature;
  console.log('Is Signature Valid:', isSignatureValid);

  return isSignatureValid;
}

// webhook.js
// ... (other imports and code)

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }

    const signature = req.headers['x-paystack-signature'];

    const eventData = req.body;

    console.log(signature)
    console.log('Received Paystack Event Data:', eventData);
    console.log(req.body)

    if (!verify(eventData, signature)) {
      console.log('Webhook Signature Verification Failed');
      return res.status(400);
    }

    if (eventData.event === 'charge.success') {
      const transactionId = eventData.data.id;
      console.log(`Transaction ${transactionId} was successful`);

      // Extract the required data from metadata
      const { items, email } = eventData.metadata;
      const pdfFilePaths = items.map((item) => item.pdf);

      console.log('Order ID (Reference):', eventData.data.reference);

      console.log('Items:', items);
      console.log('Recipient Email:', email);
      console.log('PDF File Paths:', pdfFilePaths);

      try {
        await sendEmailWithPDF(email, pdfFilePaths);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).end();
      }

      return res.status(200).end();
    } else {
      console.log('Received Paystack Event:', eventData.event);
      return res.status(200).end();
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).end();
  }
}

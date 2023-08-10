import nodemailer from 'nodemailer';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, items} = req.body;

    const pdfFilePaths = items.map((item) => item.pdf);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'xhunteq@gmail.com',
        pass: 'cfbshnafpuvzhpiq',
        // pass: process.env.GMAIL_PASSWORD_FOR_MAC,
      },
    });
    
    const attachments = pdfFilePaths.map((pdfFilePath) => {
      const absolutePath = path.join(process.cwd(), 'public', pdfFilePath);
      return {
        filename: path.basename(pdfFilePath),
        path: absolutePath,
      };
    });

    const info = await transporter.sendMail({
      from: 'xhunteq@gmail.com',
      to: email,
      subject: 'Purchase Confirmation',
      text: 'Test Test',
      html: '<h1>Thank you for your purchase! Attached are your purchased books.</h1>',
      attachments
    });
    console.log(info)

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Email could not be sent' });
  }
}
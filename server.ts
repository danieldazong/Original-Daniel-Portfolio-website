/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body parser
  app.use(express.json());

  // API Routes go FIRST
  app.post('/api/contact', (req, res) => {
    const { name, email, message, honeypot } = req.body;

    // Honeypot spam test
    if (honeypot) {
      // Quietly succeed to fool bots without expending mail resources
      return res.json({ success: true, message: 'Inquiry cataloged successfully.' });
    }

    // Serverside validation checking
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Required inputs missing: Name, email, and message are mandatory parameters.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'The email address pattern provided is invalid.',
      });
    }

    // Print to terminal for validation
    console.log('===================================================');
    console.log('📬 NEW INQUIRY RECEIVED ON PORTFOLIO PIPELINE:');
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Message: ${message}`);
    console.log('===================================================');

    /*
    ========================================================================
    INTEGRATION STUB FOR EMAIL PROVIDER (e.g. RESEND)
    ========================================================================
    To dispatch native emails inside production, follow these steps:
    
    1. Install Resend dependency:
       run command: npm install resend
       
    2. Import the provider package at top of file:
       import { Resend } from 'resend';
       
    3. Initialize client:
       const resend = new Resend(process.env.RESEND_API_KEY);
       
    4. Call the send API inside this route handler:
       await resend.emails.send({
         from: 'portfolio@yourdomain.com',
         to: 'ayokotimilehin@gmail.com', // Owner's target email
         subject: `Portfolio Inquiry: ${name}`,
         text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
       });
    ========================================================================
    */

    return res.json({
      success: true,
      message: 'Inquiry processed successfully by portfolio systems controller.',
    });
  });

  // Hot module replacement or assets engine
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`  ➜  Local:   http://localhost:${PORT}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      const fallback = PORT + 1;
      console.log(`  ⚠  Port ${PORT} busy — switching to http://localhost:${fallback}`);
      app.listen(fallback, '0.0.0.0', () => {
        console.log(`  ➜  Local:   http://localhost:${fallback}`);
      });
    } else {
      throw err;
    }
  });


}

startServer();

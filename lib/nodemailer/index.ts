"use server"

import { EmailContent, EmailProductInfo, NotificationType } from '@/types';
import nodemailer from 'nodemailer';

const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

export async function generateEmailBody(
  product: EmailProductInfo,
  type: NotificationType
  ) {
  const THRESHOLD_PERCENTAGE = 40;
  // Shorten the product title
  const shortenedTitle =
    product.title.length > 20
      ? `${product.title.substring(0, 20)}...`
      : product.title;

  let subject = "";
  let body = "";

  switch (type) {
    case Notification.WELCOME:
      subject = `Bienvenida/o al seguimiento de precios para ${shortenedTitle}`;
      body = `
        <div>
          <h2>Bienvenida/o a PriceNinja 🥷</h2>
          <p>Ahora estás siguiendo ${product.title}.</p>
          <p>Aquí tienes un ejemplo de cómo recibirás actualizaciones:</p>
          <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
            <h3>${product.title} ha vuelto a estar disponible en inventario.</h3>
            <p>Nos complace informarte que ${product.title} ya está nuevamente disponible en inventario.</p>
            <p>No te lo pierdas: <a href="${product.url}" target="_blank" rel="noopener noreferrer">cómpralo ahora.</a></p>
            <img src="https://i.ibb.co/R3pN6Xt/Screenshot-2023-11-20-215645.png" alt="Product Image" style="max-width: 100%;" />
          </div>
          <p>Mantente atenta/o para más actualizaciones sobre ${product.title} y otros productos que estás siguiendo.</p>
        </div>
      `;
      break;

    case Notification.CHANGE_OF_STOCK:
      subject = `${shortenedTitle} ahora está nuevamente disponible en inventario.`;
      body = `
        <div>
          <h4>¡Hola! ¡${product.title} ha sido reabastecido! ¡Aprovecha antes de que se agoten nuevamente!</h4>
          <p>Consulta el producto <a href="${product.url}" target="_blank" rel="noopener noreferrer">aquí.</a>.</p>
        </div>
      `;
      break;

    case Notification.LOWEST_PRICE:
      subject = `Alerta de precio más bajo para ${shortenedTitle}`;
      body = `
        <div>
          <h4>¡Hola! ¡${product.title} ha alcanzado su precio más bajo hasta ahora!</h4>
          <p>Aprovecha y obtén el producto <a href="${product.url}" target="_blank" rel="noopener noreferrer">aquí</a> ahora.</p>
        </div>
      `;
      break;

    case Notification.THRESHOLD_MET:
      subject = `Alerta de Descuento para ${shortenedTitle}`;
      body = `
        <div>
          <h4>¡Hola! ¡${product.title} ahora está disponible con un descuento superior al ${THRESHOLD_PERCENTAGE}%!</h4>
          <p>Adquiérelo de inmediato <a href="${product.url}" target="_blank" rel="noopener noreferrer">aquí</a>.</a>.</p>
        </div>
      `;
      break;

    default:
      throw new Error("Tipo de notificación no válido.");
  }

  return { subject, body };
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: 'hotmail',
  port: 2525,
  auth: {
    user: 'price.ninja@outlook.com',
    pass: process.env.EMAIL_PASSWORD,
  },
  maxConnections: 1
})

export const sendEmail = async (emailContent: EmailContent, sendTo: string[]) => {
  const mailOptions = {
    from: 'price.ninja@outlook.com',
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  }

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if(error) return console.log(error);
    
    console.log('Email enviado: ', info);
  })
}
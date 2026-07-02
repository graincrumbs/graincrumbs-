// Shared WhatsApp helper — pre-filled order enquiry message.
export const WHATSAPP_NUMBER = "918208257574";

export const ORDER_MESSAGE_TEMPLATE = `Hi Grain Crumbs! I'd like to place an order.

Name:
Mobile:
Email:

Product:
Flavour:
Weight/Qty:

Delivery:
Address:

Occasion:
Date Required:

Cake Message:
Theme:

Reference:

Notes:`;

export const WHATSAPP_ORDER_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  ORDER_MESSAGE_TEMPLATE,
)}`;

export const WHATSAPP_PLAIN_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

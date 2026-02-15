import { shopInfo } from '../data/products';

export const generateWhatsAppOrderLink = (product, quantity = 1) => {
  const totalPrice = product.price * quantity;

  const message = quantity > 1
    ? `Hello, I would like to order:\nProduct: ${product.name}\nBrand: ${product.brand}\nQuantity: ${quantity}\nTotal: ${totalPrice} MAD\nFrom: ${shopInfo.name}`
    : `Hello, I would like to order ${product.name} (${product.brand}) for ${product.price} MAD from ${shopInfo.name}`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${shopInfo.whatsapp}?text=${encodedMessage}`;
};

export const generateGeneralWhatsAppLink = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${shopInfo.whatsapp}?text=${encodedMessage}`;
};

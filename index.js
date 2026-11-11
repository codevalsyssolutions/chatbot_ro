const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); // Asegúrate de tener esto si usas terminal para el QR local

// Inicialización del cliente compatible con Render y Windows
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  }
});

// Evento para generar el código QR en la consola
client.on('qr', (qr) => {
    console.log('¡Escanea este código QR con tu WhatsApp!');
    qrcode.generate(qr, { small: true });
});

// Evento cuando el bot se conecta exitosamente
client.on('ready', () => {
    console.log('¡Moda Urbana Co. está conectado y listo en la nube 24/7! 🚀');
});

// Ejemplo básico de respuesta automática
client.on('message', message => {
    if (message.body.toLowerCase() === 'hola') {
        message.reply('¡Hola! Bienvenido a *Moda Urbana Co.* ¿En qué podemos ayudarte hoy?');
    }
});

// Iniciar el cliente
client.initialize();
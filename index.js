const { Client, LocalAuth } = require('whatsapp-web.js');

// ==========================================
// 📄 CONFIGURACIÓN DEL CLIENTE
// ==========================================
const CONFIG_CLIENTE = {
  nombreEmprendimiento: "Moda Urbana Co.",
  linkCatalogo: "https://instagram.com/modaurbana",
  mediosPago: "Nequi (3001234567) y Bancolombia",
  coberturaEnvios: "Todo Colombia por Interrapidísimo",
  precioEnvio: "$12.000 COP",
  tiempoEntrega: "2 a 4 días hábiles",
  ubicacion: "Medellín, Antioquia",
  horarioAtencion: "Lunes a Sábado de 8:00 AM a 6:00 PM"
};

// ==========================================
// 🤖 DICCIONARIO DE RESPUESTAS
// ==========================================
const MENU_PRINCIPAL = `¡Hola! 👋 Gracias por comunicarte con *${CONFIG_CLIENTE.nombreEmprendimiento}*. Soy tu asistente virtual 24/7.

Por favor, responde escribiendo solo el *NÚMERO* de la opción que necesitas:

1. 📦 Ver Catálogo / Productos
2. 💳 Medios de Pago y Envíos
3. 📍 Ubicación y Horarios
4. 🔎 Consultar estado de pedido
5. 👤 Hablar con un asesor humano`;

const RESPUESTAS_OPCIONES = {
  "1": `¡Excelente elección! 🎨\nPuedes ver nuestro catálogo y pedir directamente en:\n🔗 ${CONFIG_CLIENTE.linkCatalogo}\n\nEscribe *MENU* para volver al menú principal.`,

  "2": `En *${CONFIG_CLIENTE.nombreEmprendimiento}* aceptamos:\n\n💳 *Medios de pago:* ${CONFIG_CLIENTE.mediosPago}\n🚚 *Envíos:* ${CONFIG_CLIENTE.coberturaEnvios}.\n💰 *Costo promedio:* ${CONFIG_CLIENTE.precioEnvio}\n⏰ *Tiempo estimado:* ${CONFIG_CLIENTE.tiempoEntrega}\n\nEscribe *MENU* para volver al menú principal.`,

  "3": `Nuestra información de atención:\n\n📍 *Ubicación:* ${CONFIG_CLIENTE.ubicacion}\n⏰ *Horario de atención humana:* ${CONFIG_CLIENTE.horarioAtencion}\n\nEscribe *MENU* para volver al menú principal.`,

  "4": `Para revisar el estado de tu paquete 📦, envíanos en un solo mensaje:\n1. Tu nombre completo.\n2. Número de cédula o número de pedido.\n\nUn asesor revisará la guía y te responderá pronto.`,

  "5": `Entendido, te conectaremos con el equipo 👥.\n\nDéjanos tu mensaje detallado. Nuestro horario de atención humana es de *${CONFIG_CLIENTE.horarioAtencion}*. Te responderemos tan pronto nos liberemos.`
};

const MENSAJE_ERROR = `No logré entender tu respuesta. 😅 Por favor escribe solo el *número* de la opción (1 al 5) o la palabra *MENU*.`;

// ==========================================
// ⚙️ INICIALIZACIÓN DEL CLIENTE
// ==========================================
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
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

client.on('ready', () => {
  console.log('🚀 ¡BOT CONECTADO Y LISTO PARA OPERAR 24/7!');
});

// ==========================================
// 📥 ESCUCHA DE MENSAJES
// ==========================================
client.on('message', async (msg) => {
  try {
    // Ignorar mensajes enviados por el propio bot o de grupos
    if (msg.fromMe || msg.from.endsWith('@g.us')) return;

    const textoCliente = msg.body.trim().toLowerCase();
    console.log(`📩 Mensaje recibido de ${msg.from}: ${textoCliente}`);

    let respuestaBot = "";

    if (textoCliente === 'menu' || textoCliente === 'hola' || textoCliente === 'inicio') {
      respuestaBot = MENU_PRINCIPAL;
    } else if (RESPUESTAS_OPCIONES[textoCliente]) {
      respuestaBot = RESPUESTAS_OPCIONES[textoCliente];
    } else {
      respuestaBot = MENSAJE_ERROR;
    }

    await client.sendMessage(msg.from, respuestaBot);
    console.log(`🤖 Respuesta enviada con éxito.`);
  } catch (error) {
    console.error('⚠️ Error al procesar el mensaje:', error.message);
  }
});

// Manejo global de errores no capturados para prevenir cierres repentinos
process.on('uncaughtException', (err) => {
  console.error('⚠️ Excepción no capturada detectada:', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Rechazo de promesa no manejado:', reason);
});

client.initialize();
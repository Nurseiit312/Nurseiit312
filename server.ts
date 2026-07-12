import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const serverDirname = typeof import.meta.url !== 'undefined'
  ? path.dirname(fileURLToPath(import.meta.url))
  : __dirname;

async function createServer() {
  const app = express();
  app.use(express.json());

  // API Route for lead submissions
  app.post('/api/leads', async (req, res) => {
    try {
      const { name, phone, serviceType, comment, calculatorDetails } = req.body;
      
      console.log('Received new lead request:', req.body);
      
      if (!phone) {
        return res.status(400).json({
          success: false,
          message: 'Номер телефона обязателен'
        });
      }

      const responseMessage = "Заявка успешно отправлена! Специалист свяжется с вами в течение 5 минут.";
      
      // Save lead to local memory/JSON file for UI/dev tracing
      const leadsFile = path.join(serverDirname, 'leads.json');
      let leadsList = [];
      if (fs.existsSync(leadsFile)) {
        try {
          leadsList = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
        } catch (e) {
          leadsList = [];
        }
      }

      // If Telegram is configured:
      const tgToken = process.env.TELEGRAM_BOT_TOKEN;
      const tgChatId = process.env.TELEGRAM_CHAT_ID;
      let telegramStatus = 'not_configured';

      if (tgToken && tgChatId) {
        try {
          const detailStr = calculatorDetails 
            ? `\n📐 *Детали расчета калькулятора:*\n• Объект: ${calculatorDetails.objectType}\n• Услуга: ${calculatorDetails.service}\n• Площадь: ${calculatorDetails.area} кв.м.\n• Оценочная стоимость: ${calculatorDetails.estimatedPrice} сом`
            : '';
          
          const text = `🔔 *Новая заявка с сайта dezinfeksiya.kg!*\n\n👤 *Имя:* ${name || 'Не указано'}\n📞 *Телефон:* ${phone}\n🛠 *Услуга:* ${serviceType || 'Консультация'}\n💬 *Комментарий:* ${comment || '—'}${detailStr}`;
          
          const tgUrl = `https://api.telegram.org/bot${tgToken}/sendMessage`;
          const response = await fetch(tgUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: tgChatId,
              text: text,
              parse_mode: 'Markdown'
            })
          });
          
          if (response.ok) {
            telegramStatus = 'sent';
          } else {
            console.error('Telegram bot API error:', await response.text());
            telegramStatus = 'failed';
          }
        } catch (err) {
          console.error('Failed to notify Telegram:', err);
          telegramStatus = 'failed';
        }
      }

      const leadData = {
        id: Date.now(),
        name: name || 'Неизвестный',
        phone: phone.substring(0, 4) + ' *** **' + phone.substring(phone.length - 2), // nice safe masking
        originalPhone: phone,
        serviceType: serviceType || 'Бесплатная консультация',
        comment: comment || '',
        calculatorDetails: calculatorDetails || null,
        timestamp: new Date().toISOString(),
        telegramStatus
      };

      leadsList.unshift(leadData);
      // Keep only last 50 leads
      leadsList = leadsList.slice(0, 50);
      fs.writeFileSync(leadsFile, JSON.stringify(leadsList, null, 2));

      return res.status(200).json({
        success: true,
        message: responseMessage,
        lead: leadData
      });
    } catch (error: any) {
      console.error('Error in leads handler:', error);
      return res.status(500).json({
        success: false,
        message: 'Ошибка отправки формы. Пожалуйста, попробуйте связаться напрямую по телефону или WhatsApp.'
      });
    }
  });

  // API to fetch leads for UI logs
  app.get('/api/leads', (req, res) => {
    const leadsFile = path.join(serverDirname, 'leads.json');
    if (fs.existsSync(leadsFile)) {
      try {
        const leadsList = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
        return res.status(200).json(leadsList);
      } catch (e) {
        return res.status(200).json([]);
      }
    }
    return res.status(200).json([]);
  });

  // Integrate Vite or Static files depending on environment
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(serverDirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(serverDirname, 'dist', 'index.html'));
    });
  }

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`dezinfeksiya.kg backend server running at http://0.0.0.0:${port}`);
  });
}

createServer();

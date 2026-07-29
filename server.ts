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

  const DEFAULT_REVIEWS = [
    { name: "Асель", city: "Бишкек", text: "Заказали дезинсекцию от тараканов. Мучились полгода, магазинные средства не помогали. Ребята приехали в день обращения, обработали всe за 40 минут. Прошло 3 месяца, ни одного паразита! Спасибо большое!", rating: 5, date: "15 мая 2026" },
    { name: "Бакыт", city: "Ош", text: "Вызывали травить постельных клопов в частном доме. Переживал за маленьких детей, но мастера использовали сертифицированную химию без едкого запаха. Спим теперь спокойно. Сервис отличный!", rating: 5, date: "12 мая 2026" },
    { name: "Нурбек Т.", city: "Бишкек", text: "Проводят регулярную санитарную обработку стоматологического кабинета. Всегда выдают акты выполненных работ, чек и копию лицензии для проверяющих госорганов. Очень надежно.", rating: 5, date: "08 мая 2026" },
    { name: "Камила", city: "Кара-Балта", text: "Заказали комплекс: удаление плесени в ванной и генеральную уборку квартиры. Ванная теперь чистая, сырость исчезла, а полы блестят. Рекомендую обращаться только к ним!", rating: 5, date: "02 мая 2026" },
    { name: "Эмиль", city: "Бишкек", text: "На нашем продуктовом складе появились крысы. Обратились в dezinfeksiya.kg. Ребята оперативно разложили безопасные приманки, перекрыли пролазы. За 5 дней грызунов не стало. Профессионалы!", rating: 5, date: "28 апреля 2026" },
    { name: "Динара", city: "Бишкек", text: "Делала химчистку дивана и мытье окон. Пыль и старые пятна от сока ушли полностью. Спасибо клинерам за вежливость и аккуратность! Очень довольна результатом.", rating: 5, date: "24 апреля 2026" }
  ];

  // API to fetch reviews
  app.get('/api/reviews', (req, res) => {
    const reviewsFile = path.join(serverDirname, 'reviews.json');
    if (fs.existsSync(reviewsFile)) {
      try {
        const reviewsList = JSON.parse(fs.readFileSync(reviewsFile, 'utf8'));
        return res.status(200).json(reviewsList);
      } catch (e) {
        return res.status(200).json(DEFAULT_REVIEWS);
      }
    } else {
      // Initialize with defaults
      try {
        fs.writeFileSync(reviewsFile, JSON.stringify(DEFAULT_REVIEWS, null, 2));
      } catch (e) {
        console.error('Failed to write default reviews', e);
      }
      return res.status(200).json(DEFAULT_REVIEWS);
    }
  });

  // API to submit a new review
  app.post('/api/reviews', async (req, res) => {
    try {
      const { name, city, text, rating } = req.body;
      if (!name || !text || !rating) {
        return res.status(400).json({
          success: false,
          message: 'Поля Имя, Отзыв и Оценка обязательны для заполнения'
        });
      }

      const reviewsFile = path.join(serverDirname, 'reviews.json');
      let reviewsList = [...DEFAULT_REVIEWS];

      if (fs.existsSync(reviewsFile)) {
        try {
          reviewsList = JSON.parse(fs.readFileSync(reviewsFile, 'utf8'));
        } catch (e) {
          reviewsList = [...DEFAULT_REVIEWS];
        }
      }

      // Format current Russian date e.g. "15 июля 2026"
      const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
      let formattedDate = new Date().toLocaleDateString('ru-RU', dateOptions);
      // Remove " г." if present
      formattedDate = formattedDate.replace(/\s*г\.$/, '').replace(/\s*г\./, '');

      const newReview = {
        name,
        city: city || 'Кыргызстан',
        text,
        rating: Math.min(5, Math.max(1, parseInt(rating, 10) || 5)),
        date: formattedDate
      };

      reviewsList.unshift(newReview);
      // Limit to 100 reviews
      reviewsList = reviewsList.slice(0, 100);

      fs.writeFileSync(reviewsFile, JSON.stringify(reviewsList, null, 2));

      // Optional Telegram notification
      const tgToken = process.env.TELEGRAM_BOT_TOKEN;
      const tgChatId = process.env.TELEGRAM_CHAT_ID;
      if (tgToken && tgChatId) {
        try {
          const stars = '⭐️'.repeat(newReview.rating);
          const tgText = `✍️ *Новый отзыв на сайте dezinfeksiya.kg!*\n\n👤 *Имя:* ${newReview.name}\n📍 *Город:* ${newReview.city}\n⭐ *Оценка:* ${stars}\n💬 *Текст:* ${newReview.text}`;
          
          const tgUrl = `https://api.telegram.org/bot${tgToken}/sendMessage`;
          await fetch(tgUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: tgChatId,
              text: tgText,
              parse_mode: 'Markdown'
            })
          });
        } catch (err) {
          console.error('Failed to notify Telegram about review:', err);
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Ваш отзыв успешно опубликован! Благодарим за обратную связь.',
        review: newReview
      });
    } catch (error) {
      console.error('Error in post review handler:', error);
      return res.status(500).json({
        success: false,
        message: 'Произошла ошибка при сохранении отзыва.'
      });
    }
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

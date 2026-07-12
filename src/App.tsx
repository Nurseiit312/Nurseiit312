import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Bug, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  Clock, 
  MessageCircle, 
  MapPin, 
  Users, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Home, 
  Building2, 
  Coffee, 
  Warehouse, 
  ArrowRight, 
  Zap, 
  Activity, 
  Info,
  X,
  FileText,
  MousePointerClick,
  Droplets,
  Award,
  Instagram,
  Flame
} from 'lucide-react';

// Compactly structured static data
const PEST_CARDS = [
  { id: 'tarakan', title: 'Тараканы', desc: 'Эффективно травим рыжих и черных тараканов. Ставим мощный барьер защиты.', price: 'от 1500 сом', icon: '🦗' },
  { id: 'klop', title: 'Клопы', desc: 'Тотальная ликвидация постельных клопов. Бережное отношение к мебели.', price: 'от 2000 сом', icon: '🪲' },
  { id: 'bloha', title: 'Блохи', desc: 'Обработка ковров, плинтусов и подвалов. Уничтожаем яйца и личинки.', price: 'от 1500 сом', icon: '🕷️' },
  { id: 'muravei', title: 'Муравьи', desc: 'Удаление гнезд и маток в квартирах, домах и на прилежащих участках.', price: 'от 1500 сом', icon: '🐜' },
  { id: 'krysa', title: 'Крысы', desc: 'Профессиональная дератизация. Ставим ловушки, блокируем ходы грызунам.', price: 'от 2000 сом', icon: '🐀' },
  { id: 'mysh', title: 'Мыши', desc: 'Быстро убираем грызунов на складах, в загородных домах и ресторанах.', price: 'от 2000 сом', icon: '🐭' },
  { id: 'virus', title: 'Вирусы', desc: 'Обеззараживание воздуха и поверхностей от гриппа, ОРВИ и бактерий.', price: 'от 1500 сом', icon: '🦠' },
  { id: 'bacteria', title: 'Бактерии & Плесень', desc: 'Удаление опасных плесневых грибков, спор и сырости с гарантией сухих стен.', price: 'от 1500 сом', icon: '🍄' }
];

const GENERAL_SERVICES = [
  { title: 'Дезинсекция', text: 'Уничтожение тараканов, клопов, муравьев, блох и защита от повторного заражения.' },
  { title: 'Дератизация', text: 'Профессиональное уничтожение крыс и мышей в жилых и производственных помещениях.' },
  { title: 'Дезинфекция помещений', text: 'Уничтожение вирусов, болезнетворных бактерий, плесени и стойкого грибка.' },
  { title: 'Санитарная обработка бизнеса', text: 'Обработка кафе, ресторанов, складов, магазинов и офисов по стандартам СанПиН.' },
  { title: 'Профилактическая обработка', text: 'Плановое сдерживание активности насекомых и грызунов до начала размножения.' },
  { title: 'Озонирование помещений', text: 'Глубокое удаление неприятных запахов, гари, химии и стерилизация воздуха озоном.' }
];

const CLEANING_SERVICES = [
  { title: 'Генеральная уборка', text: 'Максимально глубокое очищение всех комнат, шкафов, радиаторов и кухонного жира.', price: 'от 3500 сом' },
  { title: 'Уборка после ремонта', text: 'Сбор тяжелой пыли, удаление следов затирки, краски, силикона и мытье полов.', price: 'от 5000 сом' },
  { title: 'Уборка офисов', text: 'Систематическое или разовое наведение чистоты в вашей рабочей зоне.' , price: 'от 4000 сом' },
  { title: 'Мытье окон', text: 'Качественное очищение стекол, рам, откосов и подоконников без разводов.', price: 'от 2000 сом' },
  { title: 'Химчистка мебели', text: 'Профессиональная экстракторная глубокая очистка диванов, матрасов и ковров.', price: 'от 2500 сом' }
];

const HOW_WE_WORK = [
  { num: '01', title: 'Оформление заявки', desc: 'Оставляете заявку на удобном сайте, через WhatsApp чат или по номеру телефона.' },
  { num: '02', title: 'Консультация', desc: 'Дезинфектор оценивает масштаб, подбирает методы и утверждает точную стоимость.' },
  { num: '03', title: 'Выезд и обработка', desc: 'Бригада быстро приезжает в удобное вам время, проводит обработку за 30-60 минут.' },
  { num: '04', title: 'Гарантийный договор', desc: 'Предоставляем официальный документ, рекомендации и до 12 месяцев гарантии.' }
];

const OBJECTS_WE_TREAT = [
  { name: 'Квартиры и дома', icon: '🏠' },
  { name: 'Офисы и бизнес-центры', icon: '🏢' },
  { name: 'Кафе и рестораны', icon: '☕' },
  { name: 'Точки фаст-фуда', icon: '🍔' },
  { name: 'Магазины и бутики', icon: '🏬' },
  { name: 'Склады и ангары', icon: '📦' },
  { name: 'Производства и цеха', icon: '🏭' },
  { name: 'Медицинские учреждения', icon: '🏥' }
];

const REVIEWS = [
  { name: "Асель", city: "Бишкек", text: "Заказали дезинсекцию от тараканов. Мучились полгода, магазинные средства не помогали. Ребята приехали в день обращения, обработали всe за 40 минут. Прошло 3 месяца, ни одного паразита! Спасибо большое!", rating: 5, date: "15 мая 2026" },
  { name: "Бакыт", city: "Ош", text: "Вызывали травить постельных клопов в частном доме. Переживал за маленьких детей, но мастера использовали сертифицированную химию без едкого запаха. Спим теперь спокойно. Сервис отличный!", rating: 5, date: "12 мая 2026" },
  { name: "Нурбек Т.", city: "Бишкек", text: "Проводят регулярную санитарную обработку стоматологического кабинета. Всегда выдают акты выполненных работ, чек и копию лицензии для проверяющих госорганов. Очень надежно.", rating: 5, date: "08 мая 2026" },
  { name: "Камила", city: "Кара-Балта", text: "Заказали комплекс: удаление плесени в ванной и генеральную уборку квартиры. Ванная теперь чистая, сырость исчезла, а полы блестят. Рекомендую обращаться только к ним!", rating: 5, date: "02 мая 2026" },
  { name: "Эмиль", city: "Бишкек", text: "На нашем продуктовом складе появились крысы. Обратились в dezinfeksiya.kg. Ребята оперативно разложили безопасные приманки, перекрыли пролазы. За 5 дней грызунов не стало. Профессионалы!", rating: 5, date: "28 апреля 2026" },
  { name: "Динара", city: "Бишкек", text: "Делала химчистку дивана и мытье окон. Пыль и старые пятна от сока ушли полностью. Спасибо клинерам за вежливость и аккуратность! Очень довольна результатом.", rating: 5, date: "24 апреля 2026" }
];

export default function App() {
  // Calculator states
  const [calcObjectType, setCalcObjectType] = useState('apartment');
  const [calcService, setCalcService] = useState('tarakan');
  const [calcArea, setCalcArea] = useState(50);
  const [calcPhone, setCalcPhone] = useState('');
  const [calcName, setCalcName] = useState('');
  const [calcPrep, setCalcPrep] = useState('bayer');
  const [calcTech, setCalcTech] = useState('cold_fog');

  // General state
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [activeGalleryTab, setActiveGalleryTab] = useState('tarakan');
  const [activeArsenalTab, setActiveArsenalTab] = useState('chemistry');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState<null | 'callback' | 'order' | 'privacy' | 'terms'>(null);
  const [selectedOrderService, setSelectedOrderService] = useState('Уничтожение тараканов');

  // Contact/Consultation form states
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultService, setConsultService] = useState('Уничтожение тараканов');
  const [consultComment, setConsultComment] = useState('');

  // System alert states
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  // Fetch leads
  const fetchRecentLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setRecentLeads(data);
      }
    } catch (e) {
      console.log('Failed to fetch leads', e);
    }
  };

  useEffect(() => {
    fetchRecentLeads();
    const interval = setInterval(fetchRecentLeads, 15000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setStatusMessage(message);
    setToastType(type);
    setTimeout(() => {
      setStatusMessage(null);
    }, 6000);
  };

  const calcEstimatedPrice = () => {
    let base = 1500;
    let multiplier = 10;
    
    switch (calcService) {
      case 'tarakan': base = 1500; multiplier = 12; break;
      case 'klop': base = 2000; multiplier = 15; break;
      case 'bloha': base = 1500; multiplier = 10; break;
      case 'muravei': base = 1500; multiplier = 10; break;
      case 'rodents': base = 2000; multiplier = 14; break;
      case 'disinfection': base = 1500; multiplier = 12; break;
      case 'cleaning': base = 3500; multiplier = 40; break;
    }

    // Technology cost modifier
    switch (calcTech) {
      case 'cold_fog': base += 100; break;     // Холодный туман
      case 'hot_fog': base += 400; break;      // Горячий туман
      case 'spraying': base += 0; break;       // Распыление жидким
      case 'cannon': base += 500; break;       // Пушка
      case 'dry_fog': base += 300; break;      // Сухой туман
      case 'gel': base += 200; break;          // Гель
      case 'bait': base += 150; break;         // Приманка липучка / ловушка
    }

    // Preparation cost modifier
    switch (calcPrep) {
      case 'bayer': base += 300; break;        // Без запаха Bayer (Германия)
      case 'china': base += 0; break;          // Запах Китай
      case 'russia': base += 50; break;        // Запах Россия
      case 'cyfox': base += 150; break;        // Цифокс
      case 'agran': base += 200; break;        // Агран
    }

    if (calcObjectType === 'house') base += 500;
    if (calcObjectType === 'cafe' || calcObjectType === 'restaurant') base += 800;
    if (calcObjectType === 'warehouse') base += 1000;

    let areaDiff = Math.max(0, calcArea - 40);
    return base + (areaDiff * multiplier);
  };

  const handleLeadSubmit = async (payload: {
    name: string;
    phone: string;
    serviceType: string;
    comment?: string;
    calculatorDetails?: any;
  }) => {
    if (!payload.phone || payload.phone.length < 7) {
      showToast('Пожалуйста, введите корректный номер телефона', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const resData = await response.json();
      if (response.ok && resData.success) {
        showToast(resData.message || 'Заявка успешно отправлена!', 'success');
        fetchRecentLeads();
        setModalOpen(null);
        setConsultName('');
        setConsultPhone('');
        setConsultComment('');
        setCalcPhone('');
        setCalcName('');

        // Prepare message template for WhatsApp booking
        const detailStr = payload.calculatorDetails
          ? `\n📐 Детали заказа:\n• Объект: ${payload.calculatorDetails.objectType}\n• Услуга: ${payload.calculatorDetails.service}\n• Площадь: ${payload.calculatorDetails.area} кв.м.`
          : '';
        const commentStr = payload.comment ? `\n💬 Комментарий: ${payload.comment}` : '';
        const text = encodeURIComponent(
          `Здравствуйте! Хочу сделать заказ/бронь на dezinfeksiya.kg.\n\n👤 Имя: ${payload.name || 'Не указано'}\n📞 Телефон: ${payload.phone}\n🛠 Услуга: ${payload.serviceType}${commentStr}${detailStr}`
        );

        // Open WhatsApp in new tab so operator gets the lead instantly
        setTimeout(() => {
          window.open(`https://wa.me/996700446744?text=${text}`, '_blank');
        }, 1000);
      } else {
        showToast(resData.message || 'Ошибка отправки заявки.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Ошибка подключения к серверу. Мы свяжемся с вами по WhatsApp!', 'info');
      const text = encodeURIComponent(`Здравствуйте! Меня зовут ${payload.name || 'Клиент'}. Хочу заказать услугу "${payload.serviceType}". Мой номер ${payload.phone}.`);
      window.open(`https://wa.me/996700446744?text=${text}`, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReviewPrev = () => {
    setActiveReviewIdx((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleReviewNext = () => {
    setActiveReviewIdx((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const triggerQuickOrder = (serviceName: string) => {
    setSelectedOrderService(serviceName);
    setModalOpen('order');
  };

  const selectArsenalChoice = (type: 'prep' | 'tech', value: string) => {
    if (type === 'prep') {
      setCalcPrep(value);
    } else {
      setCalcTech(value);
    }
    const labels: Record<string, string> = {
      bayer: "Препарат Bayer (Без запаха)",
      russia: "Россия (Легкий запах)",
      china: "Китай (Сильный запах)",
      cyfox: "Цифокс",
      agran: "Агран",
      cold_fog: "Холодный туман",
      hot_fog: "Горячий туман",
      spraying: "Распыление жидким",
      cannon: "Пушка",
      dry_fog: "Сухой туман",
      gel: "Гель-барьер",
      bait: "Липучка / Приманка"
    };
    showToast(`Выбрано: ${labels[value] || value}. Стоимость в калькуляторе автоматически обновлена!`, 'success');
    const el = document.getElementById('calculator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getBeforeAfterContent = () => {
    switch (activeGalleryTab) {
      case 'tarakan':
        return {
          title: 'Кухня коммерческого кафе (Тараканы)',
          beforeText: 'Обильные гнезда за холодильными установками, жировые загрязнения, сотни активных особей плинтусах.',
          afterText: 'Глубокая обработка горячим туманом + гелевые барьеры. 100% гибель колонии, полная чистота и дезинфекция.',
          beforePic: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
          afterPic: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80'
        };
      case 'klop':
        return {
          title: 'Гостевая комната (Постельные клопы)',
          beforeText: 'Характерные черные точки на швах матраса, личинки на деревянных ламелях кровати, ночные укусы.',
          afterText: 'Комбинированный метод (химия + ультразвук). Чистый матрас, отсутствие запаха, крепкий семейный сон.',
          beforePic: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
          afterPic: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80'
        };
      case 'disinfection':
        return {
          title: 'Ванная комната в жилом доме (Грибок и Плесень)',
          beforeText: 'Черный налет на швах кафеля и силиконовом герметике, едкий запах сырости в помещении.',
          afterText: 'Ручная зачистка спецпрепаратами, фунгицидная замазка и озонирование воздуха. Безукоризненная белизна.',
          beforePic: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
          afterPic: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=80'
        };
      case 'commercial':
        return {
          title: 'Продуктовый склад (Дератизация)',
          beforeText: 'Поврежденные грызунами картонные коробки, следы жизнедеятельности мышей на стеллажах.',
          afterText: 'Раскладка парафиновых брикетов, заполнение нор полимерной пеной, установка электронных ловушек. Грызунов нет.',
          beforePic: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
          afterPic: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=600&q=80'
        };
      case 'cleaning':
      default:
        return {
          title: 'Гостиная зона после проведения ремонта',
          beforeText: 'Белый строительный осадок на паркете, разводы шпатлевки на окнах, строительный мусор.',
          afterText: 'Промышленный сбор пыли, влажная протирка всех поверхностей, удаление пятен цемента, чистый блеск.',
          beforePic: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80',
          afterPic: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80'
        };
    }
  };

  const galleryInfo = getBeforeAfterContent();

  return (
    <div className="min-h-screen bg-zinc-50/50 font-sans text-zinc-900 antialiased selection:bg-emerald-500 selection:text-white pb-12 bg-grid-pattern">
      
      {/* Toast Notification */}
      {statusMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-white rounded-2xl shadow-2xl border border-zinc-100 p-4 animate-fade-in flex items-start gap-3">
          <div className="mt-0.5 bg-emerald-50 text-emerald-600 rounded-full p-1.5 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-zinc-900 text-xs">Уведомление системы</h4>
            <p className="text-[11px] text-zinc-500 mt-0.5">{statusMessage}</p>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-zinc-400 hover:text-zinc-600 transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating high-conversion panel */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <a 
          href="https://wa.me/996700446744" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-5 rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5 text-xs tracking-wider"
          id="floating-whatsapp"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>СВЯЗАТЬСЯ В WHATSAPP</span>
        </a>
      </div>

      <div className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col gap-2">
        <a 
          href="https://instagram.com/dezinfeksiya.kg" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-850 text-white font-bold py-3 px-5 rounded-full shadow-lg transition-all hover:-translate-y-0.5 text-xs tracking-wider border border-white/10"
          id="floating-instagram"
        >
          <Instagram className="w-4 h-4 text-pink-500" />
          <span>НАШ INSTAGRAM</span>
        </a>
      </div>

      {/* Premium Header Navigation */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200/50 transition-all transition-shadow duration-300 shadow-sm" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-emerald-400 fill-emerald-400/15" />
            </div>
            <div>
              <div className="flex items-center gap-0.5 leading-none">
                <span className="text-xl font-bold tracking-tight text-zinc-950">dezinfeksiya</span>
                <span className="text-xl font-black text-emerald-500 tracking-tight">.kg</span>
              </div>
              <span className="text-[9px] text-zinc-400 font-extrabold uppercase tracking-widest block mt-0.5">Санитарная Служба</span>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="bg-zinc-100 rounded-lg p-2 text-zinc-600">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Кыргызстан</p>
                <p className="text-xs font-bold text-zinc-700">Работаем везде</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="bg-zinc-100 rounded-lg p-2 text-zinc-600">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Режим работы</p>
                <p className="text-xs font-bold text-zinc-700">07:00 – 03:00 • 7 дней</p>
              </div>
            </div>
          </div>

          {/* Core Contacts */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 rounded px-1.5 py-0.5 uppercase tracking-wide">Звоните в КР</span>
              <a href="tel:+996700446744" className="text-sm font-extrabold text-zinc-950 hover:text-emerald-500 transition-colors mt-0.5">+996 700 446 744</a>
            </div>
            <button 
              onClick={() => setModalOpen('callback')}
              className="bg-zinc-950 hover:bg-emerald-600 hover:text-white text-white font-bold text-[10px] uppercase tracking-wider py-2.5 px-4.5 rounded-lg transition-all duration-200 transform active:scale-95 shadow-sm"
              id="nav-consult-btn"
            >
              Консультация
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 lg:py-20 bg-white" id="hero-section">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-50/50 rounded-l-[100px] -z-10 hidden lg:block" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Premium Synergetic Badge */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-zinc-150 text-zinc-700 border border-zinc-200 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase">
                  ⭐ Опыт дезинфекции более 14 лет
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                  🛡️ 100% Результат и Гарантия по договору
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-950 leading-[1.1] tracking-tight">
                Уничтожаем вредителей, вирусы и грязь. <span className="text-emerald-500">Профессиональная дезинфекция и клининг</span> в Кыргызстане.
              </h1>

              {/* Subtext */}
              <p className="text-sm sm:text-base text-zinc-500 max-w-xl leading-relaxed">
                Безопасная профессиональная обработка жилых домов и сертифицированное обслуживание коммерческих предприятий. Мы берем на себя полную санитарную ответственность — от уничтожения паразитов до сияющей уборки.
              </p>

              {/* Action Board */}
              <div className="flex flex-wrap gap-3 pt-3">
                <a 
                  href="#calculator-section"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-4 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-xs uppercase tracking-wider"
                >
                  <MousePointerClick className="w-4 h-4" />
                  Узнать стоимость за 1 минуту
                </a>
                <button 
                  onClick={() => setModalOpen('callback')}
                  className="border border-zinc-200 hover:border-zinc-300 bg-white text-zinc-700 hover:text-zinc-900 font-extrabold px-6 py-4 rounded-xl transition-all flex items-center gap-2 text-xs uppercase tracking-wider"
                >
                  Индивидуальный расчет
                </button>
              </div>

              {/* Minimal Trust Indicator Footnotes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-150/80">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 text-sm">🧪</span>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wide">Нетоксичная химия</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 text-sm">📑</span>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wide">Договор и гарантия</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 text-sm">🚑</span>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wide">Срочный выезд</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 text-sm">🎖️</span>
                  <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wide">Высшие лицензии КР</span>
                </div>
              </div>

            </div>

            {/* Live Operations Tracker Widget (Social Proof Dashboard) */}
            <div className="lg:col-span-5">
              <div className="bg-zinc-950 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden ring-1 ring-white/10" id="hero-card-widget">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                    <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">Мониторинг заявок КР</h3>
                  </div>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">LIVE FEED</span>
                </div>

                {/* Operations logs */}
                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                  {recentLeads && recentLeads.length > 0 ? (
                    recentLeads.slice(0, 4).map((lead, i) => (
                      <div key={lead.id || i} className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-start gap-2.5 hover:bg-white/10 transition-colors">
                        <span className="text-xs">⚡</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-white truncate">{lead.name}</h4>
                            <span className="text-[9px] text-zinc-400">
                              {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-300 mt-0.5">Услуга: <span className="font-semibold text-emerald-400">{lead.serviceType}</span></p>
                          <p className="text-[9px] text-zinc-500 mt-1">✓ Передано дежурной бригаде</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0">Б</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xs font-bold text-white">Бишкек (улица Киевская)</h3>
                            <span className="text-[9px] text-zinc-400">9 мин назад</span>
                          </div>
                          <p className="text-[11px] text-zinc-300">Дезинсекция от тараканов в квартире</p>
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded mt-1 inline-block uppercase">В обработке</span>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded bg-blue-500/20 text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0">О</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xs font-bold text-white">Ош (ул. Масалиева)</h3>
                            <span className="text-[9px] text-zinc-400">22 мин назад</span>
                          </div>
                          <p className="text-[11px] text-zinc-300">Генеральный клининг стоматологии</p>
                          <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded mt-1 inline-block uppercase">Едет бригада</span>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded bg-purple-500/20 text-purple-400 font-bold text-[10px] flex items-center justify-center shrink-0">Ч</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xs font-bold text-white">Чолпон-Ата</h3>
                            <span className="text-[9px] text-zinc-400">38 мин назад</span>
                          </div>
                          <p className="text-[11px] text-zinc-300">Полный вывод клопов в мини-отеле</p>
                          <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded mt-1 inline-block uppercase">Завершено</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/5 text-emerald-400 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <p className="text-[11px] text-zinc-400">Полностью защищенные персональные данные клиентов. Полная анонимность гарантирована.</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Target Pest List Section */}
      <section className="py-16 bg-white" id="threats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase text-emerald-600 tracking-widest block mb-2 font-mono">Эффективность 100%</span>
            <h2 className="text-3xl font-black text-zinc-950 leading-tight">Что именно мы уничтожаем безвозвратно</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PEST_CARDS.map((card) => (
              <div 
                key={card.id} 
                className="bg-white border border-zinc-200/70 hover:border-emerald-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 group flex flex-col justify-between"
                id={`threat-card-${card.id}`}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-zinc-50 group-hover:bg-emerald-50 text-2xl flex items-center justify-center transition-colors mb-4 border border-zinc-100">
                    {card.icon}
                  </div>
                  <h3 className="text-base font-extrabold text-zinc-950 mb-1">{card.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed min-h-[48px] mb-4">{card.desc}</p>
                </div>

                <div className="border-t border-zinc-100 pt-4 mt-auto">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-zinc-400">Стоимость:</span>
                    <span className="font-extrabold text-emerald-600 font-mono text-xs">{card.price}</span>
                  </div>
                  <button 
                    onClick={() => triggerQuickOrder(`Заявка на: ${card.title}`)}
                    className="w-full bg-zinc-100 text-zinc-800 hover:bg-emerald-500 hover:text-white font-bold py-2 px-3 rounded-lg text-[10px] tracking-wider transition-all uppercase"
                  >
                    Заказать услугу
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Arsenal & Methods Gallery Section */}
      <section className="py-16 bg-white border-t border-zinc-200/40 scroll-mt-20" id="arsenal-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase text-emerald-600 tracking-widest block mb-2 font-mono">ТЕХНОЛОГИЧЕСКОЕ ПРЕВОСХОДСТВО</span>
            <h2 className="text-3xl font-black text-zinc-950 leading-tight">Препараты, Запах и СЭС Оборудование</h2>
            <p className="text-zinc-500 mt-2 text-xs sm:text-sm">
              Мы используем только лицензированные препараты и профессиональные генераторы. Выберите необходимую конфигурацию химии или метод распыления для просмотра характеристик.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-10 bg-zinc-100 p-1.5 rounded-2xl max-w-xl mx-auto">
            <button
              onClick={() => setActiveArsenalTab('chemistry')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeArsenalTab === 'chemistry'
                  ? 'bg-zinc-950 text-white shadow font-extrabold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <span>🔬 Препараты & Классы Запаха</span>
            </button>
            <button
              onClick={() => setActiveArsenalTab('equipment')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeArsenalTab === 'equipment'
                  ? 'bg-zinc-950 text-white shadow font-extrabold'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <span>⚙️ Технологии & Генераторы</span>
            </button>
          </div>

          {/* Active Tab Panel */}
          {activeArsenalTab === 'chemistry' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Bayer (Германия) */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] p-6 hover:shadow-xl transition-all hover:border-emerald-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl bg-emerald-50 text-emerald-600 p-2 rounded-xl">🛡️</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-800 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Премиум Без Запаха</span>
                  </div>
                  <h3 className="text-base font-black text-zinc-950">Bayer (Германия)</h3>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1">Оригинальный премиум класс</p>
                  <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                    Абсолютно нетоксичные, гипоаллергенные европейские препараты. Разрешены для использования в спальнях, детских садах, на пищевых производствах. Гарантия отсутствия едких паров, следов на мебели и остаточных запахов.
                  </p>
                  <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-[10px] mt-4 font-semibold leading-normal">
                    📌 Рекомендуется для квартир с грудными детьми, аллергиками и домашними животными.
                  </div>
                </div>
                <button
                  onClick={() => selectArsenalChoice('prep', 'bayer')}
                  className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Выбрать этот препарат
                </button>
              </div>

              {/* Россия Легкий запах */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] p-6 hover:shadow-xl transition-all hover:border-emerald-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl bg-zinc-100 text-zinc-700 p-2 rounded-xl">🇷🇺</span>
                    <span className="text-[9px] bg-zinc-200 text-zinc-700 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Стандарт • Легкий аромат</span>
                  </div>
                  <h3 className="text-base font-black text-zinc-950">СЭС Россия</h3>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1">Классический инсектицид</p>
                  <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                    Отечественные препараты широкого спектра. Имеют умеренно выраженный технический запах, который полностью выветривается после 2-3 часов сквозного проветривания. Отличная поражающая способность при экономном бюджете.
                  </p>
                  <div className="bg-zinc-200/55 text-zinc-700 p-3 rounded-xl text-[10px] mt-4 font-semibold leading-normal">
                    📌 Требует отсутствия в помещении на 2-3 часа во время и после обработки.
                  </div>
                </div>
                <button
                  onClick={() => selectArsenalChoice('prep', 'russia')}
                  className="mt-6 w-full bg-zinc-950 hover:bg-emerald-500 hover:text-white text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Выбрать этот препарат
                </button>
              </div>

              {/* Китай Сильный запах */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] p-6 hover:shadow-xl transition-all hover:border-red-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl bg-red-50 text-red-600 p-2 rounded-xl">🇨🇳</span>
                    <span className="text-[9px] bg-red-100 text-red-800 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Бюджет • Стойкий запах</span>
                  </div>
                  <h3 className="text-base font-black text-zinc-950">СЭС Китай</h3>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1">Реактивная жесткая химия</p>
                  <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                    Препараты повышенной разрушительной силы. Обладают специфическим, резким карболовым запахом, который держится до 24 часов. Гарантированно выжигает любые инкубационные яйца паразитов даже на открытых площадках.
                  </p>
                  <div className="bg-red-50 text-red-800 p-3 rounded-xl text-[10px] mt-4 font-semibold leading-normal">
                    📌 Рекомендуется для нежилых заброшенных подвалов, чердаков, складов.
                  </div>
                </div>
                <button
                  onClick={() => selectArsenalChoice('prep', 'china')}
                  className="mt-6 w-full bg-zinc-950 hover:bg-emerald-500 hover:text-white text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Выбрать этот препарат
                </button>
              </div>

              {/* Цифокс */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] p-6 hover:shadow-xl transition-all hover:border-zinc-800/20 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl bg-zinc-200 text-zinc-800 p-2 rounded-xl">🧪</span>
                    <span className="text-[9px] bg-zinc-300 text-zinc-900 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Цифокс (Россия)</span>
                  </div>
                  <h3 className="text-base font-black text-zinc-950">Цифокс СЭС Эмульсия</h3>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1">Супер концентрат циперметрина</p>
                  <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                    Легендарный сертифицированный препарат широкого действия. Мгновенно кристаллизуется на поверхности, создавая непреодолимый контактный барьер против тараканов, клопов, блох целыми месяцами.
                  </p>
                  <div className="bg-zinc-200 text-zinc-800 p-3 rounded-xl text-[10px] mt-4 font-semibold leading-normal">
                    📌 Разрешен СЭС КР для детских садов, отелей, ЖД вокзалов и коммерческого сектора.
                  </div>
                </div>
                <button
                  onClick={() => selectArsenalChoice('prep', 'cyfox')}
                  className="mt-6 w-full bg-zinc-950 hover:bg-emerald-500 hover:text-white text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Выбрать этот препарат
                </button>
              </div>

              {/* Агран */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] p-6 hover:shadow-xl transition-all hover:border-amber-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl bg-amber-50 text-amber-700 p-2 rounded-xl">☠️</span>
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Агран (Двойной удар)</span>
                  </div>
                  <h3 className="text-base font-black text-zinc-950">Агран Концентрат</h3>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1">Хлорпирифос + Циперметрин</p>
                  <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                    Двухкомпонентный препарат убойной мощности. Рекомендуется в самых запущенных случаях, когда насекомые выработали иммунитет к прочим магазинным ядам и мелкам. Мультипликативный эффект.
                  </p>
                  <div className="bg-amber-50 text-amber-900 p-3 rounded-xl text-[10px] mt-4 font-semibold leading-normal">
                    📌 Имеет характерный ядовитый химический запах. Требует герметизации помещения.
                  </div>
                </div>
                <button
                  onClick={() => selectArsenalChoice('prep', 'agran')}
                  className="mt-6 w-full bg-zinc-950 hover:bg-emerald-500 hover:text-white text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Выбрать этот препарат
                </button>
              </div>

              {/* Гели, Яды, Липучки ловушки */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] p-6 hover:shadow-xl transition-all hover:border-teal-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl bg-teal-50 text-teal-600 p-2 rounded-xl">🪤</span>
                    <span className="text-[9px] bg-teal-100 text-teal-800 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">Барьеры & Клейкие системы</span>
                  </div>
                  <h3 className="text-base font-black text-zinc-950">Гель, Ловушки и Липучки</h3>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1">Механические и пастообразные барьеры</p>
                  <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
                    Альтернативные методы защиты без влажного распыления. Картриджи с гелем дезинфекторы раскладывают в петли бытовой техники. Приманки-липучки и домики блокируют пути перемещения крыс и мышей.
                  </p>
                  <div className="bg-teal-50 text-teal-800 p-3 rounded-xl text-[10px] mt-4 font-semibold leading-normal">
                    📌 100% безопасность. Используется как профилактический щит у вентиляционных труб.
                  </div>
                </div>
                <button
                  onClick={() => selectArsenalChoice('prep', 'gel')}
                  className="mt-6 w-full bg-zinc-950 hover:bg-emerald-500 hover:text-white text-white font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Выбрать этот метод
                </button>
              </div>

            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Холодный туман */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] p-6 hover:shadow-xl transition-all hover:border-emerald-500/25 flex flex-col justify-between">
                <div>
                  <span className="text-3xl bg-emerald-50 text-emerald-600 p-3 rounded-2xl inline-block mb-4">🌬️</span>
                  <h3 className="text-base font-black text-zinc-950">Холодный туман</h3>
                  <p className="text-[9px] bg-emerald-500/10 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block mt-1">Дисперсия до 50 мкм</p>
                  <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
                    Препарат превращается компрессорным генератором в мелкодисперсное висящее облако. Частицы тумана постепенно просачиваются во все скрытые полости, ложась защитной микропленкой.
                  </p>
                </div>
                <button
                  onClick={() => selectArsenalChoice('tech', 'cold_fog')}
                  className="mt-6 w-full bg-zinc-950 hover:bg-emerald-500 hover:text-white text-white font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-widest cursor-pointer transition-all"
                >
                  Выбрать технологию
                </button>
              </div>

              {/* Горячий туман & Пушка */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] p-6 hover:shadow-xl transition-all hover:border-amber-500/25 flex flex-col justify-between">
                <div>
                  <span className="text-3xl bg-amber-50 text-amber-600 p-3 rounded-2xl inline-block mb-4">🔥</span>
                  <h3 className="text-base font-black text-zinc-950">Горячий туман & Пушка</h3>
                  <p className="text-[9px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block mt-1">Бензиновые пушки</p>
                  <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
                    За счет мгновенного термо-разогрева авиационной пушкой, капля сжимается до 20 микрон. Гарячий пар заполняет 100% объема за секунды и висит в воздухе часами.
                  </p>
                </div>
                <button
                  onClick={() => selectArsenalChoice('tech', 'hot_fog')}
                  className="mt-6 w-full bg-zinc-950 hover:bg-emerald-500 hover:text-white text-white font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-widest cursor-pointer transition-all"
                >
                  Выбрать технологию
                </button>
              </div>

              {/* Распыление жидким */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] p-6 hover:shadow-xl transition-all hover:border-blue-500/25 flex flex-col justify-between">
                <div>
                  <span className="text-3xl bg-blue-50 text-blue-600 p-3 rounded-2xl inline-block mb-4">💦</span>
                  <h3 className="text-base font-black text-zinc-950">Распыление Жидким</h3>
                  <p className="text-[9px] bg-blue-500/10 text-blue-800 font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block mt-1">Прямой струйный контакт</p>
                  <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
                    Классическое орошение помповыми аппаратами высокого давления. Дает возможность концентрированно, точечно пролить гнезда клопов, норы грызунов без задымления мебели.
                  </p>
                </div>
                <button
                  onClick={() => selectArsenalChoice('tech', 'spraying')}
                  className="mt-6 w-full bg-zinc-950 hover:bg-emerald-500 hover:text-white text-white font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-widest cursor-pointer transition-all"
                >
                  Выбрать технологию
                </button>
              </div>

              {/* Сухой туман */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] p-6 hover:shadow-xl transition-all hover:border-purple-500/25 flex flex-col justify-between">
                <div>
                  <span className="text-3xl bg-purple-50 text-purple-600 p-3 rounded-2xl inline-block mb-4">💨</span>
                  <h3 className="text-base font-black text-zinc-950">Сухой туман</h3>
                  <p className="text-[9px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block mt-1">Освежение & Очистка запаха</p>
                  <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
                    Специальный дымогенератор превращает эфирные нейтрализаторы в сухие микро-кристаллы. Метод идеально устраняет запахи трупных ядов, гари, химии, залежалости.
                  </p>
                </div>
                <button
                  onClick={() => selectArsenalChoice('tech', 'dry_fog')}
                  className="mt-6 w-full bg-zinc-950 hover:bg-emerald-500 hover:text-white text-white font-bold py-2.5 rounded-xl text-[10px] uppercase tracking-widest cursor-pointer transition-all"
                >
                  Выбрать технологию
                </button>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Premium Compact directions list */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200/40" id="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase text-zinc-400 tracking-widest block mb-1">Фокус Решений</span>
            <h2 className="text-3xl font-black text-zinc-900 leading-tight">Профессиональный Спектр Работ по СанПиН</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GENERAL_SERVICES.map((s, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-zinc-950 mb-1 leading-tight">{s.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{s.text}</p>
                  <button 
                    onClick={() => triggerQuickOrder(`Детали по: ${s.title}`)}
                    className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest"
                  >
                    Заказать дезинфекцию <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Smart Onboarding Form (Modern Calculator) */}
      <section className="py-16 bg-white overflow-hidden scroll-mt-20" id="calculator-section">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-10">
            <span className="bg-emerald-500/10 text-emerald-800 text-[10px] font-mono tracking-widest font-extrabold uppercase px-3 py-1 rounded-full inline-block">
              ИНТЕЛЛЕКТУАЛЬНЫЙ СЕРВИС
            </span>
            <h2 className="text-3xl font-black text-charcoal sm:leading-tight tracking-tight mt-2.5">Заказ расчета с гарантией цены</h2>
            <p className="text-xs text-zinc-400 mt-1">Итоговая стоимость фиксируется в договоре и не меняется ни на один сом!</p>
          </div>

          <div className="bg-zinc-950 text-white rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative border border-white/5">
            <div className="absolute -left-20 -top-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-8 relative z-10">
              
              {/* Step 1: Object Grid */}
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Шаг 1: Выберите тип вашего помещения</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'apartment', label: '🏡 Квартира', desc: 'Уютный дом' },
                    { id: 'house', label: '🏘️ Коттедж', desc: 'Частный сектор' },
                    { id: 'office', label: '💼 Офис', desc: 'Для сотрудников' },
                    { id: 'cafe', label: '☕ Ресторан', desc: 'Кухня и залы' },
                    { id: 'warehouse', label: '📦 Склад', desc: 'Товарная площадь' },
                  ].map((obj) => (
                    <button
                      key={obj.id}
                      onClick={() => setCalcObjectType(obj.id)}
                      className={`text-left p-3.5 rounded-2xl font-bold transition-all border cursor-pointer ${
                        calcObjectType === obj.id
                          ? 'border-emerald-500 bg-emerald-500 text-zinc-950'
                          : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xs block">{obj.label}</span>
                      <span className={`text-[9px] font-medium block mt-0.5 ${calcObjectType === obj.id ? 'text-zinc-900' : 'text-zinc-400'}`}>{obj.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Service Grid */}
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Шаг 2: Какая услуга необходима</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'tarakan', label: '🦗 Тараканы' },
                    { id: 'klop', label: '🪲 Постельные клопы' },
                    { id: 'disinfection', label: '🦠 Вирусы/Плесень' },
                    { id: 'cleaning', label: '✨ Премиум клининг' },
                  ].map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => setCalcService(srv.id)}
                      className={`p-3.5 rounded-2xl text-xs font-bold transition-all text-center border cursor-pointer ${
                        calcService === srv.id
                          ? 'border-emerald-500 bg-emerald-500 text-zinc-950'
                          : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      {srv.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Area Slider */}
              <div className="bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest block">Шаг 3: Какая площадь обрабатывается?</label>
                  <span className="text-sm font-extrabold text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-lg">{calcArea} кв.м.</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  value={calcArea} 
                  onChange={(e) => setCalcArea(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                />
                <div className="flex justify-between text-[9px] text-zinc-500 mt-2 font-bold uppercase tracking-wider">
                  <span>10 кв.м.</span>
                  <span>100 кв.м.</span>
                  <span>250 кв.м.</span>
                  <span>500 кв.м.</span>
                </div>
              </div>

              {/* Step 4: Technology & Methods Choice */}
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Шаг 4: Метод орошения & Оборудование</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'cold_fog', label: '🌬️ Холодный туман', desc: 'Ультра-капли СЭС' },
                    { id: 'hot_fog', label: '🔥 Горячий туман', desc: 'Термозавеса' },
                    { id: 'spraying', label: '💦 Жидкое распыление', desc: 'Помповый метод' },
                    { id: 'cannon', label: '🔫 Пушка / Генератор', desc: 'Мощный удар' },
                    { id: 'dry_fog', label: '💨 Сухой туман', desc: 'Для дезодорации' },
                    { id: 'gel', label: '🧴 Профессиональный гель', desc: 'Локальные барьеры' },
                    { id: 'bait', label: '🪤 Липучка / Приманка', desc: 'Клейкие ловушки' },
                  ].map((tech) => (
                    <button
                      key={tech.id}
                      onClick={() => setCalcTech(tech.id)}
                      className={`text-left p-3.5 rounded-2xl font-bold transition-all border cursor-pointer ${
                        calcTech === tech.id
                          ? 'border-emerald-500 bg-emerald-500 text-zinc-950'
                          : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xs block font-bold">{tech.label}</span>
                      <span className={`text-[8px] font-medium block mt-0.5 ${calcTech === tech.id ? 'text-zinc-900' : 'text-zinc-400'}`}>{tech.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Chemistry and Smell selection */}
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3 block">Шаг 5: Выбор препарата, качества и уровня запаха</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'bayer', label: '🛡️ Bayer (Германия) • Без запаха', desc: 'Премиум, гипоаллергенно, безопасно для детей и кошек' },
                    { id: 'russia', label: '🇷🇺 Россия • Легкий запах', desc: 'Надежные СЭС препараты, выветривание за 2-3 часа' },
                    { id: 'china', label: '🇨🇳 Китай • Сильный запах', desc: 'Максимум силы и едкости, для нежилых блоков' },
                    { id: 'cyfox', label: '🧪 Цифокс • Классика СЭС', desc: 'Рыбинск, убойный барьер от клещей и клопов' },
                    { id: 'agran', label: '☠️ Агран • Двойная сила', desc: 'Индия/Китай, концентрат от резистентных видов' },
                  ].map((prep) => (
                    <button
                      key={prep.id}
                      onClick={() => setCalcPrep(prep.id)}
                      className={`text-left p-3.5 rounded-2xl font-bold transition-all border cursor-pointer ${
                        calcPrep === prep.id
                          ? 'border-emerald-500 bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/10'
                          : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xs block font-bold">{prep.label}</span>
                      <span className={`text-[9px] font-medium block mt-1 leading-normal ${calcPrep === prep.id ? 'text-zinc-900' : 'text-zinc-400'}`}>{prep.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 6: Cost Board & Customer contacts */}
              <div className="border-t border-white/10 pt-6 space-y-6">
                
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-3xl flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-widest font-mono">Детали расчета стоимости</span>
                    <p className="text-[11px] text-zinc-400 mt-1">Оценочная стоимость комплексной качественной обработки:</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                      от {calcEstimatedPrice().toLocaleString()} сом
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Ваше Имя</label>
                    <input 
                      type="text" 
                      placeholder="Имя получателя" 
                      value={calcName}
                      onChange={(e) => setCalcName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Телефон (Связь круглосуточно)</label>
                    <input 
                      type="tel" 
                      placeholder="Например: 0700 446 744" 
                      value={calcPhone}
                      onChange={(e) => setCalcPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => handleLeadSubmit({
                    name: calcName || 'Заявка с калькулятора',
                    phone: calcPhone,
                    serviceType: `${calcService} (${calcObjectType}) • ${calcPrep} (${calcTech})`,
                    comment: `Запрос через smart-калькулятор. Рекомендуемый бюджет: от ${calcEstimatedPrice()} сом. Площадь: ${calcArea} кв.м. Выбранный Препарат: ${calcPrep === 'bayer' ? 'Без запаха Bayer (Германия)' : calcPrep === 'russia' ? 'Легкий запах Россия' : calcPrep === 'china' ? 'Сильный запах Китай' : calcPrep === 'cyfox' ? 'Цифокс СЭС' : 'Агран Сверхсильный'}. Технология: ${calcTech === 'cold_fog' ? 'Холодный туман' : calcTech === 'hot_fog' ? 'Горячий туман' : calcTech === 'spraying' ? 'Жидкое распыление помпой' : calcTech === 'cannon' ? 'Сброс пушкой/генератором' : calcTech === 'dry_fog' ? 'Сухой туман' : calcTech === 'gel' ? 'Гелевые барьеры' : 'Ловушки и липучки'}.`
                  })}
                  disabled={isSubmitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] transition-all text-zinc-950 py-4 rounded-xl font-extrabold text-xs uppercase tracking-widest cursor-pointer text-center hover:shadow-lg hover:shadow-emerald-500/15"
                >
                  {isSubmitting ? 'Вызов серверов...' : 'ЗАБРОНИРОВАТЬ ДАТУ НА СЕГОДНЯ'}
                </button>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Pricing Matrix */}
      <section className="py-16 bg-zinc-50 border-y border-zinc-200/50" id="pricing-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase text-emerald-600 tracking-widest block mb-1">Справедливый тариф</span>
            <h2 className="text-3xl font-black text-zinc-950 leading-tight">Прозрачный фиксированный прайс-лист</h2>
          </div>

          <div className="bg-white rounded-[2rem] border border-zinc-200/60 overflow-hidden shadow-sm max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950 text-white text-[10px] font-bold uppercase tracking-widest">
                    <th className="py-4.5 px-6">Услуга для Квартир / Домов / Фирм</th>
                    <th className="py-4.5 px-6 hidden md:table-cell">Инновационная методика</th>
                    <th className="py-3 px-6 text-right">Начальный бюджет</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-zinc-150 text-zinc-700">
                  <tr className="hover:bg-zinc-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-zinc-900">🦗 Тотальная дезинсекция клопов</td>
                    <td className="py-4 px-6 hidden md:table-cell text-zinc-500">Генераторы плотного холодного и горячего тумана</td>
                    <td className="py-4 px-6 text-right font-extrabold text-zinc-950">от 2000 сом</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-zinc-900">🦗 Уничтожение весенних тараканов</td>
                    <td className="py-4 px-6 hidden md:table-cell text-zinc-500">Микрокапсулы без запаха + гели длительного эффекта</td>
                    <td className="py-4 px-6 text-right font-extrabold text-zinc-950">от 1500 сом</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-zinc-900">🕷️ Борьба порошковая с муравьями</td>
                    <td className="py-4 px-6 hidden md:table-cell text-zinc-500">Локационный поиск гнезд, стерилизация маток колонии</td>
                    <td className="py-4 px-6 text-right font-extrabold text-zinc-950">от 1500 сом</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-zinc-900">🐀 Дератизация грызунов (крысы/мыши)</td>
                    <td className="py-4 px-6 hidden md:table-cell text-zinc-500">Раскладка датских приманок + запечатывание нор</td>
                    <td className="py-4 px-6 text-right font-extrabold text-zinc-950">от 2000 сом</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-zinc-900">🦠 Санация вирусов и плесени</td>
                    <td className="py-4 px-6 hidden md:table-cell text-zinc-500">Озонирование активным О3, удаление источников сырости</td>
                    <td className="py-4 px-6 text-right font-extrabold text-zinc-950">от 1500 сом</td>
                  </tr>
                  <tr className="hover:bg-zinc-50 transition-colors bg-emerald-500/[0.02]">
                    <td className="py-4 px-6 font-bold text-emerald-700">🧹 Генеральный эко-клининг</td>
                    <td className="py-4 px-6 hidden md:table-cell text-zinc-500">Глубокая влажная эко-уборка со средствами Kärcher</td>
                    <td className="py-4 px-6 text-right font-extrabold text-emerald-700">от 3500 сом</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* Before / After Slider */}
      <section className="py-16 bg-white" id="gallery-section">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase text-emerald-600 tracking-widest block mb-1">Фактические результаты</span>
            <h2 className="text-3xl font-black text-zinc-950">Визуальная галерея выполненных работ</h2>
          </div>

          {/* Clean Rounded Tabs */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-8 bg-zinc-100 p-1.5 rounded-2xl max-w-fit mx-auto">
            {[
              { id: 'tarakan', label: 'Тараканы' },
              { id: 'klop', label: 'Постельные клопы' },
              { id: 'disinfection', label: 'Плесень и грибок' },
              { id: 'cleaning', label: 'Клининг помещений' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveGalleryTab(tab.id)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeGalleryTab === tab.id
                    ? 'bg-zinc-950 text-white shadow'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Frame */}
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-[2rem] overflow-hidden shadow-xl text-left">
            <div className="p-5 border-b border-zinc-200/50 bg-white">
              <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-tight flex items-center gap-2">
                📂 {galleryInfo.title}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Before */}
              <div className="relative group border-r border-zinc-200/40">
                <img 
                  src={galleryInfo.beforePic} 
                  alt="До работы" 
                  className="w-full h-64 object-cover filter saturate-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
                  До санитарной обработки
                </div>
                <div className="p-4 bg-zinc-100/50 min-h-[70px]">
                  <p className="text-xs text-zinc-500 leading-relaxed">{galleryInfo.beforeText}</p>
                </div>
              </div>

              {/* After */}
              <div className="relative group">
                <img 
                  src={galleryInfo.afterPic} 
                  alt="После работы" 
                  className="w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
                  Результат после обработки
                </div>
                <div className="p-4 bg-white min-h-[70px]">
                  <p className="text-xs text-emerald-800 leading-relaxed font-bold">{galleryInfo.afterText}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 border-t border-zinc-200/60 text-center">
              <button 
                onClick={() => triggerQuickOrder(`Хочу такой же результат: ${galleryInfo.title}`)}
                className="inline-flex bg-zinc-950 hover:bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                Заказать аналогичную обработку под ключ
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Real Reviews Block */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-250/30" id="reviews-section">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <div className="mb-10">
            <span className="text-xs font-bold uppercase text-emerald-600 tracking-widest block mb-1">Реальные отзывы</span>
            <h2 className="text-3xl font-black text-zinc-950 leading-tight">Что говорят жители Кыргызстана</h2>
          </div>

          <div className="relative bg-white border border-zinc-200 rounded-[2rem] p-6 sm:p-10 shadow-md text-left">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-base font-extrabold text-zinc-900 flex items-center gap-2 leading-none">
                    💬 {REVIEWS[activeReviewIdx].name}
                    <span className="text-xs text-zinc-400 font-normal">({REVIEWS[activeReviewIdx].city})</span>
                  </h3>
                  <div className="flex items-center gap-0.5 mt-2 text-amber-400">
                    {[...Array(REVIEWS[activeReviewIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <span className="text-[9px] bg-zinc-100 border border-zinc-200/50 px-2.5 py-1 rounded-full text-zinc-500 font-bold uppercase tracking-wider font-mono">
                  {REVIEWS[activeReviewIdx].date}
                </span>
              </div>
              
              <p className="text-zinc-650 text-xs sm:text-sm leading-relaxed italic pr-2 font-serif text-zinc-600">
                "{REVIEWS[activeReviewIdx].text}"
              </p>
            </div>

            {/* Slider triggers */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-zinc-100">
              <span className="text-[10px] text-zinc-400 font-semibold tracking-wider uppercase">
                Запись {activeReviewIdx + 1} из {REVIEWS.length}
              </span>
              <div className="flex gap-1.5">
                <button 
                  onClick={handleReviewPrev}
                  className="bg-zinc-50 border hover:border-zinc-400 p-2 rounded-xl text-zinc-600 hover:text-zinc-950 transition-all cursor-pointer shadow-sm"
                  title="Назад"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleReviewNext}
                  className="bg-zinc-50 border hover:border-zinc-400 p-2 rounded-xl text-zinc-600 hover:text-zinc-950 transition-all cursor-pointer shadow-sm"
                  title="Дальше"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1 mt-5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveReviewIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                  activeReviewIdx === i ? 'bg-emerald-500 w-5' : 'bg-zinc-350'
                }`}
                title={`Отзыв ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 30% Cleaning Action block */}
      <section className="py-16 bg-zinc-950 text-white relative overflow-hidden ring-1 ring-white/10" id="cleaning-block">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/30 inline-block font-mono">
                ГЕНЕРАЛЬНЫЙ КЛИНИНГ & УБОРКА
              </span>
              <h2 className="text-3xl font-black leading-tight text-white">Профессиональный Клининг Клиентам dezinfeksiya.kg</h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Мы знаем, насколько утомительна уборка после дезинфекции или тяжелого строительства. Наша профессиональная клининговая бригада использует профессиональные пылесосы Kärcher и моющие средства, допущенные СанПин.
              </p>
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-3">
                <span className="text-xl">✨</span>
                <p className="text-[11px] text-zinc-300 font-bold">Заказывая Дезинфекцию и Генеральный Клининг вместе, вы получаете максимальную скидку!</p>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CLEANING_SERVICES.map((clean, index) => (
                <div key={index} className="bg-white/5 border border-white/5 p-5 rounded-2xl relative flex flex-col justify-between group hover:border-emerald-500/40 transition-colors">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1 leading-tight">{clean.title}</h3>
                    <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">{clean.text}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-3">
                    <span className="text-xs text-emerald-400 font-extrabold font-mono">{clean.price}</span>
                    <button 
                      onClick={() => triggerQuickOrder(`Заказ клининга: ${clean.title}`)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-zinc-900 font-black py-1.5 px-3 rounded-lg text-[9px] tracking-widest uppercase transition-colors"
                    >
                      ЗАЯВКА
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Main Lead Call-to-Action Form */}
      <section className="py-16 bg-white shrink-0 scroll-mt-20" id="lead-form-section">
        <div className="max-w-xl mx-auto px-4">
          
          <div className="text-center mb-8 bg-zinc-50 border border-zinc-200/60 p-4.5 rounded-2xl">
            <span className="text-zinc-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
              Сегодня выезд дежурного врача на объект за 0 сом!
            </span>
          </div>

          <div className="border border-zinc-200 rounded-[2rem] p-6 sm:p-8 bg-zinc-50 shadow-md">
            <h2 className="text-2xl font-black text-zinc-950 text-center leading-tight">Получите бесплатную консультацию санитарного эксперта</h2>
            <p className="text-zinc-500 text-xs text-center mt-1">Оставьте свои контакты ниже. Наш санитарный отряд свяжется с вами через 5 минут.</p>

            <div className="space-y-4 mt-6">
              
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Как к вам обращаться</label>
                <input 
                  type="text" 
                  placeholder="Например: Арсен" 
                  value={consultName}
                  onChange={(e) => setConsultName(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Номер телефона *</label>
                <input 
                  type="tel" 
                  placeholder="Рекомендуется О!, Beeline, Megacom" 
                  value={consultPhone}
                  onChange={(e) => setConsultPhone(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Срочная сануслуга</label>
                <select 
                  value={consultService}
                  onChange={(e) => setConsultService(e.target.value)}
                  className="w-full bg-white border border-zinc-200/80 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Уничтожение тараканов">Уничтожение тараканов (от 1500 сом)</option>
                  <option value="Уничтожение клопов">Уничтожение клопов (от 2000 сом)</option>
                  <option value="Уничтожение блох">Уничтожение блох (от 1500 сом)</option>
                  <option value="Уничтожение муравьев">Уничтожение муравьев (от 1500 сом)</option>
                  <option value="Уничтожение грызунов">Уничтожение крыс/мышей (от 2000 сом)</option>
                  <option value="Дезинфекция помещений">Дезинфекция вирусов и плесени (от 1500 сом)</option>
                  <option value="Клининг помещений">Клининговые работы (от 3500 сом)</option>
                  <option value="Прочая консультация">Нужен просто совет эпидемиолога</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Пожелания (Необязательно)</label>
                <textarea 
                  rows={2}
                  placeholder="Дополнительные комментарии..." 
                  value={consultComment}
                  onChange={(e) => setConsultComment(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                ></textarea>
              </div>

              <button
                onClick={() => handleLeadSubmit({
                  name: consultName || 'Запрос общего звонка',
                  phone: consultPhone,
                  serviceType: consultService,
                  comment: consultComment
                })}
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] font-extrabold text-xs text-zinc-950 uppercase py-4 rounded-xl shadow-md transition-all cursor-pointer text-center tracking-widest"
              >
                {isSubmitting ? 'РЕГИСТРАЦИЯ ЗАПРОСА...' : 'ПОДТВЕРДИТЬ И ОТПРАВИТЬ СЕЙЧАС'}
              </button>

              <p className="text-[9px] text-center text-zinc-400 leading-relaxed font-semibold uppercase tracking-wider">Нажимая кнопку, вы подтверждаете согласие с анонимной обработкой.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Map & Contacts info */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200" id="contacts-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
            
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-600 tracking-widest block mb-1 font-mono">Прямая связь</span>
                <h2 className="text-3xl font-black text-zinc-950">Контакты dezinfeksiya.kg</h2>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Вы можете позвонить нам в любое время или задать вопрос дежурному врачу напрямую в WhatsApp.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Все провайдеры в КР</p>
                    <div className="flex flex-col text-xs font-bold text-zinc-800 gap-0.5 mt-0.5">
                      <a href="tel:+996700446744" className="hover:text-emerald-500 transition-colors">0700 446 744 (O! - Главный)</a>
                      <a href="tel:+996554446744" className="hover:text-emerald-500 transition-colors">0554 446 744 (Mega)</a>
                      <a href="tel:+996222446744" className="hover:text-emerald-500 transition-colors">0222 446 744 (Beeline)</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Официальный чат компании</p>
                    <a href="https://wa.me/996700446744" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-600 hover:underline block mt-0.5">
                      Написать дежурному врачу в WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Instagram</p>
                    <a href="https://instagram.com/dezinfeksiya.kg" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-pink-600 hover:underline block mt-0.5">
                      @dezinfeksiya.kg (Рабочие кейсы и новости)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Адрес штаб-квартиры</p>
                    <p className="text-xs font-extrabold text-zinc-800 mt-0.5">Кыргызстан, г. Бишкек</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Geographical Map Layout Schema */}
            <div className="lg:col-span-7 bg-zinc-950 text-white border border-white/5 rounded-[2rem] p-6 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-widest font-mono">ГЕОГРАФИЯ</span>
                <h3 className="text-base font-bold text-white uppercase tracking-wider mt-3">Быстрое покрытие во всех областях КР</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Имеем оперативные штабные группы дежурства в Бишкеке и Оше. Осуществляем экстренные загородные рейсы во все регионы.
                </p>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center space-y-4 my-6">
                <span className="text-[9px] text-zinc-500 font-bold tracking-widest uppercase block">Карта присутствия</span>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {['Бишкек', 'Ош', 'Токмок', 'Кара-Балта', 'Чолпон-Ата', 'Каракол', 'Джалал-Абад', 'Нарын', 'Талас', 'Баткен'].map((city) => (
                    <span key={city} className="bg-white/10 text-white font-semibold px-3 py-1 rounded-lg text-xs leading-none">
                      📍 {city}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-emerald-400 font-extrabold">🚀 Среднее время прибытия санотряда: менее 2 часов</p>
              </div>

              <div className="text-[11px] text-zinc-500 italic text-center">
                * Предоставляем полный пакет бухгалтерских документов и СанПиН сертификаты государственного образца КР.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Black Footer */}
      <footer className="bg-zinc-950 text-zinc-500 text-xs py-12 border-t border-white/5" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-white/5 pb-8">
            
            <div className="space-y-3">
              <div className="flex items-center gap-0.5 leading-none">
                <span className="text-lg font-bold text-white">dezinfeksiya</span>
                <span className="text-lg font-black text-emerald-400">.kg</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Современная сертифицированная дезинфекционная санитарная компания. Опыт работы по СЭС нормам более 14 лет.
              </p>
              <div className="flex items-center gap-3 text-[11px]">
                <a href="https://wa.me/996700446744" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
                <span>•</span>
                <a href="https://instagram.com/dezinfeksiya.kg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Санитарные услуги СЭС</h4>
              <ul className="space-y-1.5 text-[11px] text-zinc-400">
                <li><a href="#threats-section" className="hover:text-emerald-400 transition-colors">Выведение клопов</a></li>
                <li><a href="#threats-section" className="hover:text-emerald-400 transition-colors">Уничтожение вредителей сада</a></li>
                <li><a href="#threats-section" className="hover:text-emerald-400 transition-colors">Борьба с домашними тараканами</a></li>
                <li><a href="#threats-section" className="hover:text-emerald-400 transition-colors">Дезинфекция вирусов и плесени</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Клининговые услуги</h4>
              <ul className="space-y-1.5 text-[11px] text-zinc-400">
                <li><a href="#cleaning-block" className="hover:text-emerald-400 transition-colors">Генеральная глубокая уборка</a></li>
                <li><a href="#cleaning-block" className="hover:text-emerald-400 transition-colors">Уборка объектов после ремонта</a></li>
                <li><a href="#cleaning-block" className="hover:text-emerald-400 transition-colors">Влажная уборка от пыли</a></li>
                <li><a href="#cleaning-block" className="hover:text-emerald-400 transition-colors">Экстракторная чистка мебели</a></li>
              </ul>
            </div>

            <div className="space-y-2 text-[11px]">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Режим работы в КР</h4>
              <p className="text-zinc-400">📍 Кыргызстан, г. Бишкек</p>
              <p className="text-zinc-400">📞 +996 700 446 744 (Дежурная линия)</p>
              <p className="text-zinc-400">⏰ С 07:00 утра до 03:00 ночи • СЭС бригада выезжает без праздников</p>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-[10px] tracking-widest font-bold uppercase">
            <p>© 2026 dezinfeksiya.kg. Все права защищены. Разработано в Бишкеке.</p>
            <div className="flex gap-4">
              <button onClick={() => setModalOpen('privacy')} className="hover:text-zinc-350 transition-colors">Политика</button>
              <span>|</span>
              <button onClick={() => setModalOpen('terms')} className="hover:text-zinc-350 transition-colors">Обязанности сторон</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODALS ================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full overflow-hidden shadow-2xl border border-zinc-150 max-h-[90vh] flex flex-col justify-between">
            
            <div className="p-6 border-b border-zinc-200/50 flex justify-between items-center bg-zinc-50">
              <h3 className="text-xs font-extrabold text-zinc-950 uppercase tracking-widest">
                {modalOpen === 'callback' && 'Запросить консультацию'}
                {modalOpen === 'order' && 'Заказать обработку'}
                {modalOpen === 'privacy' && 'Конфиденциальность'}
                {modalOpen === 'terms' && 'Обязательства СЭС'}
              </h3>
              <button 
                onClick={() => setModalOpen(null)} 
                className="text-zinc-400 hover:text-zinc-600 transition-colors bg-white border border-zinc-200 p-1.5 rounded-full"
                title="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 text-zinc-600 text-xs leading-relaxed space-y-4">
              
              {/* Callback modal content */}
              {modalOpen === 'callback' && (
                <div className="space-y-4 text-left">
                  <p className="text-zinc-500">Заполните поля, и наш сертифицированный санитарный врач подробно проконсультирует вас по всем видам химических препаратов.</p>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">ФИО</label>
                    <input 
                      type="text" 
                      placeholder="Арсен" 
                      value={consultName} 
                      onChange={(e) => setConsultName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-emerald-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Номер телефона</label>
                    <input 
                      type="tel" 
                      placeholder="0700 446 744" 
                      value={consultPhone} 
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-bold" 
                    />
                  </div>
                  <button 
                    onClick={() => handleLeadSubmit({
                      name: consultName || 'Запрос обратного звонка',
                      phone: consultPhone,
                      serviceType: 'Общая телефонная консультация'
                    })}
                    disabled={isSubmitting}
                    className="w-full bg-zinc-950 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl uppercase tracking-widest transition-colors text-center"
                  >
                    {isSubmitting ? 'РЕГИСТРАЦИЯ ЗВОНКА...' : 'БЕСПЛАТНЫЙ ЗВОНОК ВРАЧА'}
                  </button>
                </div>
              )}

              {/* Prefilled service order modal content */}
              {modalOpen === 'order' && (
                <div className="space-y-4 text-left">
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3 rounded-lg text-[11px] font-bold">
                    Вы выбрали: {selectedOrderService}
                  </div>
                  <p className="text-zinc-500">Мы забронируем выезд бригады на свободное время сегодня. Врач свяжется для уточнения деталей.</p>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Как к вам обращаться</label>
                    <input 
                      type="text" 
                      placeholder="Ваше имя" 
                      value={consultName} 
                      onChange={(e) => setConsultName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-emerald-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Номер телефона</label>
                    <input 
                      type="tel" 
                      placeholder="0700 446 744" 
                      value={consultPhone} 
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-bold" 
                    />
                  </div>
                  <button 
                    onClick={() => handleLeadSubmit({
                      name: consultName || 'Клиент через быструю кнопку',
                      phone: consultPhone,
                      serviceType: selectedOrderService
                    })}
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-extrabold py-3.5 rounded-xl uppercase tracking-widest transition-colors text-center"
                  >
                    {isSubmitting ? 'РЕГИСТРАЦИЯ ЗАКАЗА...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
                  </button>
                </div>
              )}

              {/* Privacy Policy text */}
              {modalOpen === 'privacy' && (
                <div className="text-left space-y-2 text-zinc-500">
                  <p className="font-bold text-zinc-800">1. Сбор персональных данных</p>
                  <p>Мы собираем исключительно минимально необходимые контактные данные (имя, номер телефона) для оперативной связи и согласования санитарной обработки.</p>
                  <p className="font-bold text-zinc-800">2. Конфиденциальность данных</p>
                  <p>Сведения клиентов о наличии насекомых, тараканов или клопов являются абсолютно конфиденциальными и не разглашаются в рекламных целях.</p>
                  <p className="font-bold text-zinc-800">3. Безопасность</p>
                  <p>Информация хранится на защищенных серверах в соответствии с нормативами КР.</p>
                </div>
              )}

              {/* Terms & Conditions text */}
              {modalOpen === 'terms' && (
                <div className="text-left space-y-2 text-zinc-500">
                  <p className="font-bold text-zinc-800">1. Предоставляемые услуги</p>
                  <p>dezinfeksiya.kg предоставляет профессиональные услуги дезинфекции и клининга. Мы гарантируем подлинность применяемых импортных препаратов.</p>
                  <p className="font-bold text-zinc-800">2. Обязанности сторон</p>
                  <p>Исполнитель обязуется качественно провести обработку, а Заказчик — вовремя подготовить помещение к дезинфекции (убрать продукты питания, организовать отсутствие людей на время дезинфекции).</p>
                </div>
              )}

            </div>

            <div className="p-4 bg-zinc-50 border-t border-zinc-200/50 text-right">
              <button 
                onClick={() => setModalOpen(null)} 
                className="bg-zinc-950 text-white font-bold text-xs py-2 px-4 rounded-xl cursor-pointer hover:bg-zinc-900 transition-colors"
              >
                Закрыть окно
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Page = "home" | "search" | "upload" | "cabinet" | "payments" | "contacts";

const LAND_TYPES = ["Все типы", "ИЖС", "СНТ / ДНП", "Сельхозназначение", "Коммерческая", "Промышленная", "Лесной фонд"];
const AREA_OPTIONS = ["Любая площадь", "до 6 соток", "6–15 соток", "15–50 соток", "50–100 соток", "более 100 соток"];

const mockPlans = [
  { id: 1, cadastral: "77:01:0001001:123", address: "г. Москва, ул. Ленина, 5", area: "12.4 га", type: "ИЖС", updated: "18 апр 2026", downloads: 42, price: 890 },
  { id: 2, cadastral: "50:21:0010205:88", address: "МО, Одинцовский р-н, д. Барвиха", area: "3.2 га", type: "СНТ / ДНП", updated: "22 апр 2026", downloads: 17, price: 490 },
  { id: 3, cadastral: "47:14:1203001:412", address: "Ленинградская обл., Всеволожский р-н", area: "28.7 га", type: "Сельхозназначение", updated: "25 апр 2026", downloads: 63, price: 1290 },
  { id: 4, cadastral: "23:43:0401015:55", address: "г. Краснодар, пр-т Чекистов", area: "0.8 га", type: "Коммерческая", updated: "27 апр 2026", downloads: 9, price: 650 },
  { id: 5, cadastral: "66:41:0206007:234", address: "г. Екатеринбург, Верх-Исетский р-н", area: "5.1 га", type: "ИЖС", updated: "28 апр 2026", downloads: 31, price: 790 },
  { id: 6, cadastral: "78:32:0010440:101", address: "г. Санкт-Петербург, Приморский р-н", area: "1.6 га", type: "Коммерческая", updated: "29 апр 2026", downloads: 24, price: 990 },
];

const historyItems = [
  { id: 1, cadastral: "77:01:0001001:123", action: "Скачан", date: "29 апр 2026", status: "success" },
  { id: 2, cadastral: "50:21:0010205:88", action: "Загружен", date: "27 апр 2026", status: "success" },
  { id: 3, cadastral: "23:43:0401015:55", action: "Скачан", date: "24 апр 2026", status: "success" },
];

const payments = [
  { id: "PAY-2041", date: "29 апр 2026", desc: "Кадастровый план 77:01:0001001:123", amount: 890, status: "Оплачен" },
  { id: "PAY-2038", date: "24 апр 2026", desc: "Кадастровый план 23:43:0401015:55", amount: 650, status: "Оплачен" },
  { id: "PAY-2031", date: "19 апр 2026", desc: "Пакет «Профи» — 10 загрузок", amount: 2900, status: "Оплачен" },
];

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Все типы");
  const [selectedArea, setSelectedArea] = useState("Любая площадь");
  const [addressFilter, setAddressFilter] = useState("");

  const filteredPlans = mockPlans.filter((p) => {
    const matchQuery = !searchQuery || p.cadastral.includes(searchQuery) || p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = selectedType === "Все типы" || p.type === selectedType;
    const matchAddr = !addressFilter || p.address.toLowerCase().includes(addressFilter.toLowerCase());
    return matchQuery && matchType && matchAddr;
  });

  const navItems: { label: string; page: Page; icon: string }[] = [
    { label: "Главная", page: "home", icon: "Home" },
    { label: "Поиск", page: "search", icon: "Search" },
    { label: "Загрузить", page: "upload", icon: "Upload" },
    { label: "Кабинет", page: "cabinet", icon: "User" },
    { label: "Платежи", page: "payments", icon: "CreditCard" },
    { label: "Поддержка", page: "contacts", icon: "MessageCircle" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
              <Icon name="Map" size={15} className="text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-foreground">База кадастровых планов территории</span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setPage(item.page)}
                className={`nav-link pb-1 ${page === item.page ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="hidden md:flex text-xs h-8">
              Войти
            </Button>
            <Button size="sm" className="hidden md:flex text-xs h-8 bg-primary text-primary-foreground hover:bg-primary/90">
              Регистрация
            </Button>
            <button
              className="md:hidden p-1.5 rounded hover:bg-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => { setPage(item.page); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-secondary transition-colors ${page === item.page ? "text-foreground font-medium" : "text-muted-foreground"}`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "search" && (
          <SearchPage
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            selectedType={selectedType} setSelectedType={setSelectedType}
            selectedArea={selectedArea} setSelectedArea={setSelectedArea}
            addressFilter={addressFilter} setAddressFilter={setAddressFilter}
            filteredPlans={filteredPlans}
          />
        )}
        {page === "upload" && <UploadPage />}
        {page === "cabinet" && <CabinetPage historyItems={historyItems} setPage={setPage} />}
        {page === "payments" && <PaymentsPage payments={payments} />}
        {page === "contacts" && <ContactsPage />}
      </main>

      <footer className="border-t border-border bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
              <Icon name="Map" size={11} className="text-primary-foreground" />
            </div>
            <span>База кадастровых планов территории © 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-foreground transition-colors">Условия использования</button>
            <button className="hover:text-foreground transition-colors">Конфиденциальность</button>
            <button onClick={() => setPage("contacts")} className="hover:text-foreground transition-colors">Поддержка</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── HOME ─── */
function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const stats = [
    { label: "Кадастровых планов", value: "24 180" },
    { label: "Регионов РФ", value: "85" },
    { label: "Пользователей", value: "6 400+" },
    { label: "Загрузок сегодня", value: "312" },
  ];

  const features = [
    { icon: "Search", title: "Умный поиск", desc: "Фильтрация по кадастровому номеру, адресу, площади и категории земель" },
    { icon: "Upload", title: "Загрузка файлов", desc: "Добавляйте кадастровые планы и DXF-файлы для обмена с другими пользователями" },
    { icon: "ShieldCheck", title: "Проверенные данные", desc: "Каждый план проходит модерацию и привязан к реестровым данным Росреестра" },
    { icon: "Download", title: "Быстрое скачивание", desc: "Скачивайте файлы в PDF, DXF или XML после оплаты единым пакетом" },
  ];

  return (
    <div>
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-6 stagger-1 animate-fade-in">
              <Icon name="Zap" size={12} />
              Единая база кадастровых планов России
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-foreground mb-4 stagger-2 animate-fade-in">
              Обмен кадастровыми планами и территориальными файлами
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 stagger-3 animate-fade-in">
              Находите, загружайте и скачивайте актуальные кадастровые планы по всей России. Быстро. Надёжно. Без лишних шагов.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 stagger-4 animate-fade-in">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 text-sm font-medium"
                onClick={() => setPage("search")}
              >
                <Icon name="Search" size={16} className="mr-2" />
                Найти план
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-6 text-sm font-medium"
                onClick={() => setPage("upload")}
              >
                <Icon name="Upload" size={16} className="mr-2" />
                Загрузить план
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className={`text-center stagger-${i + 1} animate-fade-in`}>
                <div className="text-2xl font-semibold text-primary font-mono">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-xl font-semibold text-foreground mb-8">Возможности платформы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div key={i} className={`p-5 rounded-lg border border-border bg-white card-hover stagger-${i + 1} animate-fade-in`}>
              <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={f.icon} size={18} className="text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1.5">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-foreground">Последние добавленные</h2>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => setPage("search")}>
            Смотреть все <Icon name="ArrowRight" size={13} className="ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockPlans.slice(0, 3).map((p, i) => (
            <PlanCard key={p.id} plan={p} delay={(i + 1) as 1 | 2 | 3 | 4 | 5 | 6} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─── PLAN CARD ─── */
type PlanItem = typeof mockPlans[0];

function PlanCard({ plan, delay = 1 }: { plan: PlanItem; delay?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  return (
    <div className={`p-4 rounded-lg border border-border bg-white card-hover stagger-${delay} animate-fade-in`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="font-mono text-xs text-accent font-medium mb-0.5">{plan.cadastral}</div>
          <div className="text-sm font-medium text-foreground leading-snug">{plan.address}</div>
        </div>
        <Badge variant="secondary" className="text-xs shrink-0">{plan.type}</Badge>
      </div>
      <Separator className="my-3" />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Icon name="Maximize2" size={11} />{plan.area}</span>
        <span className="flex items-center gap-1"><Icon name="Download" size={11} />{plan.downloads}</span>
        <span className="flex items-center gap-1"><Icon name="Calendar" size={11} />{plan.updated}</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{plan.price} ₽</span>
        <Button size="sm" className="h-7 text-xs bg-primary text-primary-foreground hover:bg-primary/90">
          <Icon name="Download" size={12} className="mr-1" />
          Скачать
        </Button>
      </div>
    </div>
  );
}

/* ─── SEARCH PAGE ─── */
function SearchPage({
  searchQuery, setSearchQuery,
  selectedType, setSelectedType,
  selectedArea, setSelectedArea,
  addressFilter, setAddressFilter,
  filteredPlans,
}: {
  searchQuery: string; setSearchQuery: (v: string) => void;
  selectedType: string; setSelectedType: (v: string) => void;
  selectedArea: string; setSelectedArea: (v: string) => void;
  addressFilter: string; setAddressFilter: (v: string) => void;
  filteredPlans: PlanItem[];
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Поиск кадастровых планов</h1>
        <p className="text-sm text-muted-foreground">Найдено {filteredPlans.length} планов по вашему запросу</p>
      </div>

      <div className="bg-white rounded-lg border border-border p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Кадастровый номер</label>
            <Input
              placeholder="77:01:0001001:123"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Адрес или населённый пункт</label>
            <Input
              placeholder="г. Москва..."
              value={addressFilter}
              onChange={(e) => setAddressFilter(e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Тип земли</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full h-9 px-3 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {LAND_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Площадь участка</label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full h-9 px-3 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {AREA_OPTIONS.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground hover:bg-primary/90">
            <Icon name="Search" size={13} className="mr-1.5" />
            Найти
          </Button>
          <Button
            size="sm" variant="ghost"
            className="h-8 text-xs text-muted-foreground"
            onClick={() => { setSearchQuery(""); setAddressFilter(""); setSelectedType("Все типы"); setSelectedArea("Любая площадь"); }}
          >
            <Icon name="X" size={13} className="mr-1" />
            Сбросить
          </Button>
        </div>
      </div>

      {filteredPlans.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Icon name="SearchX" size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">По вашему запросу ничего не найдено</p>
          <p className="text-xs mt-1">Попробуйте изменить фильтры</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlans.map((p, i) => (
            <PlanCard key={p.id} plan={p} delay={Math.min(i + 1, 6) as 1 | 2 | 3 | 4 | 5 | 6} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── UPLOAD PAGE ─── */
function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-foreground mb-1">Загрузить кадастровый план</h1>
      <p className="text-sm text-muted-foreground mb-7">Поддерживаемые форматы: PDF, DXF, XML, SHP, ZIP</p>

      {!uploaded ? (
        <>
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${dragging ? "border-accent bg-accent/5" : "border-border hover:border-primary/40 hover:bg-secondary/40"}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); setUploaded(true); }}
            onClick={() => setUploaded(true)}
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Icon name="Upload" size={22} className="text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">Перетащите файл сюда или нажмите для выбора</p>
            <p className="text-xs text-muted-foreground">Максимальный размер: 50 МБ</p>
          </div>

          <div className="mt-6 bg-white rounded-lg border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Информация о плане</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Кадастровый номер *</label>
                <Input placeholder="77:01:0001001:123" className="h-9 text-sm font-mono" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Адрес объекта *</label>
                <Input placeholder="г. Москва, ул. ..." className="h-9 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Тип земли</label>
                <select className="w-full h-9 px-3 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring">
                  {LAND_TYPES.slice(1).map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Площадь (га)</label>
                <Input placeholder="0.00" type="number" className="h-9 text-sm" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Цена скачивания (₽)</label>
              <Input placeholder="490" type="number" className="h-9 text-sm w-40" />
            </div>
            <Button className="mt-5 h-9 text-sm bg-primary text-primary-foreground hover:bg-primary/90">
              <Icon name="Upload" size={14} className="mr-2" />
              Опубликовать план
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={28} className="text-green-600" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">Файл успешно загружен</h3>
          <p className="text-sm text-muted-foreground mb-5">Ваш план будет опубликован после проверки модератором</p>
          <Button variant="outline" size="sm" className="text-xs" onClick={() => setUploaded(false)}>
            Загрузить ещё
          </Button>
        </div>
      )}
    </div>
  );
}

/* ─── CABINET PAGE ─── */
function CabinetPage({ historyItems, setPage }: { historyItems: typeof historyItems; setPage: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState<"history" | "uploads">("history");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-start gap-5 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
          <Icon name="User" size={22} className="text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Александр Петров</h1>
          <p className="text-sm text-muted-foreground">a.petrov@mail.ru · Участник с марта 2025</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="tag-badge"><Icon name="Download" size={10} className="mr-1" />14 скачиваний</span>
            <span className="tag-badge"><Icon name="Upload" size={10} className="mr-1" />3 загрузки</span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-secondary rounded-lg p-1 mb-6 w-fit">
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${activeTab === "history" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          История
        </button>
        <button
          onClick={() => setActiveTab("uploads")}
          className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${activeTab === "uploads" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          Мои загрузки
        </button>
      </div>

      {activeTab === "history" && (
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-4 px-4 py-2.5 bg-secondary/50 text-xs font-medium text-muted-foreground border-b border-border">
            <span>Кадастровый номер</span>
            <span>Действие</span>
            <span>Дата</span>
            <span>Статус</span>
          </div>
          {historyItems.map((item) => (
            <div key={item.id} className="grid grid-cols-4 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
              <span className="font-mono text-xs text-accent">{item.cadastral}</span>
              <span className="text-sm text-foreground">{item.action}</span>
              <span className="text-sm text-muted-foreground">{item.date}</span>
              <span className="flex items-center gap-1 text-xs text-green-600">
                <Icon name="CheckCircle" size={12} />
                Успешно
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "uploads" && (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="FolderOpen" size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">У вас пока нет загруженных планов</p>
          <Button size="sm" className="mt-4 text-xs bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setPage("upload")}>
            <Icon name="Plus" size={13} className="mr-1.5" />
            Загрузить первый план
          </Button>
        </div>
      )}
    </div>
  );
}

/* ─── PAYMENTS PAGE ─── */
const DOWNLOAD_OPTIONS = [
  { count: 5,   price: 5 * 5 },
  { count: 10,  price: 10 * 5 },
  { count: 20,  price: 20 * 5 },
  { count: 50,  price: 50 * 5 },
  { count: 100, price: 100 * 5 },
];

function PaymentsPage({ payments }: { payments: typeof payments }) {
  const [selected, setSelected] = useState(1);
  const [ordered, setOrdered] = useState(false);

  const option = DOWNLOAD_OPTIONS[selected];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-foreground mb-1">Платежи и скачивание</h1>
      <p className="text-sm text-muted-foreground mb-7">История транзакций и управление подпиской</p>

      {/* Tariff card */}
      <div className="bg-white rounded-lg border border-border p-6 mb-7">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-0.5">Тариф</div>
            <div className="text-base font-semibold text-foreground">Базовый — 80 ₽/мес</div>
          </div>
          <span className="tag-badge text-accent border border-accent/20 bg-accent/8">Активен</span>
        </div>

        <div className="mb-5">
          <div className="text-xs font-medium text-muted-foreground mb-3">Выберите количество скачиваний</div>
          <div className="grid grid-cols-5 gap-2">
            {DOWNLOAD_OPTIONS.map((opt, i) => (
              <button
                key={i}
                onClick={() => { setSelected(i); setOrdered(false); }}
                className={`rounded-lg border-2 py-3 text-center transition-all ${selected === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
              >
                <div className={`text-base font-semibold font-mono ${selected === i ? "text-primary" : "text-foreground"}`}>{opt.count}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{opt.price} ₽</div>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">5 ₽ за одно скачивание</p>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground">Итого к оплате</div>
            <div className="text-2xl font-semibold font-mono text-foreground">{option.price} ₽</div>
          </div>
          {!ordered ? (
            <Button
              className="h-10 px-6 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setOrdered(true)}
            >
              <Icon name="CreditCard" size={15} className="mr-2" />
              Оплатить {option.count} скачиваний
            </Button>
          ) : (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium animate-fade-in">
              <Icon name="CheckCircle" size={16} />
              Заявка принята — {option.count} скачиваний будут зачислены после оплаты
            </div>
          )}
        </div>
      </div>

      <h2 className="text-base font-semibold text-foreground mb-3">История платежей</h2>
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-4 px-4 py-2.5 bg-secondary/50 text-xs font-medium text-muted-foreground border-b border-border">
          <span>ID</span>
          <span className="col-span-2">Описание</span>
          <span className="text-right">Сумма</span>
        </div>
        {payments.map((p) => (
          <div key={p.id} className="grid grid-cols-4 px-4 py-3.5 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors items-center">
            <span className="font-mono text-xs text-muted-foreground">{p.id}</span>
            <div className="col-span-2">
              <div className="text-sm text-foreground">{p.desc}</div>
              <div className="text-xs text-muted-foreground">{p.date}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">{p.amount} ₽</div>
              <div className="text-xs text-green-600">{p.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CONTACTS PAGE ─── */
function ContactsPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-foreground mb-1">Контакты и поддержка</h1>
      <p className="text-sm text-muted-foreground mb-8">Мы отвечаем в рабочие дни с 9:00 до 18:00 МСК</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: "Mail", label: "Email", value: "support@kadastrplan.ru" },
          { icon: "Phone", label: "Телефон", value: "+7 (800) 555-44-33" },
          { icon: "Clock", label: "Режим работы", value: "Пн–Пт, 9:00–18:00" },
        ].map((c, i) => (
          <div key={i} className={`bg-white rounded-lg border border-border p-4 flex items-start gap-3 stagger-${i + 1} animate-fade-in`}>
            <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center shrink-0 mt-0.5">
              <Icon name={c.icon} size={15} className="text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-0.5">{c.label}</div>
              <div className="text-sm font-medium text-foreground">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      {!sent ? (
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-base font-semibold text-foreground mb-4">Написать в поддержку</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Ваше имя</label>
              <Input placeholder="Александр" className="h-9 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
              <Input placeholder="email@example.ru" type="email" className="h-9 text-sm" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Тема обращения</label>
            <select className="w-full h-9 px-3 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring">
              <option>Технический вопрос</option>
              <option>Вопрос по оплате</option>
              <option>Ошибка в данных</option>
              <option>Другое</option>
            </select>
          </div>
          <div className="mb-5">
            <label className="block text-xs font-medium text-muted-foreground mb-1.5">Сообщение</label>
            <textarea
              rows={4}
              placeholder="Опишите ваш вопрос..."
              className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background resize-none focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <Button className="h-9 text-sm bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setSent(true)}>
            <Icon name="Send" size={14} className="mr-2" />
            Отправить обращение
          </Button>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-border animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
            <Icon name="CheckCircle" size={24} className="text-green-600" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">Обращение отправлено</h3>
          <p className="text-sm text-muted-foreground mb-4">Мы ответим на ваш вопрос в течение 1 рабочего дня</p>
          <Button variant="outline" size="sm" className="text-xs" onClick={() => setSent(false)}>
            Отправить ещё
          </Button>
        </div>
      )}
    </div>
  );
}
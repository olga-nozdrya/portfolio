# Портфолио — Алекс Морроу

Современное портфолио продуктового дизайнера на Next.js 14 (App Router), TypeScript и Tailwind CSS.

---

## Стек

- **Next.js 14** — App Router
- **TypeScript** — строгая типизация
- **Tailwind CSS** — утилитарные стили
- **Google Fonts** — DM Serif Display + DM Sans

---

## Структура проекта

```
portfolio/
├── src/
│   ├── app/
│   │   ├── cases/
│   │   │   ├── case-1/page.tsx    # Киоски Dodo Pizza
│   │   │   ├── case-2/page.tsx    # Reboot
│   │   │   └── case-3/page.tsx    # Misso AI Agent
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx          # 404
│   │   └── page.tsx               # Главная
│   ├── components/
│   │   ├── CaseCard.tsx           # Карточка кейса
│   │   ├── CasePage.tsx           # Шаблон страницы кейса
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── ThemeProvider.tsx      # Тёмная/светлая тема + localStorage
│   └── lib/
│       └── cases.ts               # Данные всех кейсов
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

---

## Запуск

### 1. Установить зависимости

```bash
npm install
```

### 2. Запустить дев-сервер

```bash
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000)

### 3. Сборка для продакшена

```bash
npm run build
npm run start
```

---

## Деплой на Vercel

Проект готов к деплою. Пуш в GitHub → подключи репо на [vercel.com](https://vercel.com).

```bash
# Или через Vercel CLI
npx vercel
```

Переменные окружения не нужны.

---

## Кастомизация

### Фото
Замени заглушку в `src/app/page.tsx` на:
```tsx
<Image src="/photo.jpg" alt="Твоё имя" fill className="object-cover" />
```
Положи фото в папку `/public/`.

### Данные кейсов
Редактируй `src/lib/cases.ts` — названия, описания, метрики, цвета акцентов.

### Скиллы и опыт
Редактируй массивы `hardSkills`, `softSkills`, `experience` в `src/app/page.tsx`.

### Контакты
Замени email и ссылки на соцсети в секции `contact-anchor` в `src/app/page.tsx`.

---

## Дизайн-система

| Токен | Светлая | Тёмная |
|-------|---------|--------|
| `--bg` | `#F2F2F0` | `#0F0F0E` |
| `--surface` | `#FFFFFF` | `#1A1A18` |
| `--text` | `#0F0F0E` | `#F2F2F0` |
| `--text-muted` | `#6B6B68` | `#8A8A87` |
| `--accent` | `#FF5C00` | `#FF5C00` |
| `--accent-green` | `#1EE87E` | `#1EE87E` |
| `--accent-blue` | `#3B82F6` | `#3B82F6` |

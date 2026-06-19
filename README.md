# Snapbits 📱📰

Snapbits is a modern, premium news-reading application inspired by the addictive, vertical-swiping interface of TikTok. Swipe up to read the latest global news headlines with lightning-fast performance, beautiful typography, and a sleek glassmorphic design.

![Snapbits Preview](https://via.placeholder.com/800x400?text=Snapbits+-+Vertical+News+Reel)

## 🌟 Features

- **Vertical Infinite Scroll**: Swipe through news articles seamlessly using `Swiper.js`.
- **Global & Localized News**: Filter by category (Technology, Business, Sports, etc.) and by country.
- **Full-text Search**: Find specific topics instantly with the built-in search.
- **Bookmarking (Local Storage)**: Save articles to read later in your dedicated "Saved" tab.
- **Glassmorphism UI**: Beautiful, fully-responsive design utilizing `TailwindCSS` and `Framer Motion` for smooth bottom-sheet animations.
- **Sleek Icons**: Built with lightweight `lucide-react` icons.

## 🚀 Tech Stack

- **Frontend Framework**: React + Vite
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Swiper Engine**: Swiper/React (Virtual & Mousewheel modules)
- **API Backend**: Custom Vercel Proxy using [FeedFlow API](https://feedflow-news.vercel.app/)

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/snapbits.git
   cd snapbits
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local dev server:**
   ```bash
   npm run dev
   ```
   > The local development environment uses Vite's proxy (`vite.config.js`) to handle CORS issues when connecting to the FeedFlow API.

## 🌍 Deployment

Snapbits is configured for easy deployment on **Vercel** or **Netlify**.

- **Vercel**: The `vercel.json` file handles rewriting `/api` requests to the backend. Just connect your GitHub repo and hit deploy!
- **Netlify**: A `netlify.toml` is also included for drop-in Netlify support.

## 🔒 Security

This application uses a public, keyless news API proxy, meaning there are **no secrets, API keys, or `.env` files** required to run it. It is 100% safe to fork and make public. All dependencies are actively audited.

---
*Built with ❤️ for speed reading the news.*
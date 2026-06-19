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

Snapbits is configured for easy, one-click deployment on both **Vercel** and **Netlify**. Both platforms will automatically pick up the respective proxy configurations needed to bypass CORS for the FeedFlow API.

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy this app. The `vercel.json` file in the root directory automatically handles the API proxy rewrites.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsohangujari%2Fsnapbits)

**Manual Vercel Deployment:**
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Leave the default settings (Framework Preset: Vite, Build Command: `npm run build`, Output Directory: `dist`).
5. Click **Deploy**.

### Deploy to Netlify

Netlify deployment is fully supported. We use a `public/_redirects` file to handle the API proxy rules.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/sohangujari/snapbits)

**Manual Netlify Deployment:**
1. Push your code to a GitHub repository.
2. Go to [Netlify](https://app.netlify.com) and click **Add new site** > **Import an existing project**.
3. Connect to GitHub and select your repository.
4. Set the Build Command to `npm run build` and the Publish Directory to `dist`.
5. Click **Deploy Site**.
*(Note: If you see a "Legacy Prerendering" warning in your Netlify dashboard, you can safely disable Prerendering in Site Settings > Build & deploy > Prerendering).*

## 🔒 Security

This application uses a public, keyless news API proxy, meaning there are **no secrets, API keys, or `.env` files** required to run it. It is 100% safe to fork and make public. All dependencies are actively audited.

---
*Built with ❤️ for speed reading the news.*
# 🎬 Movie App

A sleek and modern movie discovery application built with **React**, powered by **The Movie Database (TMDB)** API for movie data and **Appwrite** for tracking trending search terms in real-time.

---

## ✨ Features

- **🔎 Real-time Search**: instantly search for movies by title.
- **⚡ Optimized Performance**: Implements debounced search to minimize API calls and improve user experience.
- **📊 Trending Movies**: Dynamically tracks and displays top-searched movies using Appwrite's database.
- **🖼️ Rich Movie Details**: View high-quality posters, star ratings, release years, and original languages.
- **📱 Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **✨ Modern UI/UX**: clean, dark-themed interface with glassmorphism effects and smooth animations.

---

## �️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) (v19) via [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Utilities**: `react-use` for debouncing
- **Backend / Database**: [Appwrite](https://appwrite.io/) (for search analytics)
- **Movie Data**: [TMDB API](https://developer.themoviedb.org/)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A **TMDB** API Key
- An **Appwrite** account and project

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Movie_App.git
cd Movie_App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory of your project. You can copy the structure below.

**`.env`**:
```env
# TMDB API Key (Get at https://www.themoviedb.org/settings/api)
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Appwrite Configuration (Get from your Appwrite Console)
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

> **Note**: Ensure you do not commit your `.env` file to version control.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

---

## 📦 Building for Production

To build the project for production deployment:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## 📂 Project Structure

```
Movie_App/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components (MovieCard, Search, Spinner)
│   ├── App.jsx          # Main application logic
│   ├── appwrite.js      # Appwrite configuration and API services
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles and Tailwind imports
├── .gitignore           # Git ignore rules
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

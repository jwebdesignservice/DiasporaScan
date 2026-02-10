# DiasporaScan 🌍

A cultural exploration platform celebrating Black history and the African diaspora, powered by the $DIASPORA memecoin.

![DiasporaScan](https://img.shields.io/badge/Black%20History%20Month-2024-10b981?style=for-the-badge)

## Features

- 🗺️ **Interactive Maps** - Explore the African diaspora across the world and discover the 54 nations of Africa
- 🔍 **Smart Search** - Search countries, clans, historical figures, surnames, and cultural elements
- 👤 **Historical Figures** - Learn about influential Black leaders throughout history
- 🎵 **Cultural Heritage** - Discover music genres, traditional foods, and languages
- 🔥 **Token Burn** - Deflationary mechanics where each scan burns $DIASPORA tokens
- 📱 **Fully Responsive** - Beautiful experience on any device

## Tech Stack

- **React 18** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **react-simple-maps** for interactive maps
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Header, Footer, MarqueeBanner, Layout
│   ├── maps/         # WorldMap, AfricaMap
│   ├── search/       # SearchBar, SearchResults
│   ├── cards/        # StatCard, FigureCard, CultureCard
│   ├── token/        # BurnCounter, TokenInfo
│   └── ui/           # Button, Modal
├── pages/
│   ├── Home.jsx      # Landing page with stats and featured content
│   ├── Explore.jsx   # World map exploration
│   ├── Africa.jsx    # Africa-focused map
│   ├── Search.jsx    # Search results page
│   ├── Token.jsx     # $DIASPORA token information
│   └── About.jsx     # About the project
├── data/
│   ├── countries.json
│   ├── figures.json
│   ├── culture.json
│   ├── diaspora.json
│   └── clans.json
├── hooks/
│   └── useSearch.js
└── styles/
    └── index.css
```

## Data Sources

The application uses static JSON data covering:

- **12 Countries** - African nations and major diaspora destinations
- **12 Historical Figures** - Leaders in civil rights, politics, music, and literature
- **8 Clans/Tribes** - Major ethnic groups with traditions and common surnames
- **6 Music Genres** - From Afrobeat to Jazz
- **6 Traditional Foods** - Cultural cuisine from around the diaspora
- **6 Languages** - Including Swahili, Yoruba, and Jamaican Patois
- **4 Migration Routes** - Historical movements of the diaspora

## Token Integration

$DIASPORA is a deflationary memecoin that burns tokens with every scan:

- **Deflationary**: Supply decreases over time
- **Community Driven**: Built for the diaspora community
- **Educational**: Learn while you earn

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This site is for educational and entertainment purposes only. Information should be independently verified before making any decisions based on the content. This is not financial advice.

## License

MIT License - feel free to use this project for your own purposes.

---

Built with ❤️ for Black History Month 2024

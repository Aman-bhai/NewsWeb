
# NewsDaily - The News App

## Overview

Welcome to the News App! This application fetches and displays the latest news headlines using the NewsAPI. Users can view news articles and save specific articles to a MongoDB database by clicking on the news cards.

### Features
- Fetches news from the NewsAPI.
- Displays news articles in a responsive grid layout.
- Allows users to save selected news articles to a MongoDB database.
- Interactive UI with clear distinctions between clickable cards and buttons.
### Technologies Used
- Next.js: React framework for server-side rendering and API routes.
- MongoDB: Database for storing saved news articles.
- Tailwind CSS: Utility-first CSS framework for styling.
## How to Run

1. Clone the repository:
```bash
git clone https://github.com/Aman-bhai/NewsDaily.git
cd NewsDaily
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env.local file in the root directory and add your MongoDB URI:
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your-database-name?retryWrites=true&w=majority
```
4. Add your NewsAPI key in the NewsList.js file:


```bash
fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY')

```
5. Run the development server:


```bash
npm run dev

```

6. Open your browser and go to http://localhost:3000 to view the application.


## API Credits
- NewsAPI: The application fetches news articles from NewsAPI.
- Avatar Placeholder Api: This application uses this API for generating Avatar using userName or Email.
## Component Sources
This application is styled using Tailwind CSS, and components are sourced from the following websites:

- DaisyUI: A collection of Tailwind CSS-based UI components.
- TailwindTap: Offers a variety of Tailwind CSS UI components.
- TW Elements: Provides ready-made UI elements built with Tailwind CSS.
- TailwindFlex: A site with Tailwind CSS utilities and components for flexible layouts.
## Thank You!
A special thanks to the developers and maintainers of the APIs and websites used in this project:

- NewsAPI
- DaisyUI
- TailwindTap
- TW Elements
- TailwindFlex

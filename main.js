const quote = document.getElementById("quote");
const author = document.getElementById("author");

const quoteApis = [
  "https://api.quotable.io/random",
  "https://zenquotes.io/api/random"
];

const localQuotes = [
  { quote: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { quote: "What we think, we become.", author: "Buddha" },
  { quote: "Happiness depends upon ourselves.", author: "Aristotle" },
  { quote: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { quote: "Well begun is half done.", author: "Aristotle" },
  { quote: "Everything you can imagine is real.", author: "Pablo Picasso" },
  { quote: "The only way out is through.", author: "Robert Frost" }
];

function renderQuote(text, name) {
  quote.textContent = text;
  author.textContent = name;
}

function getRandomLocalQuote() {
  const index = Math.floor(Math.random() * localQuotes.length);
  return localQuotes[index];
}

function normalizeQuoteResponse(data) {
  if (!data) return null;

  if (typeof data.content === "string" && typeof data.author === "string") {
    return { quote: data.content, author: data.author };
  }

  if (Array.isArray(data) && data[0] && data[0].q && data[0].a) {
    return { quote: data[0].q, author: data[0].a };
  }

  return null;
}

async function fetchQuoteFromApis() {
  for (const apiUrl of quoteApis) {
    try {
      const response = await fetch(apiUrl, { cache: "no-store" });
      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const normalized = normalizeQuoteResponse(data);
      if (normalized) {
        return normalized;
      }
    } catch (_error) {
      // Try the next API and fall back to local quotes if all APIs fail.
    }
  }

  return null;
}

async function getquote() {
  renderQuote("Loading...", "Loading...");

  const fetchedQuote = await fetchQuoteFromApis();
  const selectedQuote = fetchedQuote || getRandomLocalQuote();

  renderQuote(selectedQuote.quote, selectedQuote.author);
}

getquote();

function tweet() {
  const tweetText = `"${quote.textContent}" — ${author.textContent}`;
  window.open(
    "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText),
    "Tweet window",
    "width=600,height=300"
  );
}

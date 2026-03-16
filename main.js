const quote = document.getElementById("quote");
const author = document.getElementById("author");

const apiUrl = "https://api.quotable.io/random";

const fallbackQuotes = [
  { quote: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { quote: "What we think, we become.", author: "Buddha" },
  { quote: "Happiness depends upon ourselves.", author: "Aristotle" },
  { quote: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { quote: "Well begun is half done.", author: "Aristotle" }
];

function renderQuote(text, name) {
  quote.textContent = text;
  author.textContent = name;
}

function getRandomFallbackQuote() {
  const index = Math.floor(Math.random() * fallbackQuotes.length);
  return fallbackQuotes[index];
}

async function getquote(url = apiUrl) {
  renderQuote("Loading...", "Loading...");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    renderQuote(data.content, data.author);
  } catch (error) {
    const localQuote = getRandomFallbackQuote();
    renderQuote(localQuote.quote, localQuote.author);
    console.error("Failed to fetch quote. Showing a fallback quote instead:", error);
  }
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

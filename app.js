// Select DOM elements
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const refreshButton = document.getElementById("refresh");
const saveQuoteButton = document.getElementById("save-quote");
const savedQuotesDiv = document.getElementById("saved-quotes");
const loadingElement = document.getElementById("loading");
const toggleThemeButton = document.getElementById("toggle-theme");

// Your API Ninjas API Key
const API_KEY = "YNltBCssdj9rIEXA6o4gkMg==JdcJzHfndLzAt4vq";

// Function to fetch and display a quote
async function fetchAndDisplayQuote() {
    try {
        // Show loading indicator
        loadingElement.style.display = "block";
        quoteElement.textContent = "";
        authorElement.textContent = "";

        // Fetch a quote from the API Ninjas Quotes API
        const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
            headers: { "X-Api-Key": API_KEY },
            params: { category: "inspirational" },
        });
        const quoteData = response.data[0];

        // Display the quote and author
        quoteElement.textContent = `"${quoteData.quote}"`;
        authorElement.textContent = `— ${quoteData.author}`;
    } catch (error) {
        // Display a fallback quote in case of failure
        fetchFallbackQuote();
        console.error("Error fetching the quote:", error);
    } finally {
        // Hide loading indicator
        loadingElement.style.display = "none";
    }
}

// Fallback quotes for offline or error scenarios
const fallbackQuotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
];

// Function to fetch a fallback quote
function fetchFallbackQuote() {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    const quoteData = fallbackQuotes[randomIndex];
    quoteElement.textContent = `"${quoteData.text}"`;
    authorElement.textContent = `— ${quoteData.author}`;
}

// Function to save the current quote
function saveQuote() {
    if (quoteElement.textContent && authorElement.textContent) {
        const newQuote = document.createElement("p");
        newQuote.textContent = `${quoteElement.textContent} ${authorElement.textContent}`;
        savedQuotesDiv.appendChild(newQuote);
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.getElementById("app").classList.toggle("dark-mode");
    toggleThemeButton.classList.toggle("dark-mode");
}

// Add event listeners
refreshButton.addEventListener("click", fetchAndDisplayQuote);
saveQuoteButton.addEventListener("click", saveQuote);
toggleThemeButton.addEventListener("click", toggleDarkMode);

// Fetch a quote when the page loads
fetchAndDisplayQuote();

// ========================================
// GGNESIA - SCRIPT UTAMA
// ========================================

let allArticles = [];


// ========================================
// AMBIL DATA BERITA
// ========================================

async function loadNews() {
  try {

    const response = await fetch("data/articles.json");

    if (!response.ok) {
      throw new Error("Data berita tidak ditemukan");
    }

    const data = await response.json();

    allArticles = data.articles || [];

    displayTrending(allArticles);
    displayNews(allArticles);

  } catch (error) {

    console.error("Gagal mengambil berita:", error);

    document.getElementById("trendingList").innerHTML =
      "<p>Belum ada berita trending.</p>";

    document.getElementById("newsList").innerHTML =
      "<p>Belum ada berita terbaru.</p>";
  }
}


// ========================================
// TAMPILKAN TRENDING
// ========================================

function displayTrending(articles) {

  const container = document.getElementById("trendingList");

  if (!articles.length) {
    container.innerHTML = "<p>Belum ada berita trending.</p>";
    return;
  }

  const trending = articles.slice(0, 5);

  container.innerHTML = trending.map(article => `
    
    <article class="news-item">

      <h3>${escapeHTML(article.title)}</h3>

      <p>
        ${escapeHTML(article.source || "Sumber")}
      </p>

    </article>

  `).join("");
}


// ========================================
// TAMPILKAN BERITA TERBARU
// ========================================

function displayNews(articles) {

  const container = document.getElementById("newsList");

  if (!articles.length) {
    container.innerHTML = "<p>Belum ada berita terbaru.</p>";
    return;
  }

  container.innerHTML = articles.slice(0, 12).map(article => `

    <article class="news-item">

      <h3>
        ${escapeHTML(article.title)}
      </h3>

      <p>
        ${escapeHTML(article.source || "Sumber")}
      </p>

      <a
        href="${article.url}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Baca selengkapnya →
      </a>

    </article>

  `).join("");
}


// ========================================
// SEARCH
// ========================================

function searchContent() {

  const input = document
    .getElementById("searchInput")
    .value
    .trim()
    .toLowerCase();

  if (!input) {

    displayNews(allArticles);

    return;
  }

  const results = allArticles.filter(article => {

    const title = article.title || "";
    const description = article.description || "";
    const source = article.source || "";
    const game = article.game || "";

    return (
      title.toLowerCase().includes(input) ||
      description.toLowerCase().includes(input) ||
      source.toLowerCase().includes(input) ||
      game.toLowerCase().includes(input)
    );

  });

  displayNews(results);
}


// ========================================
// ENTER UNTUK SEARCH
// ========================================

document
  .getElementById("searchInput")
  .addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
      searchContent();
    }

  });


// ========================================
// KEAMANAN TEKS
// ========================================

function escapeHTML(text) {

  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ========================================
// JALANKAN SAAT WEBSITE DIBUKA
// ========================================

loadNews();

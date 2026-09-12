// ================================
// GGNESIA - JAVASCRIPT
// ================================

// Fungsi pencarian
function searchContent() {

  const input = document
    .getElementById("searchInput")
    .value
    .trim();

  if (input === "") {
    alert("Silakan masukkan kata pencarian.");
    return;
  }

  alert("Mencari: " + input);
}


// Tekan ENTER untuk mencari
document
  .getElementById("searchInput")
  .addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
      searchContent();
    }

  });

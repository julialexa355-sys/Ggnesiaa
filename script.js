function searchContent() {
  const input = document.getElementById("searchInput").value.trim();

  if (input === "") {
    alert("Silakan masukkan kata pencarian.");
    return;
  }

  alert("Mencari: " + input);
}

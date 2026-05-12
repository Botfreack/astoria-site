// Запускаємо завантаження меню після повного відкриття HTML-сторінки
window.addEventListener("DOMContentLoaded", () => {
  loadMenu();
});

// Завантажуємо меню з окремого JSON-файлу, щоб власники могли редагувати його без зміни коду
async function loadMenu() {
  try {
    // Отримуємо файл з меню
    const response = await fetch("data/menu.json");

    // Якщо файл не знайдено або є помилка — зупиняємо виконання
    if (!response.ok) {
      throw new Error("Не вдалося завантажити меню");
    }

    // Перетворюємо JSON у звичайний JavaScript-масив
    const menuData = await response.json();

    // Передаємо отримані дані у функцію відображення меню
    renderMenu(menuData);
  } catch (error) {
    // Показуємо повідомлення, якщо меню не завантажилось
    showMenuError();

    // Виводимо помилку в консоль для розробника
    console.error(error);
  }
}

// Створюємо HTML-картки меню на основі даних з data/menu.json
function renderMenu(menuData) {
  // Знаходимо блок, у який треба вставити меню
  const menuGrid = document.getElementById("menuGrid");

  // Створюємо HTML для кожної категорії меню
  menuGrid.innerHTML = menuData.map((category) => {
    // Створюємо HTML для кожного напою в категорії
    const itemsHtml = category.items.map((item) => createMenuItem(item)).join("");

    // Повертаємо готову картку категорії
    return `
      <article class="menu-card">
        <h3>${escapeHtml(category.title)}</h3>
        ${itemsHtml}
      </article>
    `;
  }).join("");
}

// Створюємо один пункт меню: назва, лінія і ціна
function createMenuItem(item) {
  return `
    <div class="menu-item">
      <span class="menu-name">${escapeHtml(item.name)}</span>
      <span class="menu-line"></span>
      <span class="menu-price">${escapeHtml(item.price)}</span>
    </div>
  `;
}

// Показуємо повідомлення, якщо меню тимчасово не завантажилось
function showMenuError() {
  const menuGrid = document.getElementById("menuGrid");

  menuGrid.innerHTML = `
    <div class="menu-card">
      <h3>Меню тимчасово недоступне</h3>
      <p>Спробуйте оновити сторінку пізніше.</p>
    </div>
  `;
}

// Захищаємо сторінку від випадкового вставлення HTML-коду через menu.json
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

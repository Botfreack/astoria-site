// =========================
// ЗАВАНТАЖЕННЯ МЕНЮ
// =========================

// Чекаємо поки HTML повністю завантажиться
document.addEventListener("DOMContentLoaded", loadMenu);

// Основна функція завантаження меню
async function loadMenu() {

  try {

    // Завантажуємо menu.json
    const response = await fetch("data/menu.json");

    // Якщо файл не знайдено
    if (!response.ok) {
      throw new Error("Не вдалося завантажити menu.json");
    }

    // Перетворюємо JSON у JS-об'єкт
    const menuData = await response.json();

    // Малюємо меню
    renderMenu(menuData);

  } catch (error) {

    // Якщо помилка — показуємо повідомлення
    const menuGrid = document.getElementById("menuGrid");

    menuGrid.innerHTML = `
      <article class="menu-card">
        <h3>Меню недоступне</h3>

        <div class="menu-item">
          <span class="menu-name">
            Спробуйте оновити сторінку пізніше
          </span>
        </div>
      </article>
    `;

    console.error(error);
  }
}

// =========================
// ВІДОБРАЖЕННЯ МЕНЮ
// =========================

function renderMenu(menuData) {

  // Контейнер меню
  const menuGrid = document.getElementById("menuGrid");

  // Створюємо HTML
  const menuHtml = menuData.map(category => {

    // Позиції категорії
    const itemsHtml = category.items.map(item => {

      return `
        <div class="menu-item">

          <span class="menu-name">
            ${escapeHtml(item.name)}
          </span>

          <span class="menu-line"></span>

          <span class="menu-price">
            ${escapeHtml(item.price)}
          </span>

        </div>
      `;

    }).join("");

    // Категорія
    return `
      <article class="menu-card">

        <h3>
          ${escapeHtml(category.title)}
        </h3>

        ${itemsHtml}

      </article>
    `;

  }).join("");

  // Вставляємо меню в HTML
  menuGrid.innerHTML = menuHtml;
}

// =========================
// ЗАХИСТ ВІД HTML-ВСТАВОК
// =========================

function escapeHtml(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

let zhelania = "";

export function createCanvas() {
  var canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });
  ctx.globalCompositeOperation = "destination-over";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = "#000000d3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const handleErase = (event) => {
    if (isEraserActive) {
      if (event.type === "touchmove") {
        const x = event.changedTouches[0].clientX;
        const y = event.changedTouches[0].clientY;
        ctx.clearRect(x - 80, y - 80, 160, 160); // Adjust eraser size as needed
      } else {
        const x = event.clientX;
        const y = event.clientY;
        ctx.clearRect(x - 80, y - 80, 160, 160); // Adjust eraser size as needed
      }
    }
  };

  let isEraserActive = false;
  canvas.addEventListener("mousedown", () => (isEraserActive = true));
  canvas.addEventListener("mouseup", () => (isEraserActive = false));
  canvas.addEventListener("touchstart", () => (isEraserActive = true));
  canvas.addEventListener("touchend", () => (isEraserActive = false));
  canvas.addEventListener("mousemove", handleErase);
  canvas.addEventListener("touchmove", handleErase);

  const checkAndRemoveCanvasIfLowPainted = () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const totalPixels = imageData.data.length / 4; // 4 components per pixel (RGBA)
    let paintedPixels = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] > 0) {
        // Check if the alpha value is greater than 0
        paintedPixels++;
      }
    }

    const paintedPercentage = (paintedPixels / totalPixels) * 100;

    if (paintedPercentage < 20) {
      const container = document.querySelectorAll(".overflow")[0];
      container.classList.add("transitioning-src"); // Add class to begin transition
      setTimeout(() => container.remove(), 1000);
      clearInterval(refresh);
    }
  };

  const refresh = setInterval(() => {
    checkAndRemoveCanvasIfLowPainted();
  }, 100);
}

export function createFolders() {
  const container = document.getElementsByClassName("folders")[0];
  const names = [
    "01. Открыть бизнес",
    "02. Новости",
    "03. Припевы песен",
    "04. Мемы",
    "05. Уведомление",
    "06. Выложить пост",
    "07. Цитаты великих",
    "08. Ивангай восстал",
    "09. Надо в отпуск",
    "10. Пароль от wi-fi",
    "11. Тик-токи",
    "12. Надо посмотреть",
    "13. Пинкод",
    "14. Туц-туц",
    "13. О! Новый пост",
    "14. Он тоже уехал",
    "16. Идеи бизнеса",
    "17. Baby Shark",
    "18. Челленджи",
    "19. Лайки",
    "20. Распродажа на wb",
    "21. Мотивация",
    "22. Начать спорт",
  ];

  names.forEach((name, idx) => {
    const item = document.createElement("a");
    item.setAttribute("data-link", "");
    item.id = "folder";
    item.className = "folder";
    item.innerHTML = `
        <div class="folder-header">
          <img src="/src/assets/folder_heading.svg" alt="folder-header" />
          <span class="folder-header-text">${name}</span>
        </div>
    `;
    if (idx == 12) {
      item.href = "/desires";
    }
    container.appendChild(item);
  });

  var items = [...document.querySelectorAll(".folder")];

  items.forEach((item, idx) => {
    item.style["top"] = `${idx * 20}px`;
    item.firstElementChild.style["left"] = `${20 + idx * 4}px`;
  });
}

export function createFloatingFolders() {
  const names = [
    "Желанные гаджеты   ",
    "Фото для инстаграма",
    "Дорогие отели      ",
    "Желанные авто      ",
    "Они сделали больше ",
    "Тренды             ",
    "Идеи бизнеса       ",
    "Популярные образы  ",
    "Зависть            ",
    "Модные луки        ",
    "Фото с Мальдив     ",
    "Дорогие бренды     ",
    "Известные рестораны",
    "Трендовые профессии",
    "Мои желания!",
    "Хочу их переплюнуть",
    "Идеи бизнеса       ",
    "Темки              ",
    "Фото денег         ",
    "Яхты               ",
    "Фото из Москва Сити",
    "Истории о заработке",
    "Молодые и успешные ",
    "Они круче          ",
    "Список Forbes      ",
    "Модные хобби       ",
    "Вершина карьеры    ",
    "Фото еды           ",
    "Курсы за 3 дня     ",
  ];
  var foldersContainer = document.getElementsByClassName("floating-folders")[0];

  names.forEach((name) => {
    var folder = document.createElement("div");
    folder.innerHTML = `
      <img src="/src/assets/folder.svg" alt="folder-header" draggable="false" />
      <h5>${name}</h5>
    `;
    folder.className = "floating-folder";

    dragElement(folder);

    let isDragging = false;

    // Event listener for mousedown (drag start)
    folder.addEventListener("mousedown", () => {
      isDragging = false;
    });

    // Event listener for mousemove (drag movement)
    folder.addEventListener("mousemove", () => {
      isDragging = true;
    });

    if (name == "Мои желания!") {
      folder.addEventListener("click", (event) => {
        if (isDragging) {
          event.preventDefault(); // Prevent default click behavior
          isDragging = false; // Reset for next click
        } else {
          createWindows();
        }
      });
    }

    foldersContainer.appendChild(folder);
  });
}

function delay(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

const createWindows = async () => {
  var windowsContainer = document.getElementsByClassName("floating-folders")[0];

  let prevX = window.innerWidth / 2 - 10 * 10 - 290;
  let prevY = window.innerHeight / 2 - 10 * 10 - 300;
  for (let i = 0; i <= 10; i++) {
    var floating_window = document.createElement("div");
    floating_window.innerHTML = `
        <div class="floating-window__header">
          <div class="floating-window__header_close">
            <img src="/src/assets/ellipse.svg"  draggable="false" />
            <img src="/src/assets/ellipse.svg"  draggable="false" />
            <img src="/src/assets/ellipse.svg"  draggable="false" />
          </div>
          <span>Alert</span>
        </div>
        <div class="floating-window__content">
          <img src="/src/assets/alert.svg"  draggable="false" />
          <p>
              Все не так просто! Очень сложно вспомнить
              о своих реальных желаниях, когда ты живешь чужими жизнями
          </p>
          <button class='floating-window__button'>Я справлюсь!</button
        </div>
    `;
    floating_window.style.top = prevY + 20 + "px";
    floating_window.style.left = prevX + 20 + "px";
    floating_window.className = "floating-window";
    windowsContainer.appendChild(floating_window);
    prevX = prevX + 20;
    prevY = prevY + 20;
    if (i == 10) {
      const button = floating_window.getElementsByClassName(
        "floating-window__button",
      )[0];
      button.addEventListener(
        "click",
        function (e) {
          closeWindows();
        },
        false,
      );
    }
    await delay(100);
  }
};

const closeWindows = () => {
  Array.prototype.slice
    .call(document.getElementsByClassName("floating-window"))
    .forEach(function (item) {
      item.remove();
    });

  var windowsContainer = document.getElementsByClassName("floating-folders")[0];
  var window = document.createElement("div");
  window.className = "floating-window";
  window.innerHTML = `
    <div class="floating-window__header">
        <div class="floating-window__header_close">
          <img src="/src/assets/ellipse.svg"  draggable="false" />
          <img src="/src/assets/ellipse.svg"  draggable="false" />
          <img src="/src/assets/ellipse.svg"  draggable="false" />
        </div>
        <span>Мои желания!</span>
    </div>
    <div class="floating-window__content">
    <p style="text-align: left;">
        Вспомни о своих реальных желаниях и попробуй их сформулировать прямо здесь!
    </p>
    <textarea class="floating-window__textarea" name="textarea" cols="40" rows="5"></textarea>
    <a data-link href="/finish" class='floating-window__button'>Больше не забуду</a>
    </div>
`;

  const textarea = window.getElementsByClassName(
    "floating-window__textarea",
  )[0];

  textarea.addEventListener("input", function (event) {
    zhelania = event.target.value;
  });

  window.style.top = "50%";
  window.style.left = "50%";
  window.style.transform = "translate(-50%, -50%)";
  windowsContainer.appendChild(window);
};

export const convertAnimation = async () => {
  var convertcontainer =
    document.getElementsByClassName("convert-container")[0];
  var pamyatka = document.createElement("div");
  pamyatka.className = "pamyatka";
  pamyatka.innerHTML = `
    <h2>Памятка</h2>
    <p>
В процессе очищения вы сами убедились в том, как пагубно информационная перегрузка влияет на наше мышление, продуктивность, концентрацию, цели,
в целом, на наше здоровье.
    </p>
    <p>
Главное средство профилактики информационной перегрузки - это умение управ-лять своим временем и вниманием, это установка приоритетов и регулярные перерывы от информационного потока. Также важно развивать критическое мышление и умение фильтровать информацию, выбирая только самое важное
и полезное.
    </p>
    <p>
И не забывай о своих реальный желаниях:
    </p>
    <p>
        ${zhelania}
    </p>
    <p>
Копию памятки вы получите на электронную почту.
    </p>
`;
  const table = document.getElementsByClassName("table")[0];

  const image = document.createElement("img");
  image.className = "convert";
  image.setAttribute("src", "/src/assets/convert_closed.svg");
  convertcontainer.appendChild(image);
  const handleClick = async () => {
    image.removeEventListener("click", handleClick);
    image.classList.add("transitioning-src"); // Add class to begin transition
    await delay(1000);
    image.setAttribute("src", "/src/assets/convert_opened.svg");
    image.classList.remove("transitioning-src");
    await delay(1000);
    image.classList.add("transitioning-src"); // Add class to begin transition
    await delay(1000);
    image.setAttribute("src", "/src/assets/convert_opened_pamyatka.svg");
    image.classList.remove("transitioning-src");
    await delay(800);
    table.classList.add("transitioning-src");
    image.classList.add("transitioning-src"); // Add class to begin transition
    await delay(800);

    table.remove();
    convertcontainer.removeChild(image);

    convertcontainer.appendChild(pamyatka);
  };
  image.addEventListener("click", handleClick, false);
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function dragElement(elmnt) {
  const container = document.getElementsByClassName("floating-folders")[0];
  var pos3 = 0,
    pos4 = 0,
    pos1 = randomIntFromInterval(30, container.offsetWidth - 100),
    pos2 = randomIntFromInterval(30, container.offsetHeight - 100);
  elmnt.onmousedown = dragMouseDown;
  elmnt.ontouchstart = dragMouseDown; // Capture touch event
  elmnt.style.top = pos2 + "px";
  elmnt.style.left = pos1 + "px";

  function dragMouseDown(e) {
    e = e || window.event;
    elmnt.classList.add("dragging");
    if (e.type === "touchstart") {
      pos3 = e.changedTouches[0].clientX;
      pos4 = e.changedTouches[0].clientY;
    } else {
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement; // Capture touch event
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag; // Capture touch event
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "touchmove") {
      pos1 = pos3 - e.changedTouches[0].clientX;
      pos2 = pos4 - e.changedTouches[0].clientY;
      pos3 = e.changedTouches[0].clientX;
      pos4 = e.changedTouches[0].clientY;
    } else {
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    elmnt.classList.remove("dragging");
    document.onmouseup = null;
    document.ontouchend = null; // Release touch event
    document.onmousemove = null;
    document.ontouchmove = null; // Release touch event
  }
}

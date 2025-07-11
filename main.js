
let cars = JSON.parse(localStorage.getItem("cars") || "[]");

function saveCars() {
  localStorage.setItem("cars", JSON.stringify(cars));
}

function handlePost() {
  const car = {
    id: Date.now(),
    type: document.getElementById("type").value.trim(),
    color: document.getElementById("color").value.trim(),
    chassis: document.getElementById("chassis").value.trim(),
    plate: document.getElementById("plate").value.trim(),
    location: document.getElementById("location").value.trim(),
    date: document.getElementById("date").value,
    notes: document.getElementById("notes").value.trim(),
    fbLink: document.getElementById("fbLink").value.trim(),
    fbImage: document.getElementById("fbImage").value.trim(),
    retrieved: false,
    reported: 0
  };

  if (!car.type || !car.color) {
    alert("يجب إدخال نوع السيارة واللون على الأقل.");
    return;
  }

  const duplicate = cars.find(c => c.chassis === car.chassis && car.chassis !== "" || c.plate === car.plate && car.plate !== "");
  if (duplicate) {
    alert("🚫 هذه السيارة موجودة مسبقًا (نفس رقم الشاسيه أو اللوحة).");
    return;
  }

  cars.push(car);
  saveCars();
  alert("✅ تم نشر السيارة");
  window.location.href = "search.html";
}

function handleSearch() {
  const type = document.getElementById("search-type").value.toLowerCase();
  const color = document.getElementById("search-color").value.toLowerCase();
  const chassis = document.getElementById("search-chassis").value.toLowerCase();
  const plate = document.getElementById("search-plate").value.toLowerCase();

  const results = cars.filter(car =>
    !car.retrieved &&
    (!type || car.type.toLowerCase().includes(type)) &&
    (!color || car.color.toLowerCase().includes(color)) &&
    (!chassis || car.chassis.toLowerCase().includes(chassis)) &&
    (!plate || car.plate.toLowerCase().includes(plate))
  );

  const container = document.getElementById("results");
  container.innerHTML = results.length ? "" : "❌ لا توجد نتائج";

  results.forEach(car => {
    const div = document.createElement("div");
    div.className = "car-box";
    div.innerHTML = `
      <strong>🚗 النوع:</strong> ${car.type}<br>
      <strong>🎨 اللون:</strong> ${car.color}<br>
      <strong>🔢 الشاسيه:</strong> ${car.chassis}<br>
      <strong>🚘 اللوحة:</strong> ${car.plate}<br>
      <strong>📍 الموقع:</strong> ${car.location}<br>
      <strong>📅 التاريخ:</strong> ${car.date}<br>
      <strong>📝 ملاحظات:</strong> ${car.notes}<br>
      ${car.fbLink ? `<div class="facebook-post"><a href="${car.fbLink}" target="_blank">رابط منشور فيسبوك</a><br>${car.fbImage ? `<img src="${car.fbImage}" alt="صورة" style="max-width:100%;"/>` : ""}</div>` : ""}
      <br>
      <button onclick="markRetrieved(${car.id})">✅ تم استردادها</button>
      <button onclick="reportPost(${car.id})">🚩 تبليغ عن منشور غير صحيح</button>
    `;
    container.appendChild(div);
  });
}

function markRetrieved(id) {
  const car = cars.find(c => c.id === id);
  if (car) {
    car.retrieved = true;
    saveCars();
    alert("✅ تم وضع علامة على السيارة أنها استُردت.");
    handleSearch();
  }
}

function reportPost(id) {
  const car = cars.find(c => c.id === id);
  if (car) {
    car.reported++;
    if (car.reported >= 3) {
      car.retrieved = true;
      alert("🚫 تم إزالة المنشور بعد 3 تبليغات.");
    } else {
      alert("🚩 تم التبليغ، عدد التبليغات الآن: " + car.reported);
    }
    saveCars();
    handleSearch();
  }
}

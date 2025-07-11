const cars = [];

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
    fbImage: document.getElementById("fbImage").value.trim()
  };
  if (!car.type || !car.color) {
    alert("يجب إدخال نوع السيارة واللون على الأقل.");
    return;
  }
  cars.push(car);
  alert("✅ تم نشر السيارة");
  window.location.href = "search.html";
}

function handleSearch() {
  const type = document.getElementById("search-type").value.toLowerCase();
  const color = document.getElementById("search-color").value.toLowerCase();
  const chassis = document.getElementById("search-chassis").value.toLowerCase();
  const plate = document.getElementById("search-plate").value.toLowerCase();

  const results = cars.filter(car =>
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
      <strong>النوع:</strong> ${car.type}<br>
      <strong>اللون:</strong> ${car.color}<br>
      <strong>الشاسيه:</strong> ${car.chassis}<br>
      <strong>اللوحة:</strong> ${car.plate}<br>
      <strong>الموقع:</strong> ${car.location}<br>
      <strong>التاريخ:</strong> ${car.date}<br>
      <strong>ملاحظات:</strong> ${car.notes}<br>
      ${car.fbLink ? `<div class="facebook-post"><a href="${car.fbLink}" target="_blank">رابط منشور فيسبوك</a><br>${car.fbImage ? `<img src="${car.fbImage}" alt="صورة" />` : ""}</div>` : ""}
    `;
    container.appendChild(div);
  });
}

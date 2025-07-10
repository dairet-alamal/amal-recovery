
const cars = [];

function handlePost() {
  const car = {
    id: Date.now(),
    type: document.getElementById("type").value.trim(),
    color: document.getElementById("color").value.trim(),
    chassis: document.getElementById("chassis").value.trim(),
    location: document.getElementById("location").value.trim(),
    date: document.getElementById("date").value,
    notes: document.getElementById("notes").value.trim(),
    fbLink: document.getElementById("fbLink").value.trim(),
    fbImage: document.getElementById("fbImage").value.trim(),
    reports: 0
  };
  if(!car.type || !car.color || !car.chassis) {
    alert("يجب ملء نوع السيارة، اللون، ورقم الشاسيه على الأقل.");
    return;
  }
  cars.push(car);
  alert("✅ تم نشر السيارة بنجاح");
  clearPostFields();
  renderResults(cars);
}

function handleSearch() {
  const type = document.getElementById("search-type").value.toLowerCase();
  const color = document.getElementById("search-color").value.toLowerCase();
  const chassis = document.getElementById("search-chassis").value.toLowerCase();

  const results = cars.filter(car =>
    (type === "" || car.type.toLowerCase().includes(type)) &&
    (color === "" || car.color.toLowerCase().includes(color)) &&
    (chassis === "" || car.chassis.toLowerCase().includes(chassis))
  );

  renderResults(results);
}

function clearPostFields() {
  ["type", "color", "chassis", "location", "date", "notes", "fbLink", "fbImage"].forEach(id => {
    document.getElementById(id).value = "";
  });
}

function renderResults(results) {
  const container = document.getElementById("results");
  container.innerHTML = "";
  if(results.length === 0) {
    container.textContent = "❌ لا توجد نتائج";
    return;
  }
  results.forEach(car => {
    const div = document.createElement("div");
    div.className = "car-box";

    let fbPostHtml = "";
    if(car.fbLink) {
      fbPostHtml = `
        <div class="facebook-post">
          <a href="${car.fbLink}" target="_blank" rel="noopener noreferrer">رابط منشور فيسبوك</a><br>
          ${car.fbImage ? `<img src="${car.fbImage}" alt="صورة منشور فيسبوك" />` : ""}
        </div>
      `;
    }

    div.innerHTML = `
      <button class="report-btn" onclick="reportPost(${car.id})" title="تبليغ عن المنشور">تبليغ</button>
      <strong>النوع:</strong> ${car.type}<br>
      <strong>اللون:</strong> ${car.color}<br>
      <strong>الشاسيه:</strong> ${car.chassis}<br>
      <strong>الموقع:</strong> ${car.location}<br>
      <strong>التاريخ:</strong> ${car.date}<br>
      <strong>ملاحظات:</strong> ${car.notes}<br>
      ${fbPostHtml}
    `;
    container.appendChild(div);
  });
}

function reportPost(id) {
  const car = cars.find(c => c.id === id);
  if(!car) return;
  car.reports++;
  alert(`⚠️ تم التبليغ عن المنشور. عدد البلاغات: ${car.reports}`);
  if(car.reports >= 3) {
    // حذف المنشور بعد 3 تبليغات
    const index = cars.indexOf(car);
    if(index > -1) {
      cars.splice(index, 1);
      alert("❌ تم حذف المنشور بعد 3 تبليغات");
      renderResults(cars);
    }
  }
}

renderResults(cars);

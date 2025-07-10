
const cars = [];

function handlePost() {
  const car = {
    type: document.getElementById("type").value,
    color: document.getElementById("color").value,
    chassis: document.getElementById("chassis").value,
    location: document.getElementById("location").value,
    date: document.getElementById("date").value,
    notes: document.getElementById("notes").value,
  };
  cars.push(car);
  alert("✅ تم نشر السيارة");
  clearPostFields();
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

  const container = document.getElementById("results");
  container.innerHTML = results.length ? "" : "❌ لا توجد نتائج";

  results.forEach(car => {
    const div = document.createElement("div");
    div.className = "car-box";
    div.innerHTML = `
      <strong>النوع:</strong> ${car.type}<br>
      <strong>اللون:</strong> ${car.color}<br>
      <strong>الشاسيه:</strong> ${car.chassis}<br>
      <strong>الموقع:</strong> ${car.location}<br>
      <strong>التاريخ:</strong> ${car.date}<br>
      <strong>ملاحظات:</strong> ${car.notes}
    `;
    container.appendChild(div);
  });
}

function clearPostFields() {
  ["type", "color", "chassis", "location", "date", "notes"].forEach(id => {
    document.getElementById(id).value = "";
  });
}

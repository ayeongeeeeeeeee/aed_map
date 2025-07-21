// 지도 생성
var map = L.map('map').setView([36.5674, 126.6151], 15); // 해미 중심 좌표

// 지도 타일 불러오기
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap'
}).addTo(map);

// 기본 AED 마커 (CSV에서 불러오기)
fetch("aed_data.csv")
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.trim().split("\n").slice(1); // 헤더 제외

    rows.forEach(row => {
      const [name, lat, lng] = row.split(",");
      if (lat && lng) {
        L.marker([parseFloat(lat), parseFloat(lng)])
          .addTo(map)
          .bindPopup(`<b>${name}</b>`);
      }
    });
  });

// 지도 클릭 시 사용자 마커 추가
map.on('click', function(e) {
  const lat = e.latlng.lat.toFixed(6);
  const lng = e.latlng.lng.toFixed(6);
  const name = prompt("AED 위치의 이름을 입력하세요:");

  if (name) {
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`<b>${name}</b>`);

    // 콘솔에 출력 (CSV 포맷)
    console.log(`"${name}",${lat},${lng}`);
  }
  if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service_worker.js")
    .then(() => console.log("✅ 서비스 워커 등록됨"))
    .catch(err => console.error("❌ 서비스 워커 등록 실패:", err));
}
});
document.addEventListener("DOMContentLoaded", function () {
  fetch("mascotas.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      const mascotas = xml.getElementsByTagName("mascota");
      const contenedor = document.getElementById("contenedor-mascotas");

      for (let mascota of mascotas) {
        const nombre = mascota.getElementsByTagName("nombre")[0].textContent;
        const edad = mascota.getElementsByTagName("edad")[0].textContent;
        const raza = mascota.getElementsByTagName("raza")[0].textContent;
        const foto = mascota.getElementsByTagName("foto")[0].textContent;

        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("tabindex", "0");
        card.innerHTML = `
          <img src="${foto}" alt="" role="presentation">
          <h3>${nombre}</h3>
          <p><strong>Edad:</strong> ${edad} años</p>
          <p><strong>Raza:</strong> ${raza}</p>
          
        `;
        contenedor.appendChild(card);
      }
    })
    .catch(error => {
      document.getElementById("contenedor-mascotas").innerHTML =
        "<p>No se pudo cargar la lista de mascotas.</p>";
      console.error("Error cargando XML:", error);
    });
});

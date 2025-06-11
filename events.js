"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const deleteAllBtn = document.getElementById("deleteAllBtn");
  const contactsContainer = document.getElementById("contactsContainer");
  const addBtn = document.getElementById("addContactBtn");
  const popup = document.getElementById("popupOverlay");
  const form = document.getElementById("contactForm");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = contacts.filter((c) =>
      c.name.toLowerCase().includes(query)
    );
    renderContacts(filtered);
  });

  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all contacts?")) {
      contacts.length = 0;
      renderContacts([]);
      updatePeopleCount();
    }
  });

  addBtn.addEventListener("click", () => {
    form.reset();
    popup.classList.remove("hidden");
    form.onsubmit = (ev) => {
      ev.preventDefault();

      const newContact = {
        name: document.getElementById("nameInput").value,
        phone: document.getElementById("phoneInput").value,
        address: document.getElementById("addressInput").value,
        age: document.getElementById("ageInput").value,
        imageUrl:
          document.getElementById("imageUrlInput").value ||
          "https://i.pravatar.cc/200?u=" + Math.random(),
      };

      if (!newContact.name || !newContact.phone) {
        alert("Name and Phone are required");
        return;
      }

      contacts.push(newContact);
      renderContacts(contacts);
      updatePeopleCount();
      popup.classList.add("hidden");
    };
  });

  contactsContainer.addEventListener("click", (e) => {
    const index = e.target.dataset.id;

    if (e.target.classList.contains("delete-btn")) {
      if (confirm("Delete this contact?")) {
        contacts.splice(index, 1);
        renderContacts(contacts);
        updatePeopleCount();
      }
    }

    if (e.target.classList.contains("edit-btn")) {
      const contact = contacts[index];
      document.getElementById("nameInput").value = contact.name;
      document.getElementById("phoneInput").value = contact.phone;
      document.getElementById("addressInput").value = contact.address;
      document.getElementById("ageInput").value = contact.age;
      document.getElementById("imageUrlInput").value = contact.imageUrl;

      popup.classList.remove("hidden");

      form.onsubmit = (ev) => {
        ev.preventDefault();
        contact.name = document.getElementById("nameInput").value;
        contact.phone = document.getElementById("phoneInput").value;
        contact.address = document.getElementById("addressInput").value;
        contact.age = document.getElementById("ageInput").value;
        contact.imageUrl = document.getElementById("imageUrlInput").value;

        renderContacts(contacts);
        updatePeopleCount();
        popup.classList.add("hidden");
      };
    }

    if (e.target.classList.contains("view-btn")) {
      const contact = contacts[index];
      const html = `
        <img src="${
          contact.imageUrl
        }" class="avatar" style="margin-bottom:1rem">
        <h3>${contact.name}</h3>
        <p>📞 ${contact.phone}</p>
        ${contact.address ? `<p>📍 ${contact.address}</p>` : ""}
        ${contact.age ? `<p>🎂 ${contact.age} years old</p>` : ""}
      `;
      document.getElementById("detailsContent").innerHTML = html;
      document.getElementById("detailsPopup").classList.remove("hidden");
    }
  });

  document.getElementById("closePopup").onclick = () => {
    popup.classList.add("hidden");
  };

  document.getElementById("closeDetails").onclick = () => {
    document.getElementById("detailsPopup").classList.add("hidden");
  };
});

function updatePeopleCount() {
  document.getElementById("peopleCount").textContent = contacts.length;
}

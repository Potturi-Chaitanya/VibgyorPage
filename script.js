let isSubmitted = false;

function showSection(sectionId) {
  if (sectionId === "products" && !isSubmitted) {
    document.getElementById("mobilePopup").style.display = "flex";
    return;
  }

  let sections = document.querySelectorAll("section");
  sections.forEach((sec) => (sec.style.display = "none"));

  if (sectionId === "home") {
    document.getElementById(sectionId).style.display = "flex";
  } else {
    document.getElementById(sectionId).style.display = "block";
  }
}

function showProducts(category) {
  const display = document.getElementById("productDisplay");

  let images = {
    pos: ["images/pos1.jpg", "images/pos2.jpg", "images/pos3.jpg"],
    bill: [
      "images/billprint1.jpg",
      "images/billprint2.jpg",
      "images/billprint3.jpg",
    ],
    barcode: ["images/barcode1.jpg", "images/barcode2.jpg"],
    scanner: ["images/scanner1.jpg", "images/scanner2.jpg"],
    weight: ["images/weighmachine1.jpg", "images/weighmachine2.jpg"],
  };

  display.innerHTML = "";

  images[category].forEach((img) => {
    display.innerHTML += `
      <div class="card">
        <img src="${img}">
      </div>
    `;
  });
}

async function submitDetails() {
  let mobile = document.getElementById("mobileInput").value;
  let email = document.getElementById("emailInput").value;

  let mobileValid = /^[0-9]{10}$/.test(mobile);
  let emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!mobileValid) {
    alert("Enter valid mobile number");
    return;
  }

  if (!emailValid) {
    alert("Enter valid email");
    return;
  }

  try {
    let response = await fetch("http://localhost:3000/saveLead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile, email }),
    });

    // 🔴 Important: check response properly
    if (!response.ok) {
      throw new Error("Server error");
    }

    let data = await response.json();

    console.log("Saved:", data);

    // ✅ CLOSE POPUP
    document.getElementById("mobilePopup").style.display = "none";
    alert("Going to products");
    // ✅ NAVIGATE TO PRODUCTS
    showSection("products");
  } catch (error) {
    console.error("Error:", error);
    alert("Error saving data");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const addressForm = document.getElementById("addressForm");
  const addressList = document.getElementById("addressList");
  const deleteAllBtn = document.getElementById("deleteAllBtn");
  const dialogBox = document.getElementById("dialogBox");

  let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

  function renderAddresses() {
    addressList.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Address 1</th>
            <th>Address 2</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Action</th>
            <th>Date/Time</th> <!-- Add the Time column -->
          </tr>
        </thead>
        <tbody>
          ${addresses.map((address, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${address.Address1}</td>
              <td>${address.Address2}</td>
              <td>${address.city}</td>
              <td>${address.state}</td>
              <td>${address.zipCode}</td>
              <td class="action">
                <button class="edit" onclick="editAddress(${index})">
                  <i class="fas fa-pencil-alt"></i> Edit
                </button>
                <button class="del" onclick="deleteAddress(${index})">
                  <i class="fas fa-trash-alt"></i> Delete
                </button>
              </td>
              <td>${address.time || ''}</td> <!-- Display the time -->
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  renderAddresses();

  addressForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const newAddress = {
      Address1: document.getElementById("Address1").value,
      Address2: document.getElementById("Address2").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zipCode: document.getElementById("zipCode").value,
      time: new Date().toLocaleString() 
    };

    if (validateAddress(newAddress)) {
      if (!isDuplicate(newAddress)) {
        addresses.push(newAddress);
        localStorage.setItem("addresses", JSON.stringify(addresses));
        renderAddresses();
        addressForm.reset();
        showDialog(); 
        setTimeout(hideDialog, 2000);
      } else {
        alert("This address already exists!");
      }
    }
    // Dialog box function
    function showDialog() {
      dialogBox.style.display = "block";
    }

    function hideDialog() {
      dialogBox.style.display = "none";
    }
  });

  // Address fields validation 

  function validateAddress(address) {
    if (!/[a-zA-Z]/.test(address.Address1)) {
      alert("Address 1 must contain text also.");
      return false;
    }
    if (address.Address1.length > 50) {
      alert("Address 1 cannot exceed 50 characters.");
      return false;
    }
    if (address.Address2.trim() !== "" && !/[a-zA-Z]/.test(address.Address2)) {
      alert("Address 2 must contain text also.");
      return false;
    }
    if (address.Address2.length > 50) {
      alert("Address 2 cannot exceed 50 characters.");
      return false;
    }
    if (!/[a-zA-Z]/.test(address.city)) {
      alert("City must contain text.");
      return false;
    }
    if (address.city.length > 20) {
      alert("City cannot exceed 20 characters.");
      return false;
    }
    if (!/[a-zA-Z]/.test(address.state)) {
      alert("State must contain text.");
      return false;
    }
    if (address.state.length > 20) {
      alert("State cannot exceed 20 characters.");
      return false;
    }
    if (!/^\d{6}$/.test(address.zipCode.trim())) {
      alert("Please enter a valid Zip Code (6 digits).");
      return false;
    }
    return true;
}

// To check duplicate addresses

  function isDuplicate(address) {
    return addresses.some(addr => {
      return addr.Address1 === address.Address1 &&
        addr.Address2 === address.Address2 &&
        addr.city === address.city &&
        addr.state === address.state &&
        addr.zipCode === address.zipCode;
    });
  }

  // Edit exisiting Address
  window.editAddress = function (index) {
    const editedAddress = addresses[index];
    document.getElementById("Address1").value = editedAddress.Address1;
    document.getElementById("Address2").value = editedAddress.Address2;
    document.getElementById("city").value = editedAddress.city;
    document.getElementById("state").value = editedAddress.state;
    document.getElementById("zipCode").value = editedAddress.zipCode;

    addresses.splice(index, 1);
    localStorage.setItem("addresses", JSON.stringify(addresses));
    renderAddresses();
  };

  // Delete an address
  window.deleteAddress = function (index) {
    if (confirm("Are you sure you want to delete this address?")) {
      addresses.splice(index, 1);
      localStorage.setItem("addresses", JSON.stringify(addresses));
      renderAddresses();
    }
  };
// Deleting all addresses
  function deleteAllAddresses() {
    if (confirm("Are you sure you want to delete all addresses?")) {
      addresses = []; 
      localStorage.removeItem("addresses"); 
      renderAddresses(); 
    }
  }

  deleteAllBtn.addEventListener("click", deleteAllAddresses);
});

// Scroll Button
document.addEventListener("DOMContentLoaded", function () {
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  });

});



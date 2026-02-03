// // ===== GLOBAL STATE =====
// let state = {
//   role: "",
//   user: "",
//   events: JSON.parse(localStorage.getItem("events")) || []
// };

// // ===== LOGIN =====
// function login() {
//   const role = document.getElementById("role").value;
//   const username = document.getElementById("username").value.trim();

//   if (role === "" || username === "") {
//     alert("Select role and enter name");
//     return;
//   }

//   state.role = role;
//   state.user = username;

//   document.getElementById("login").classList.add("hidden");

//   if (role === "admin") {
//     document.getElementById("adminPanel").classList.remove("hidden");
//     renderAdminEvents();
//   } else {
//     document.getElementById("studentPanel").classList.remove("hidden");
//     renderStudentEvents();
//   }
// }

// // ===== CREATE EVENT (ADMIN) =====
// function createEvent() {
//   const name = document.getElementById("eventName").value.trim();
//   const date = document.getElementById("eventDate").value;

//   if (name === "" || date === "") {
//     alert("Fill all event details");
//     return;
//   }

//   const event = {
//     id: Date.now(),
//     name,
//     date,
//     registrations: [],
//     attendance: []
//   };

//   state.events.push(event);
//   localStorage.setItem("events", JSON.stringify(state.events));

//   document.getElementById("eventName").value = "";
//   document.getElementById("eventDate").value = "";

//   renderAdminEvents();
// }

// // ===== ADMIN EVENTS + DASHBOARD =====
// function renderAdminEvents() {
//   const list = document.getElementById("adminEvents");
//   list.innerHTML = "";

//   state.events.forEach(event => {
//     const li = document.createElement("li");
//     li.innerHTML = `
//       <strong>${event.name}</strong> (${event.date})<br>
//       Registered: ${event.registrations.length}<br>
//       Present: ${event.attendance.length}
//     `;
//     list.appendChild(li);
//   });

//   updateDashboard();
// }

// function updateDashboard() {
//   document.getElementById("totalEvents").textContent = state.events.length;

//   let totalRegistrations = 0;
//   let totalAttendance = 0;

//   state.events.forEach(event => {
//     totalRegistrations += event.registrations.length;
//     totalAttendance += event.attendance.length;
//   });

//   document.getElementById("totalRegistrations").textContent = totalRegistrations;
//   document.getElementById("totalAttendance").textContent = totalAttendance;
// }

// // ===== STUDENT EVENTS =====
// function renderStudentEvents() {
//   const list = document.getElementById("studentEvents");
//   list.innerHTML = "";

//   state.events.forEach(event => {
//     const li = document.createElement("li");

//     const registered = event.registrations.includes(state.user);
//     const present = event.attendance.includes(state.user);

//     li.innerHTML = `
//       <strong>${event.name}</strong> (${event.date})<br>
//       Status: ${registered ? "Registered" : "Not Registered"} 
//       ${present ? "| Present" : ""}
//       <br><br>
//       <button onclick="registerEvent(${event.id})">Register</button>
//       <button onclick="markAttendance(${event.id})">Mark Attendance</button>
//     `;

//     list.appendChild(li);
//   });
// }

// // ===== REGISTER EVENT =====
// function registerEvent(eventId) {
//   const event = state.events.find(e => e.id === eventId);

//   if (event.registrations.includes(state.user)) {
//     alert("Already registered");
//     return;
//   }

//   event.registrations.push(state.user);
//   localStorage.setItem("events", JSON.stringify(state.events));

//   renderStudentEvents();
// }

// // ===== MARK ATTENDANCE =====
// function markAttendance(eventId) {
//   const event = state.events.find(e => e.id === eventId);

//   if (!event.registrations.includes(state.user)) {
//     alert("Register first");
//     return;
//   }

//   if (event.attendance.includes(state.user)) {
//     alert("Already marked present");
//     return;
//   }

//   event.attendance.push(state.user);
//   localStorage.setItem("events", JSON.stringify(state.events));

//   renderStudentEvents();
// }
// document.addEventListener("DOMContentLoaded", function () {
//   const btn = document.getElementById("createEventBtn");
//   if (btn) {
//     btn.addEventListener("click", createEvent);
//   }
// });
// new QRCode(document.getElementById("qrBox"), {
//   text: event.id.toString(),
//   width: 150,
//   height: 150
// });
// sessionStorage.setItem("user", JSON.stringify(state));
// const savedUser = JSON.parse(sessionStorage.getItem("user"));
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// // Example: encode eventID as QR
// const eventID = "EVT123"; // get dynamically in real project
// QRCode.toCanvas(document.getElementById('qrCode'), eventID, function (error) {
//   if (error) console.error(error);
//   console.log('QR code generated!');
// });

// function downloadCertificate() {
//   let registeredCount = 0;
//   let attendedCount = 0;

//   state.events.forEach(event => {
//     if (event.registrations.includes(state.user)) {
//       registeredCount++;
//       if (event.attendance.includes(state.user)) {
//         attendedCount++;
//       }
//     }
//   });

//   if (registeredCount === 0) {
//     alert("You have not registered for any events");
//     return;
//   }

//   const attendancePercentage = (attendedCount / registeredCount) * 100;

//   if (attendancePercentage < 75) {
//     document.getElementById("certificateStatus").innerText =
//       `❌ Not Eligible (Attendance: ${attendancePercentage.toFixed(2)}%)`;
//     return;
//   }

//   document.getElementById("certificateStatus").innerText =
//     `✅ Eligible (Attendance: ${attendancePercentage.toFixed(2)}%)`;

//   generateFakeCertificate(attendancePercentage);
// }
// function generateFakeCertificate(attendancePercentage) {
//   const content = `
// CERTIFICATE OF PARTICIPATION

// This is to certify that

// ${state.user}

// has successfully participated in college events
// with an attendance of ${attendancePercentage.toFixed(2)}%.

// Congratulations!

// -------------------------
// College Event Management System
// `;

//   const blob = new Blob([content], { type: "jpg" });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "image/dddj.jpg";
//   a.click();

//   URL.revokeObjectURL(url);
// }
// function generateImageCertificate(attendancePercentage) {
//   const canvas = document.createElement("canvas");
//   canvas.width = 800;
//   canvas.height = 600;

//   const ctx = canvas.getContext("2d");

//   // Background
//   ctx.fillStyle = "#f8fafc";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   // Border
//   ctx.strokeStyle = "#16a34a";
//   ctx.lineWidth = 8;
//   ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

//   // Title
//   ctx.fillStyle = "#0f172a";
//   ctx.font = "bold 36px Arial";
//   ctx.textAlign = "center";
//   ctx.fillText("CERTIFICATE OF PARTICIPATION", 400, 120);

//   // Name
//   ctx.font = "28px Arial";
//   ctx.fillText("This is to certify that", 400, 200);

//   ctx.font = "bold 32px Arial";
//   ctx.fillText(state.user, 400, 250);

//   // Attendance
//   ctx.font = "24px Arial";
//   ctx.fillText(
//     `has successfully participated with ${attendancePercentage.toFixed(2)}% attendance`,
//     400,
//     320
//   );

//   // Footer
//   ctx.font = "20px Arial";
//   ctx.fillText("College Event Management System", 400, 420);

//   ctx.fillText("Authorized Signature", 600, 500);

//   // Convert to image & download
//   const imageURL = canvas.toDataURL("image/jpeg");

//   const a = document.createElement("a");
//   a.href = imageURL;
//   a.download = "dddk.jpeg";
//   a.click();
// }


// ===== GLOBAL STATE =====
let state = {
  role: "",
  user: "",
  events: JSON.parse(localStorage.getItem("events")) || []
};

// ===== LOGIN =====
function login() {
  const role = document.getElementById("role").value;
  const username = document.getElementById("username").value.trim();

  if (!role || !username) {
    alert("Select role and enter name");
    return;
  }

  state.role = role;
  state.user = username;

  document.getElementById("login").classList.add("hidden");

  if (role === "admin") {
    document.getElementById("adminPanel").classList.remove("hidden");
    renderAdminEvents();
  } else {
    document.getElementById("studentPanel").classList.remove("hidden");
    renderStudentEvents();
  }
}

// ===== CREATE EVENT =====
function createEvent() {
  const name = document.getElementById("eventName").value.trim();
  const date = document.getElementById("eventDate").value;

  if (!name || !date) {
    alert("Fill all event details");
    return;
  }

  state.events.push({
    id: Date.now(),
    name,
    date,
    registrations: [],
    attendance: []
  });

  localStorage.setItem("events", JSON.stringify(state.events));

  document.getElementById("eventName").value = "";
  document.getElementById("eventDate").value = "";

  renderAdminEvents();
}

// ===== ADMIN VIEW =====
function renderAdminEvents() {
  const list = document.getElementById("adminEvents");
  list.innerHTML = "";

  state.events.forEach(event => {
    list.innerHTML += `
      <li>
        <strong>${event.name}</strong> (${event.date})<br>
        Registered: ${event.registrations.length}<br>
        Present: ${event.attendance.length}
      </li>
    `;
  });

  updateDashboard();
}

function updateDashboard() {
  let totalRegistrations = 0;
  let totalAttendance = 0;

  state.events.forEach(e => {
    totalRegistrations += e.registrations.length;
    totalAttendance += e.attendance.length;
  });

  document.getElementById("totalEvents").innerText = state.events.length;
  document.getElementById("totalRegistrations").innerText = totalRegistrations;
  document.getElementById("totalAttendance").innerText = totalAttendance;
}

// ===== STUDENT VIEW =====
function renderStudentEvents() {
  const list = document.getElementById("studentEvents");
  list.innerHTML = "";

  state.events.forEach(event => {
    const registered = event.registrations.includes(state.user);
    const present = event.attendance.includes(state.user);

    list.innerHTML += `
      <li>
        <strong>${event.name}</strong> (${event.date})<br>
        Status: ${registered ? "Registered" : "Not Registered"}
        ${present ? "| Present" : ""}
        <br><br>
        <button onclick="registerEvent(${event.id})">Register</button>
        <button onclick="markAttendance(${event.id})">Mark Attendance</button>
      </li>
    `;
  });
}

// ===== REGISTER =====
function registerEvent(id) {
  const event = state.events.find(e => e.id === id);

  if (event.registrations.includes(state.user)) {
    alert("Already registered");
    return;
  }

  event.registrations.push(state.user);
  localStorage.setItem("events", JSON.stringify(state.events));
  renderStudentEvents();
}

// ===== ATTENDANCE =====
function markAttendance(id) {
  const event = state.events.find(e => e.id === id);

  if (!event.registrations.includes(state.user)) {
    alert("Register first");
    return;
  }

  if (event.attendance.includes(state.user)) {
    alert("Already marked");
    return;
  }

  event.attendance.push(state.user);
  localStorage.setItem("events", JSON.stringify(state.events));
  renderStudentEvents();
}

// ===== CERTIFICATE =====
function downloadCertificate() {
  let registered = 0;
  let attended = 0;

  state.events.forEach(e => {
    if (e.registrations.includes(state.user)) {
      registered++;
      if (e.attendance.includes(state.user)) attended++;
    }
  });

  if (registered === 0) {
    alert("No events registered");
    return;
  }

  const percentage = (attended / registered) * 100;

  if (percentage < 75) {
    document.getElementById("certificateStatus").innerText =
      `❌ Not Eligible (${percentage.toFixed(2)}%)`;
    return;
  }

  document.getElementById("certificateStatus").innerText =
    `✅ Eligible (${percentage.toFixed(2)}%)`;

  generateImageCertificate(percentage);
}

// ===== IMAGE CERTIFICATE (FINAL) =====
function generateImageCertificate(attendancePercentage) {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#16a34a";
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 760, 560);

  ctx.fillStyle = "#0f172a";
  ctx.textAlign = "center";

  ctx.font = "bold 36px Arial";
  ctx.fillText("CERTIFICATE OF PARTICIPATION", 400, 120);

  ctx.font = "26px Arial";
  ctx.fillText("This is to certify that", 400, 200);

  ctx.font = "bold 32px Arial";
  ctx.fillText(state.user, 400, 260);

  ctx.font = "24px Arial";
  ctx.fillText(`Attendance: ${attendancePercentage.toFixed(2)}%`, 400, 330);

  ctx.font = "20px Arial";
  ctx.fillText("College Event Management System", 400, 420);

  const img = canvas.toDataURL("image/jpeg");
  const a = document.createElement("a");
  a.href = img;
  a.download = "certificate.jpg";
  a.click();
}


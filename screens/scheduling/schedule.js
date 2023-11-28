document.addEventListener("DOMContentLoaded", function () {
  var department = document.querySelector("#department");
  var doctorName = document.querySelector("#provider");
  var appointmentDate = document.querySelector("#appointmentDate");
  var appointmentTime = document.querySelector("#appointmentTime");
  var button = document.querySelector("button");

  button.addEventListener("click", function (event) {
    event.preventDefault();
    const selectedDate = new Date(appointmentDate.value);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = selectedDate.getDay();
    const dayName = daysOfWeek[dayOfWeek];

    var appointment = {
      department: department.value,
      doctorId: doctorName.value,
      appointmentDate: appointmentDate.value,
      appointmentDay: dayName,
      slotId: appointmentTime.value,
    };

    // Display the form data in the console (for testing purposes)
    console.log(appointment);

    fetch("/bookAppointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        // Process the response data as needed
        console.log("Appointment scheduled successfully:", data);
        const bookingStatusElement = document.getElementById("bookingStatus");
        if (bookingStatusElement) {
          bookingStatusElement.innerHTML = "<p>Booking successful!</p>";
        }
        // Show success message or perform other actions based on the response
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors or show error messages to the user
      });
  });

  department.addEventListener("change", function (event) {
    console.log("department changed");
    const selectedDepartment = department.value;
    fetch("/getProvider", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ department: selectedDepartment }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        let final =
          '<option value="" selected disabled>Select a provider</option>';
        for (const entry of data) {
          const doctorId = entry.doc_id;
          const doctor = entry.first_name + " " + entry.last_name;
          const modifiedOption = `<option value="${doctorId}">${doctor}</option>`;
          final += modifiedOption;
        }
        document.getElementById("provider").innerHTML = final;
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors or show error messages to the user
      });
  });

  appointmentDate.addEventListener("change", function (event) {
    const selectedDateValue = appointmentDate.value;
    const doctorId = doctorName.value;

    const selectedDate = new Date(selectedDateValue);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = selectedDate.getDay();

    const dayName = daysOfWeek[dayOfWeek];

    // Display the selected date and its corresponding day of the week
    console.log("Selected Date:", selectedDateValue);
    console.log("Day of the Week:", dayName);

    fetch("/getProviderSlots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doc_id: doctorId,
        date: selectedDateValue,
        day: dayName,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        let final = '<option value="" selected disabled>Select a time</option>';
        for (const entry of data) {
          const slotId = entry.slot_id;
          const slotTiming = entry.slot_timing;
          const modifiedOption = `<option value="${slotId}">${slotTiming}</option>`;
          final += modifiedOption;
        }
        document.getElementById("appointmentTime").innerHTML = final;
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors or show error messages to the user
      });
  });
});

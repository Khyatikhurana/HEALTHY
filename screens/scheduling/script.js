document.addEventListener("DOMContentLoaded", function() {
  var patientName = document.querySelector("#patientName");
  var department = document.querySelector("#department");
  var doctorName = document.querySelector("#provider");
  var appointmentDate = document.querySelector("#appointmentDate");
  var appointmentTime = document.querySelector("#appointmentTime");

  var button = document.querySelector("button");

  button.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission or button behavior

    var appointment = {
      patientName: patientName.value,
      department: department.value,
      doctorName: doctorName.value,
      appointmentDate: appointmentDate.value,
      appointmentTime: appointmentTime.value
    };
    
    // Display the form data in the console (for testing purposes)
    console.log(appointment);

    fetch("/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appointment)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      // Process the response data as needed
      console.log('Appointment scheduled successfully:', data);
      // Show success message or perform other actions based on the response
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors or show error messages to the user
    });
  });
});

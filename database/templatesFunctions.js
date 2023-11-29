const dateFormatter = require("./dateFormatter");


function replaceAppointmentDepartment(template, data) {
  //    console.log(data);
      let final = "";
    
      // Iterate through each entry in the data array
      for (const entry of data) {
        const department = entry.department;
        
        // Generate the modified option for each department
        const modifiedOption = `<option value="${department}">${department}</option>`;
        
        // Append the modified option to the final string
        final += modifiedOption;
      }
    
      // Replace the placeholder in the main template with the generated options
      template = template.replace("{%DEPT-OPTS%}", final);
    
      return template;
    }
  

function fillTable(data) {
  let final = "";

  if (data.length === 0) {
    return "No Upcoming Appointments";
  }
  for (const ele of data) {
    const formattedDate = dateFormatter.formatDate(ele.date);
    // Generate the modified option for each department
    const modifiedOption = `<tr>
    <td>${formattedDate}</td>
    <td>${ele.appointment_time}</td>
    <td>Dr. ${ele.doctor_first_name} ${ele.doctor_last_name}</td>
    <th scope="row">${ele.status}</th>
    </tr>`;
    // Append the modified option to the final string
    final += modifiedOption;
  }

  // Replace the placeholder in the main template with the generated options

  return final;
}

function fillDoctorTable(data) {
  let final = "";

  if (data.length === 0) {
    return "No Upcoming Appointments";
  }
  for (const ele of data) {
    const formattedDate = dateFormatter.formatDate(ele.date);
    const modifiedOption = `<tr>
    <td>${formattedDate}</td>
    <td>${ele.slot_timing}</td>
    <td>${ele.patient_first_name} ${ele.patient_last_name}</td>
    <th scope="row">${ele.status}</th>
    </tr>`;
    // Append the modified option to the final string
    final += modifiedOption;
  }

  // Replace the placeholder in the main template with the generated options

  return final;
}

function fillAppointment(data) {
  let final = "";

  if (data.length === 0) {
    return "No Upcoming Appointments";
  }

  for (const ele of data) {
    const formattedDate = dateFormatter.formatDate(ele.date);
    // Generate the modified option for each department
    const modifiedOption = `<div class="History">
      ${formattedDate}, Dr. ${ele.doctor_first_name} ${ele.doctor_last_name} 
      <a id= '${ele.appointment_id}'onclick="handleClick(this)" href="#" class="Cancel">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
      </svg>
      </a>
    </div>`;

    // Append the modified option to the final string
    final += modifiedOption;
  }

  // Replace the placeholder in the main template with the generated options

  return final;
}


module.exports = { fillTable, fillAppointment, fillDoctorTable, replaceAppointmentDepartment };

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
  
  module.exports = {replaceAppointmentDepartment};
  
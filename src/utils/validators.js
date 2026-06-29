export const validateForm = (formData) => {
  const errors = {};

  const firstName = formData.firstName?.trim() || "";
  const lastName = formData.lastName?.trim() || "";
  const email = formData.email?.trim() || "";
  const department = formData.department?.trim() || "";

  // First Name
  if (!firstName) {
    errors.firstName = "First Name is required.";
  } else if (firstName.length < 2) {
    errors.firstName = "First Name must be at least 2 characters.";
  }

  // Last Name
  if (!lastName) {
    errors.lastName = "Last Name is required.";
  } else if (lastName.length < 2) {
    errors.lastName = "Last Name must be at least 2 characters.";
  }

  // Email
  if (!email) {
    errors.email = "Email is required.";
  } else {
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  // Department
  if (!department) {
    errors.department = "Please select a department.";
  } else {
    const validDepartments = [
      "IT",
      "Engineering",
      "HR",
      "Finance",
      "Sales",
    ];

    if (!validDepartments.includes(department)) {
      errors.department = "Invalid department selected.";
    }
  }

  return errors;
};
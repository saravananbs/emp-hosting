import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  // Load data from localStorage or initialize with an empty array
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employees");
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if Employee ID already exists
    if (employees.some((emp) => emp.employeeId === form.employeeId)) {
      alert("Employee ID already exists!");
      return;
    }

    // Add new employee to the list
    const newEmployees = [...employees, form];
    setEmployees(newEmployees);

    // Save updated data to localStorage
    localStorage.setItem("employees", JSON.stringify(newEmployees));

    // Reset the form
    setForm({
      name: "",
      employeeId: "",
      email: "",
      phoneNumber: "",
      department: "",
      dateOfJoining: "",
      role: "",
    });
  };

  const handleDelete = (id) => {
    const filteredEmployees = employees.filter((emp) => emp.employeeId !== id);
    setEmployees(filteredEmployees);

    // Update localStorage
    localStorage.setItem("employees", JSON.stringify(filteredEmployees));
  };

  // Effect to initialize employees from localStorage
  useEffect(() => {
    const savedEmployees = localStorage.getItem("employees");
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  return (
    <div>
      <h1>Employee Management System</h1>

      {/* Employee Form */}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Employee ID:</label>
        <input
          type="text"
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          maxLength="10"
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          pattern="\d{10}"
          title="Please enter a valid 10-digit number."
          required
        />

        <label>Department:</label>
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
        </select>

        <label>Date of Joining:</label>
        <input
          type="date"
          name="dateOfJoining"
          value={form.dateOfJoining}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]} // Prevent future dates
          required
        />

        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
        <button type="reset" onClick={() => setForm({})}>
          Reset
        </button>
      </form>

      {/* Employee Table */}
      {employees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.department}</td>
                <td>{employee.dateOfJoining}</td>
                <td>{employee.role}</td>
                <td>
                  <button onClick={() => handleDelete(employee.employeeId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees to display.</p>
      )}
    </div>
  );
};

export default App;

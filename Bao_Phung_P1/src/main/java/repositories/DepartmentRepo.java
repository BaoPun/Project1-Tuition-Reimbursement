package repositories;

import data.Department;
import data.Employee;

public interface DepartmentRepo {
	// Create a brand new department
	boolean createDepartment(Department department);
	
	// Read/get the department
	Department getDepartmentById(Employee employee);
	Department getDepartmentByLoginInfo(String email, String password);
	
	// No Update necessary
	
	// Delete the department (again not necessary)
	
}

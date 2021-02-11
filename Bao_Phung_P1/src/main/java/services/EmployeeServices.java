package services;

import java.util.List;

import data.Employee;

public interface EmployeeServices {
	
	// Create
	boolean createNewEmployee(String firstName, String lastName, String email, String password, String superEmail);
	
	
	
	// Read
	Employee loginEmployee(String email, String password);
	Employee getEmployeeByEmail(String email);
	Employee loginSupervisor(String email, String password);
	Employee loginBenefitsCoordinator(String email, String password);
	
	
	
	
	// Update
	
	
	
	
	// Delete
}

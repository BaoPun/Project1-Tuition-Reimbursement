package repositories;

import java.util.List;

import data.Employee;

/**
 * Create CRUD operations for an Employee
 * @author baoph
 *
 */
public interface EmployeeRepo {
	// Create a new employee to be added to the database
	boolean createEmployee(Employee employee);
	
	// Read/Get employees by various methods
	Employee getEmployeeById(int id);
	Employee getEmployeeByEmail(String email);
	Employee getSupervisorByEmail(String email);
	List<Employee> getAllSupervisedEmployees(int id);			// retrieve all employees that are supervised.
	Employee getEmployeeByLoginInfo(String email, String password);
	Employee getSupervisorByLoginInfo(String email, String password);
	Employee getDepartmentHeadByLoginInfo(String email, String password);
	Employee getBenefitsCoordinatorByLoginInfo(String email, String password);

	// Update employees
	boolean updateEmployee(Employee employee);
	boolean updateEmployeeBalance(Employee employee);
	
	// Delete employees
	boolean deleteEmployee(Employee employee);
	
}

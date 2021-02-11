package repositories;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import data.Department;
import data.Employee;
import util.DBConnection;

public class DepartmentRepoImpl implements DepartmentRepo {
	
	private EmployeeRepo empRepo = new EmployeeRepoImpl();

	@Override
	public boolean createDepartment(Department department) {
		try {
			String SQLStatement = "INSERT INTO Department VALUES (?, ?, ?)";
			CallableStatement cs = DBConnection.getConnection().prepareCall(SQLStatement);
			cs.setInt(1, department.getDeptId());
			cs.setString(2, department.getType());
			cs.setInt(3, department.getHeadEmployee().getEmpId());
			
			cs.execute();
			cs.close();
			
			return true;
		}
		catch(SQLException e) {
			return false;
		}
	}

	@Override
	public Department getDepartmentById(Employee employee) {
		try {
			String SQLStatement = "SELECT * FROM Department WHERE emp_id = ?";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			ps.setInt(1, employee.getEmpId());
			
			ResultSet rs = ps.executeQuery();
			if(rs.next()) 
				return new Department(rs.getInt(1), rs.getString(2), employee);
		}
		catch(SQLException e) {}
		return null;
	}

	@Override
	public Department getDepartmentByLoginInfo(String email, String password) {
		// Retrieve the employee by the given login information
		// First, a supervisor can also be a department, so query by supervisor first (supervisors have a supervisor_id field of -1)
		Employee emp = empRepo.getSupervisorByLoginInfo(email, password);
		
		// If this doesn't work, try the second query: checking the department table and the supervisor id being -2 instead of -1.
		if(emp == null) 
			emp = empRepo.getDepartmentHeadByLoginInfo(email, password);
		
		System.out.println(emp);
		
		// Then, return the method above to query by the id, assuming we found an appropriate employee.
		return (emp != null ? getDepartmentById(emp) : null);
	}
	

}

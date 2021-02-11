package repositories;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import data.Employee;
import util.DBConnection;

public class EmployeeRepoImpl implements EmployeeRepo {
	
	/**
	 * Add a new employee to the database.
	 */
	@Override
	public boolean createEmployee(Employee employee) {
		try {
			// In order: employee id, first name, last name, email, password, balance, supervisor id
			String SQLStatement = "INSERT INTO Employee VALUES (employee_id_generator.nextval, ?, ?, ?, ?, ?, ?)";
			CallableStatement cs = DBConnection.getConnection().prepareCall(SQLStatement);
			cs.setString(1, employee.getFirstName());
			cs.setString(2, employee.getLastName());
			cs.setString(3, employee.getEmail());
			cs.setString(4, employee.getPassword());
			cs.setDouble(5, employee.getBalance());
			cs.setInt(6, employee.getSupervisorId());
			
			cs.execute();
			cs.close();
			
			return true;
		}
		catch(SQLException e) {
			return false;
		}
		
	}
	
	@Override
	public Employee getEmployeeById(int id) {
		try {
			String SQLStatement = "SELECT * FROM Employee WHERE emp_id = ?";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			ps.setInt(1, id);
			
			ResultSet rs = ps.executeQuery();
			
			/*
			 * Supervisor id is 7, so parameters are (1, 7, 2, 3, 4, 5, 6)
			 */
			if(rs.next())
				return new Employee(rs.getInt(1), rs.getInt(7), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getDouble(6));
		}
		catch(SQLException e) {}
		return null;
	}

	@Override
	public Employee getEmployeeByEmail(String email) {
		try {
			String SQLStatement = "SELECT * FROM Employee WHERE lower(email) = ? AND supervisor_id != -1";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			ps.setString(1, email.toLowerCase());
			
			ResultSet rs = ps.executeQuery();
			
			/*
			 * Supervisor id is 7, so parameters are (1, 7, 2, 3, 4, 5, 6)
			 */
			if(rs.next())
				return new Employee(rs.getInt(1), rs.getInt(7), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getDouble(6));
		}
		catch(SQLException e) {}
		return null;
	}
	
	@Override
	public Employee getSupervisorByEmail(String email) {
		try {
			String SQLStatement = "SELECT * FROM Employee WHERE lower(email) = ? AND supervisor_id = -1";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			ps.setString(1, email.toLowerCase());
			
			ResultSet rs = ps.executeQuery();
			
			// Supervisor id is 7, so parameters are (1, 7, 2, 3, 4, 5, 6)
			if(rs.next())
				return new Employee(rs.getInt(1), rs.getInt(7), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getDouble(6));
		}
		catch(SQLException e) {}
		return null;
	}

	@Override
	public List<Employee> getAllSupervisedEmployees(int id) {
		try {
			List<Employee> supervisedEmployees = new ArrayList<Employee>();
			String SQLStatement = "SELECT * FROM Employee WHERE supervisor_id = ?";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			ps.setInt(1, id);
			
			ResultSet rs = ps.executeQuery();
			while(rs.next())
				supervisedEmployees.add(new Employee(rs.getInt(1), rs.getInt(7), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getDouble(6)));
			
			rs.close();
			return supervisedEmployees;
		}
		catch(SQLException e) {}
		return null;
	}
	
	@Override
	public Employee getEmployeeByLoginInfo(String email, String password) {
		try {
			// All employees have a supervisor (hence supervisor_id != -1)
			String SQLStatement = "SELECT * FROM Employee WHERE lower(email) = ? AND password = ? AND supervisor_id != -1";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			ps.setString(1, email.toLowerCase());
			ps.setString(2, password);
			
			ResultSet rs = ps.executeQuery();
			if(rs.next())
				return new Employee(rs.getInt(1), rs.getInt(7), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getDouble(6));
				
		}
		catch(SQLException e) {System.out.println(e.getMessage());}
		return null;
		
	}
	
	@Override
	public Employee getSupervisorByLoginInfo(String email, String password) {
		try {
			// All employees have a supervisor (hence supervisor_id != -1)
			String SQLStatement = "SELECT * FROM Employee WHERE lower(email) = ? AND password = ? AND supervisor_id = -1";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			ps.setString(1, email.toLowerCase());
			ps.setString(2, password);
			
			ResultSet rs = ps.executeQuery();
			if(rs.next())
				return new Employee(rs.getInt(1), rs.getInt(7), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getDouble(6));
				
		}
		catch(SQLException e) {}
		return null;
	}
	
	@Override
	public Employee getDepartmentHeadByLoginInfo(String email, String password) {
		try {
			String SQLStatement = "SELECT * FROM Employee WHERE lower(email) = ? AND password = ? AND supervisor_id = -2";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			
			ps.setString(1, email.toLowerCase());
			ps.setString(2, password);
			
			ResultSet rs = ps.executeQuery();
			
			if(rs.next())
				return new Employee(rs.getInt(1), rs.getInt(7), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getDouble(6));
			
		}
		catch(SQLException e) {}
		return null;
	}
	
	@Override
	public Employee getBenefitsCoordinatorByLoginInfo(String email, String password) {
		try {
			String SQLStatement = "SELECT * FROM Employee WHERE lower(email) = ? AND password = ? AND supervisor_id = -3";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			
			ps.setString(1, email.toLowerCase());
			ps.setString(2, password);
			
			ResultSet rs = ps.executeQuery();
			
			if(rs.next())
				return new Employee(rs.getInt(1), rs.getInt(7), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getDouble(6));
			
		}
		catch(SQLException e) {}
		return null;
	}
	
	@Override
	public boolean updateEmployeeBalance(Employee employee) {
		
		try {
			String SQLStatement = "UPDATE Employee SET cost = ? WHERE empId = ?";
			CallableStatement cs = DBConnection.getConnection().prepareCall(SQLStatement);
			
			cs.setDouble(1, employee.getBalance());
			cs.setInt(1, employee.getEmpId());
			
			cs.execute();
			cs.close();
					
			return true;
		}
		catch(SQLException e) { return false; }
	}

	@Override
	public boolean updateEmployee(Employee employee) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deleteEmployee(Employee employee) {
		// TODO Auto-generated method stub
		return false;
	}

}

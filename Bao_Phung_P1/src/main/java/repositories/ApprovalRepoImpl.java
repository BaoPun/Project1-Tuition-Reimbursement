package repositories;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import util.DBConnection;

public class ApprovalRepoImpl implements ApprovalRepo {

	@Override
	public boolean updateSupervisorApprovalResponse(int empId, int formId, String approval) {
		
		/*
		 * This will execute 2 separate sql statements: 
		 * 1 to update the approval response.
		 * 1 to retrieve the department info given the empId   
		 */
		try {
			// First, call the update of approval status (this must be successful)
			String SQLStatement = "UPDATE Approvals SET supervisor_approval = ? WHERE form_id = ?";
			CallableStatement cs = DBConnection.getConnection().prepareCall(SQLStatement);
			
			cs.setString(1, approval);
			cs.setInt(2, formId);
			
			cs.execute();
			cs.close();
			
			System.out.println(empId);
			
			// Second, check if the supervisor is also a department head
			SQLStatement = "SELECT * FROM Department WHERE emp_id = ?";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			
			ps.setInt(1, empId);
			
			
			ResultSet rs = ps.executeQuery();
			
			
			if(rs.next()) 
				updateDepartmentApprovalResponse(formId, approval);
			return true;
			
		}
		catch(SQLException e) {}
		
		return false;
	}

	@Override
	public boolean updateDepartmentApprovalResponse(int formId, String approval) {
		try {
			// Call the update of approval status 
			String SQLStatement = "UPDATE Approvals SET department_approval = ? WHERE form_id = ?";
			CallableStatement cs = DBConnection.getConnection().prepareCall(SQLStatement);
			
			cs.setString(1, approval);
			cs.setInt(2, formId);
			
			cs.execute();
			cs.close();
			
			return true;
		}
		catch(SQLException e) {}
		return false;
	}
	
	@Override
	public boolean updateBenefitCoApprovalResponse(int formId, String approval) {
		try {
			// Call the update of approval status 
			String SQLStatement = "UPDATE Approvals SET benefits_approval = ? WHERE form_id = ?";
			CallableStatement cs = DBConnection.getConnection().prepareCall(SQLStatement);
			
			cs.setString(1, approval);
			cs.setInt(2, formId);
			
			cs.execute();
			cs.close();
			
			return true;
		}
		catch(SQLException e) {}
		return false;
	}

}

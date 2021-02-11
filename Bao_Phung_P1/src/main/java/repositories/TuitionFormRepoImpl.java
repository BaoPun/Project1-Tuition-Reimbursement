package repositories;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import data.Employee;
import data.TuitionForm;
import util.DBConnection;

public class TuitionFormRepoImpl implements TuitionFormRepo {

	/**
	 * Create a brand new Tuition Form for supervisors and above to see!
	 */
	@Override
	public boolean createTuitionForm(TuitionForm tForm) {
		try {
			String SQLStatment = "CALL add_tuition_form(?, ?, ?, ?, ?, ?, ?)";
			CallableStatement cs = DBConnection.getConnection().prepareCall(SQLStatment);
			cs.setInt(1, tForm.getEmpId());
			cs.setString(2, tForm.getEventDate());
			cs.setString(3, tForm.getEventTime());
			cs.setString(4, tForm.getLocation());
			cs.setString(5, tForm.getDescription());
			cs.setString(6, tForm.getJustification());
			cs.setInt(7, tForm.getEventId());
			
			cs.execute();
			cs.close();
			
			return true;
		}
		catch(SQLException e) {
			System.out.println(e.getMessage());
			return false;
		}
	}

	@Override
	public TuitionForm getTuitionFormById(int id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<TuitionForm> getAllTuitionFormsBySupervisorId(int id){
		try {
			String SQLStatement = "SELECT * FROM Tuition_Form WHERE emp_id IN (SELECT emp_id FROM EMPLOYEE WHERE supervisor_id = ?) AND form_id IN (SELECT form_id FROM Approvals WHERE supervisor_approval = \'?\') ORDER BY form_id";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			ps.setInt(1, id);
			
			List<TuitionForm> tFormList = new ArrayList<TuitionForm>();
			ResultSet rs = ps.executeQuery();
			
			// Add in the following order: form_id, emp_id, event_id, date, time, location, description, justification, cost
			while(rs.next()) 
				tFormList.add(new TuitionForm(rs.getInt(1), rs.getInt(2), rs.getInt(9), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(8), rs.getDouble(7), rs.getInt(10)));
			return tFormList;
		}
		catch(SQLException e) {}
		return null;
	}
	
	@Override
	public List<TuitionForm> getAllTuitionFormsForDepartment(){
		try {
			String SQLStatement = "SELECT * FROM Tuition_Form WHERE form_id IN (SELECT form_id FROM Approvals WHERE department_approval = \'?\' AND supervisor_approval = 'yep') ORDER BY form_id";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			
			List<TuitionForm> tFormList = new ArrayList<TuitionForm>();
			ResultSet rs = ps.executeQuery();
			
			// Add in the following order: form_id, emp_id, event_id, date, time, location, description, justification, cost
			while(rs.next()) 
				tFormList.add(new TuitionForm(rs.getInt(1), rs.getInt(2), rs.getInt(9), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(8), rs.getDouble(7), rs.getInt(10)));
			return tFormList;
		}
		catch(SQLException e) {}
		return null;
	}
	
	@Override
	public List<TuitionForm> getAllTuitionFormsForBenefitsCoordinator(){
		try {
			String SQLStatement = "SELECT * FROM Tuition_Form WHERE form_id IN (SELECT form_id FROM Approvals WHERE benefits_approval = \'?\' AND department_approval = 'yep' AND supervisor_approval = 'yep') ORDER BY form_id";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			
			List<TuitionForm> tFormList = new ArrayList<TuitionForm>();
			ResultSet rs = ps.executeQuery();
			
			// Add in the following order: form_id, emp_id, event_id, date, time, location, description, justification, cost
			while(rs.next()) 
				tFormList.add(new TuitionForm(rs.getInt(1), rs.getInt(2), rs.getInt(9), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(8), rs.getDouble(7), rs.getInt(10)));
			return tFormList;
		}
		catch(SQLException e) {}
		return null;
	}
		
	@Override
	public List<TuitionForm> getAllCompletedEmployeeForms(int id){
		try {
			String SQLStatement = "SELECT * FROM Tuition_Form WHERE form_id IN (SELECT form_id FROM Approvals WHERE benefits_approval = 'yep') AND emp_id = ? AND grade_id = -1";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			
			ps.setInt(1, id);
			
			List<TuitionForm> tFormList = new ArrayList<TuitionForm>();
			ResultSet rs = ps.executeQuery();
			
			// Add in the following order: form_id, emp_id, event_id, date, time, location, description, justification, cost
			while(rs.next()) 
				tFormList.add(new TuitionForm(rs.getInt(1), rs.getInt(2), rs.getInt(9), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(8), rs.getDouble(7), rs.getInt(10)));
			return tFormList;
		}
		catch(SQLException e) {}
		return null;
	}
	
	@Override
	public List<TuitionForm> getAllCompletedForms(){
		try {
			String SQLStatement = "SELECT * FROM Tuition_Form WHERE form_id IN (SELECT form_id FROM Approvals WHERE benefits_approval = 'yep')";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			
			List<TuitionForm> tFormList = new ArrayList<TuitionForm>();
			ResultSet rs = ps.executeQuery();
			
			// Add in the following order: form_id, emp_id, event_id, date, time, location, description, justification, cost
			while(rs.next()) 
				tFormList.add(new TuitionForm(rs.getInt(1), rs.getInt(2), rs.getInt(9), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(8), rs.getDouble(7), rs.getInt(10)));
			return tFormList;
		}
		catch(SQLException e) {}
		return null;
	}
	
	@Override
	public List<TuitionForm> getAllGradedForms(){
		try {
			String SQLStatement = "SELECT * FROM Tuition_Form WHERE grade_id != -1";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			
			List<TuitionForm> tFormList = new ArrayList<TuitionForm>();
			ResultSet rs = ps.executeQuery();
			
			// Add in the following order: form_id, emp_id, event_id, date, time, location, description, justification, cost
			while(rs.next()) 
				tFormList.add(new TuitionForm(rs.getInt(1), rs.getInt(2), rs.getInt(9), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(8), rs.getDouble(7), rs.getInt(10)));
			return tFormList;
		}
		catch(SQLException e) {}
		return null;
	}
	
	@Override
	public Employee getEmployeeFromForm(int formId) {
		try {
			String SQLStatement = "SELECT * FROM Employee WHERE emp_id IN (SELECT emp_id FROM Tuition_Form WHERE form_id = ?)";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			
			ps.setInt(1, formId);
			
			ResultSet rs = ps.executeQuery();
			if(rs.next())
				return new Employee(rs.getInt(1), rs.getInt(7), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getDouble(6));
		}
		catch(SQLException e) {}
		return null;
	}
	
	@Override
	public double getCostFromForm(int formId) {
		try {
			String SQLStatement = "SELECT cost FROM Tuition_Form WHERE form_id = ?";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			
			ps.setInt(1, formId);
			
			ResultSet rs = ps.executeQuery();
			if(rs.next())
				return rs.getDouble(7);
		}
		catch(SQLException e) {}
		return -1;
	}
	
	@Override
	public double getCoverageFromForm(int formId) {
		try {
			String SQLStatement = "SELECT coverage FROM EVENTS WHERE event_id in (SELECT event_id FROM Tuition_Form WHERE form_id = '1007');";
			PreparedStatement ps = DBConnection.getConnection().prepareStatement(SQLStatement);
			
			ps.setInt(1, formId);
			
			ResultSet rs = ps.executeQuery();
			if(rs.next())
				return rs.getDouble(3);
		}
		catch(SQLException e) {}
		return -1;
	}
	
	@Override
	public boolean updateGradeOnForm(int formId, int gradeId) {
		try {
			String SQLStatement = "UPDATE Tuition_Form SET grade_id = ? WHERE form_id = ?";
			CallableStatement cs = DBConnection.getConnection().prepareCall(SQLStatement);
			
			cs.setInt(1, gradeId);
			cs.setInt(2, formId);
			
			cs.execute();
			cs.close();
			
			return true;
		}
		catch(SQLException e) {return false;}
	}

	@Override
	public boolean updateTuitionForm(TuitionForm tForm) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deleteTuitionForm(int formId) {
		try {
			String SQLStatement = "DELETE Tuition_Form WHERE form_id = ?";
			CallableStatement cs = DBConnection.getConnection().prepareCall(SQLStatement);
			
			cs.setInt(1, formId);
			
			cs.execute();
			cs.close();
			
			return true;
		}
		catch(SQLException e) { return false; }
	}

}

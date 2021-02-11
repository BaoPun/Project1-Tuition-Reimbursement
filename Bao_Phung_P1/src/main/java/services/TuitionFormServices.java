package services;

import java.util.List;

import data.Employee;
import data.TuitionForm;

public interface TuitionFormServices {
	
	// Create
	boolean addForm(TuitionForm tForm);
	
	// Read/Get
	List<TuitionForm> getAllEmployeeFormsBySupervisor(int id);
	List<TuitionForm> getAllEmployeeFormsForDepartment();
	List<TuitionForm> getAllEmployeeFormsForBenefitsCoordinator();
	List<TuitionForm> getAllCompletedEmployeeForms(int id);
	List<TuitionForm> getAllCompletedForms();
	List<TuitionForm> getAllGradedForms();
	
	
	// Update
	boolean updateGradeOnCompletedForm(int formId, int gradeId);

	
	boolean updateEmployeeBalanceFromApprovedForm(int formId);
	
	
	// Delete
	boolean deleteTuitionForm(int formId);

	
}

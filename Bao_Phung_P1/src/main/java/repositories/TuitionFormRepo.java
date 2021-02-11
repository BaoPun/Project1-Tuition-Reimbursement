package repositories;

import java.util.List;

import data.Employee;
import data.TuitionForm;

public interface TuitionFormRepo {
	// Create
	boolean createTuitionForm(TuitionForm tForm);
	
	// Read/get
	TuitionForm getTuitionFormById(int id);
	List<TuitionForm> getAllTuitionFormsBySupervisorId(int id);
	List<TuitionForm> getAllTuitionFormsForDepartment();
	List<TuitionForm> getAllTuitionFormsForBenefitsCoordinator();
	List<TuitionForm> getAllCompletedEmployeeForms(int id);
	List<TuitionForm> getAllCompletedForms();
	List<TuitionForm> getAllGradedForms();
	Employee getEmployeeFromForm(int formId);
	double getCostFromForm(int formId);
	double getCoverageFromForm(int formId);
	
	// Update
	boolean updateTuitionForm(TuitionForm tForm);
	boolean updateGradeOnForm(int formId, int gradeId);
	
	// Delete
	boolean deleteTuitionForm(int id);

	

	

	

	

	

	
}

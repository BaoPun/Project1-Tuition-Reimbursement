package services;

import java.util.List;

import data.Employee;
import data.TuitionForm;
import repositories.EmployeeRepo;
import repositories.EmployeeRepoImpl;
import repositories.TuitionFormRepo;
import repositories.TuitionFormRepoImpl;

public class TuitionFormServicesImpl implements TuitionFormServices {
	
	private TuitionFormRepo tFormRepo = new TuitionFormRepoImpl();
	private EmployeeRepo er = new EmployeeRepoImpl();

	@Override
	public boolean addForm(TuitionForm tForm) {
		return tFormRepo.createTuitionForm(tForm);
	}
	
	@Override
	public List<TuitionForm> getAllEmployeeFormsBySupervisor(int id){
		return tFormRepo.getAllTuitionFormsBySupervisorId(id);
	}
	
	@Override
	public List<TuitionForm> getAllEmployeeFormsForDepartment(){
		return tFormRepo.getAllTuitionFormsForDepartment();
	}

	@Override
	public List<TuitionForm> getAllEmployeeFormsForBenefitsCoordinator() {
		return tFormRepo.getAllTuitionFormsForBenefitsCoordinator();
	}

	@Override
	public List<TuitionForm> getAllCompletedEmployeeForms(int id) {
		return tFormRepo.getAllCompletedEmployeeForms(id);
	}

	@Override
	public List<TuitionForm> getAllCompletedForms() {
		return tFormRepo.getAllCompletedForms();
	}
	
	
	@Override
	public List<TuitionForm> getAllGradedForms(){
		return tFormRepo.getAllGradedForms();
	}
	
	@Override
	public boolean updateGradeOnCompletedForm(int formId, int gradeId) {
		return tFormRepo.updateGradeOnForm(formId, gradeId);
	}
	
	@Override
	public boolean updateEmployeeBalanceFromApprovedForm(int formId) {
		// First, retrieve the employee
		Employee employee = tFormRepo.getEmployeeFromForm(formId);
		
		// Second, update the employee with the new balance
		employee.setBalance(employee.getBalance() + (tFormRepo.getCostFromForm(formId) * tFormRepo.getCoverageFromForm(formId)));
		
		// Third, update the employee to the database
		er.updateEmployeeBalance(employee);
		
		// Fourth, delete!
		deleteTuitionForm(formId);
		
		
		return true;
	}
	
	@Override
	public boolean deleteTuitionForm(int formId) {
		return tFormRepo.deleteTuitionForm(formId);
	}

}

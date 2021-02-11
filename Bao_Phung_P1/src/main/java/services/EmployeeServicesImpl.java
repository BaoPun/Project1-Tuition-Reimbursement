package services;

import java.util.List;

import data.Employee;
import repositories.EmployeeRepo;
import repositories.EmployeeRepoImpl;

public class EmployeeServicesImpl implements EmployeeServices {
	
	private EmployeeRepo empRepo = new EmployeeRepoImpl();
	
	@Override
	public boolean createNewEmployee(String firstName, String lastName, String email, String password, String superEmail) {
		int sid = empRepo.getSupervisorByEmail(superEmail).getEmpId();
		return empRepo.createEmployee(new Employee(sid, firstName, lastName, email, password, 0));
	}
	
	@Override
	public Employee loginEmployee(String email, String password) {
		return empRepo.getEmployeeByLoginInfo(email, password);
	}
	
	@Override
	public Employee getEmployeeByEmail(String email) {
		return empRepo.getEmployeeByEmail(email);
	}
	
	@Override
	public Employee loginSupervisor(String email, String password) {
		return empRepo.getSupervisorByLoginInfo(email, password);
	}

	@Override
	public Employee loginBenefitsCoordinator(String email, String password) {
		return empRepo.getBenefitsCoordinatorByLoginInfo(email, password);
	}

}

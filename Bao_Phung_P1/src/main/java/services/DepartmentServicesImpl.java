package services;

import data.Department;
import repositories.DepartmentRepo;
import repositories.DepartmentRepoImpl;

public class DepartmentServicesImpl implements DepartmentServices {

	private DepartmentRepo dr = new DepartmentRepoImpl();
	
	@Override
	public Department loginDepartment(String email, String password) {
		return dr.getDepartmentByLoginInfo(email, password);
	}
}

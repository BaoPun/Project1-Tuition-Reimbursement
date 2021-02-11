package data;

import java.util.ArrayList;
import java.util.List;

/**
 * A department contains a unique department id and a name. <br>
 * In addition, it contains 1 employee that manages the department
 * @author baoph
 *
 */
public class Department {
	private int deptId;
	private String type;
	private Employee headEmployee;
	// private List<Employee> employeeList;
	
	public Department() {
		this.deptId = -1;
		this.type = "";
		this.headEmployee = new Employee();
	}	

	public Department(int deptId, String type) {
		this.deptId = deptId;
		this.type = type;
		this.headEmployee = new Employee();
	}
	
	public Department(int deptId, String type, Employee headEmployee) {
		this.deptId = deptId;
		this.type = type;
		this.headEmployee = headEmployee;
	}
	
	/**
	 * @return the department id
	 */
	public int getDeptId() {
		return this.deptId;
	}

	/**
	 * @param deptId the department id to set
	 */
	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}
	/**
	 * @return the type
	 */
	public String getType() {
		return this.type;
	}

	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}
	
	/**
	 * @return headEmployee the head of the department
	 */
	public Employee getHeadEmployee() {
		return this.headEmployee;
	}
	
	/**
	 * @param headEmployee the head employee to set
	 */
	public void setHeadEmployee(Employee headEmployee) {
		this.headEmployee = headEmployee;
	}

	@Override
	public String toString() {
		return "{\'deptId\': " + deptId + ", \'type\': \'" + type + "\', \'headEmployee\': " + headEmployee + "}";
	}
	
	
	
}

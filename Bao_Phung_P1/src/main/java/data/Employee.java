package data;

import java.util.ArrayList;
import java.util.List;

/**
 * This Employee class is a bean.
 * @author baoph
 *
 */
public class Employee {
	// Private fields/variables
	private int empId, supervisorId;
	private String firstName, lastName, email, password;
	private double balance;
	
	/**
	 * Default constructor of Employee bean
	 */
	public Employee() {
		this.empId = -1;
		this.supervisorId = -1;
		this.firstName = "";
		this.lastName = "";
		this.email = "";
		this.password = "";
		this.balance = 1000;
	}
	
	
	public Employee(int supervisorId, String firstName, String lastName, String email, String password, double balance) {
		this.empId = -1;
		this.supervisorId = supervisorId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.balance = balance;
	}
	
	public Employee(int empId, int supervisorId, String firstName, String lastName, String email, String password, double balance) {
		this.empId = empId;
		this.supervisorId = supervisorId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.balance = balance;
	}
	
	


	/**
	 * Simply return the 
	 * @return the empId
	 */
	public int getEmpId() {
		return empId;
	}

	/**
	 * @param empId the empId to set
	 */
	public void setEmpId(int empId) {
		this.empId = empId;
	}

	/**
	 * @return the supervisorId
	 */
	public int getSupervisorId() {
		return supervisorId;
	}

	/**
	 * @param supervisorId the supervisorId to set
	 */
	public void setSupervisorId(int supervisorId) {
		this.supervisorId = supervisorId;
	}

	/**
	 * Change the 
	 * @return the firstName
	 */
	public String getFirstName() {
		return firstName;
	}

	/**
	 * @param firstName the firstName to set
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * @return the lastName
	 */
	public String getLastName() {
		return lastName;
	}

	/**
	 * @param lastName the lastName to set
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the balance
	 */
	public double getBalance() {
		return balance;
	}

	/**
	 * @param balance the balance to set
	 */
	public void setBalance(double balance) {
		this.balance = balance;
	}
	
	
	/**
	 * If the Employee is a supervisor, then the provided supervisor id field will be -1. <br>
	 * Otherwise, the Employee reports directly to their supervisor. 
	 * @return Boolean: True if the Employee's supervisor field is -1, False otherwise.
	 */
	public boolean isSupervisor() {
		return this.supervisorId == -1;
	}
	
	

	/**
	 * Return a JSON string representation of this current Employee.
	 * @return the JSON string presentation of this Employee
	 */
	@Override
	public String toString() {
		return "{\'empId\': " + empId + ", \'supervisorId\': " + supervisorId + 
				", \'firstName\': \'" + firstName + "\', \'lastName\': \'" + lastName + 
				"\', \'email\': \'" + email + "\', \'balance\': " + balance + "}";
	}
}

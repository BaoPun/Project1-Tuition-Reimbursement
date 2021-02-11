package controllers;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

import data.Department;
import data.Employee;
import data.TuitionForm;
import services.ApprovalServices;
import services.ApprovalServicesImpl;
import services.DepartmentServices;
import services.DepartmentServicesImpl;
import services.EmployeeServices;
import services.EmployeeServicesImpl;
import services.TuitionFormServices;
import services.TuitionFormServicesImpl;

public class AppController {

	/*
	 * Read any necessary information from the request
	 * Call the appropriate service(s)
	 * Prepare our data to be added to the response
	 * and add said data into the Response body
	 * 
	 * Process requests and generate responses
	 */
	
	// Call various Services here
	private static Gson gson = new Gson();
	private static EmployeeServices es = new EmployeeServicesImpl();
	private static TuitionFormServices tfs = new TuitionFormServicesImpl();
	private static DepartmentServices ds = new DepartmentServicesImpl();
	private static ApprovalServices as = new ApprovalServicesImpl();
	
	public static void createEmployee(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		try {
			
			// Retrieve information from JS
			String firstName = request.getParameter("fname");
			String lastName = request.getParameter("lname");
			String email = request.getParameter("email");
			String password = request.getParameter("password");
			String sEmail = request.getParameter("semail");
			
			// Create a new employee from this information
			if(!es.createNewEmployee(firstName, lastName, email, password, sEmail)) 
				response.getWriter().println("Error, the requested email address is already in use.  Please try again.");
			else
				response.getWriter().println("Success, you have created a new account.  Now try logging in.");
			
		}
		catch(Exception e) {
			System.out.println("Something went wrong with creating a new employee onto the database");
			
			return;
		}
	}
	
	public static void loginEmployee(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		Employee emp = es.loginEmployee(email, password);
		response.getWriter().println((emp != null ? gson.toJson(emp) : "{}"));
	}
	
	public static void createTuitionEmployee(HttpServletRequest request, HttpServletResponse response) throws JsonSyntaxException, JsonIOException, IOException {
		
		// GSON will convert a JSON passed into the request body into an Object
		TuitionForm tForm = gson.fromJson(request.getReader(), TuitionForm.class);
		
		// From here, add the form to the database
		if(!tfs.addForm(tForm))
			response.getWriter().println("ERROR!");
		else
			response.getWriter().println("SUCCESS!");	
	}
	
	// Login as a Supervisor
	public static void loginSupervisor(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		Employee emp = es.loginSupervisor(email, password);
		response.getWriter().println((emp != null ? gson.toJson(emp) : "{}"));
	}
	
	// Login as a Department Head
	public static void loginDepartment(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		Department dept = ds.loginDepartment(email, password);
		response.getWriter().println((dept != null ? gson.toJson(dept) : "{}"));
		
	}

	// As a supervisor, retrieve all of your employee's submitted forms
	public static void retrieveSupervisedEmployeeForms(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		// First, retrieve the supervisor's id from the link
		int id = Integer.parseInt(request.getParameter("id"));
		
		// Retrieve a list of employees who have filled out their tuition form successfully that belong to a specific supervisor!
		List<TuitionForm> tFormList = tfs.getAllEmployeeFormsBySupervisor(id);
		
		// And then send the list back to the front end :)
		response.getWriter().println(gson.toJson(tFormList));
	}

	// As a department head, retrieve all submitted forms that are already pre-approved by the supervisor
	public static void retrieveEmployeeFormsForDepartmentHeads(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		List<TuitionForm> tFormList = tfs.getAllEmployeeFormsForDepartment();
		response.getWriter().println(gson.toJson(tFormList));
		
	}

	// Update the Approval response as a Supervisor
	public static void submitSupervisorApprovalResponse(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		// First, retrieve all 3 arguments: empId, formId, response of the Supervisor.  Note that the latter 2 are required, former is a specific situation
		int empId = Integer.parseInt(request.getParameter("empId"));		// If the supervisor is also a department head, then this will be used.
		int formId = Integer.parseInt(request.getParameter("formId"));
		String approval = request.getParameter("approval");
		
		// Then, call a method to update the approval status
		if(as.updateSupervisorApprovalResponse(empId, formId, approval))
			response.getWriter().println("SUCCESS");
		else
			response.getWriter().println("ERROR");
		
	}

	// Update the Approval response as a Department head
	public static void submitDepartmentApprovalResponse(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		// First, retrieve all 2 arguments: formId and approval response of the Department head.  Note that, unlike supervisor method, this doesn't require the employee id.
		int formId = Integer.parseInt(request.getParameter("formId"));
		String approval = request.getParameter("approval");
		
		// Then, call a method to update the approval status
		if(as.updateDepartmentApprovalResponse(formId, approval))
			response.getWriter().println("SUCCESS");
		else
			response.getWriter().println("ERROR");
	}

	public static void loginBenefitsCoordinator(HttpServletRequest request, HttpServletResponse response) throws IOException {
	
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		Employee emp = es.loginBenefitsCoordinator(email, password);
		response.getWriter().println((emp != null ? gson.toJson(emp) : "{}"));
	}

	public static void retrieveEmployeeFormsForBenefitsCoordinator(HttpServletRequest request, HttpServletResponse response) throws IOException {
		List<TuitionForm> tFormList = tfs.getAllEmployeeFormsForBenefitsCoordinator();
		response.getWriter().println(gson.toJson(tFormList));
		
	}

	public static void submitBenefitsApprovalResponse(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		// First, retrieve all 2 arguments: formId and approval response of the benefits coordinator.  
		// Note that, unlike supervisor method, this doesn't require the employee id.
		int formId = Integer.parseInt(request.getParameter("formId"));
		String approval = request.getParameter("approval");
		System.out.println(formId);
		
		// Then, call a method to update the approval status
		if(as.updateBenefitsApprovalResponse(formId, approval))
			response.getWriter().println("SUCCESS");
		else
			response.getWriter().println("ERROR");
	}

	public static void retrieveAllEmployeeApprovedForms(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		// First, retrieve the id of the employee
		int empId = Integer.parseInt(request.getParameter("empId"));
		
		// Then, call the query
		List<TuitionForm> tFormList = tfs.getAllCompletedEmployeeForms(empId);
		response.getWriter().println(gson.toJson(tFormList));
	}

	public static void retrieveAllApprovedForms(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// Then, call the query
		List<TuitionForm> tFormList = tfs.getAllCompletedForms();
		response.getWriter().println(gson.toJson(tFormList));
	}

	public static void updateGrade(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		// Retrieve the 2 arguments
		int formId = Integer.parseInt(request.getParameter("formId"));
		int gradeId = Integer.parseInt(request.getParameter("gradeId"));
		
		if(tfs.updateGradeOnCompletedForm(formId, gradeId))
			response.getWriter().println("SUCCESS");
		else
			response.getWriter().println("ERROR");
		
	}

	public static void retrieveAllGradedForms(HttpServletRequest request, HttpServletResponse response) throws IOException{
		// Get all graded forms
		List<TuitionForm> tFormList = tfs.getAllGradedForms();
		response.getWriter().println(gson.toJson(tFormList));
	}

	public static void deleteDeniedForm(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		// Retrieve the form id to delete
		int formId = Integer.parseInt(request.getParameter("formId"));
		
		// Delete the tuition form
		if(tfs.deleteTuitionForm(formId))
			response.getWriter().println("SUCCESS");
		else
			response.getWriter().println("ERROR");
	}

	public static void deletedApprovedForm(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		// Retrieve the form id to delete
		int formId = Integer.parseInt(request.getParameter("formId"));
		
		// Update and then delete the tuition form
		if(tfs.updateEmployeeBalanceFromApprovedForm(formId))
			response.getWriter().println("SUCCESS");
		else
			response.getWriter().println("ERROR");
			
	}
}

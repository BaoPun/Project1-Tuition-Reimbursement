package servlets;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import controllers.AppController;

// This class handles all http requests
public class RequestHelper {
	
	/**
	 * This method will delegate other methods on the controller layer of our application to process the request.
	 * @param request : the HTTP request
	 * @param response : the HTTP response
	 * @throws IOException 
	 * @throws ServletException 
	 */
	public static void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		
		// Retrieve the uri
		String uri = request.getRequestURI();
		System.out.println("URI found: " + uri);
		
		switch(uri) {
			case "/Bao_Phung_P1/home.do":
			case "/Bao_Phung_P1/*.do": {
				response.sendRedirect("/Bao_Phung_P1/home.html");
				break;
			}
			case "/Bao_Phung_P1/createEmployee.do": {
				AppController.createEmployee(request, response);
				break;
			}
			case "/Bao_Phung_P1/loginEmployee.do": {
				AppController.loginEmployee(request, response);
				break;
			}
			case "/Bao_Phung_P1/createTuitionForm.do":{
				AppController.createTuitionEmployee(request, response);
				break;
			}
			case "/Bao_Phung_P1/loginSupervisor.do": {
				AppController.loginSupervisor(request, response);
				break;
			}
			case "/Bao_Phung_P1/getAllSupervisedEmployeeForms.do": {
				AppController.retrieveSupervisedEmployeeForms(request, response);
				break;
			}
			case "/Bao_Phung_P1/loginDepartment.do": {
				AppController.loginDepartment(request, response);
				break;
			}
			case "/Bao_Phung_P1/getAllEmployeeFormsDepartments.do": {
				AppController.retrieveEmployeeFormsForDepartmentHeads(request, response);
				break;
			}
			case "/Bao_Phung_P1/submitSupApprovalResponse.do": {
				AppController.submitSupervisorApprovalResponse(request, response);
				break;
			}
			case "/Bao_Phung_P1/submitDeptApprovalResponse.do": {
				AppController.submitDepartmentApprovalResponse(request, response);
				break;
			}
			case "/Bao_Phung_P1/loginBenefitsCoordinator.do": {
				AppController.loginBenefitsCoordinator(request, response);
				break;
			}
			case "/Bao_Phung_P1/getAllEmployeeFormsBenefits.do": {
				AppController.retrieveEmployeeFormsForBenefitsCoordinator(request, response);
				break;
			}
			case "/Bao_Phung_P1/submitBenefitsApprovalResponse.do": {
				AppController.submitBenefitsApprovalResponse(request, response);
				break;
			}
			case "/Bao_Phung_P1/retrieveAllEmployeeCompleteForms.do": {
				AppController.retrieveAllEmployeeApprovedForms(request, response);
				break;
			}
			case "/Bao_Phung_P1/retrieveAllCompleteForms.do": {
				AppController.retrieveAllApprovedForms(request, response);
				break;
			}
			case "/Bao_Phung_P1/updateGradeOnCompletedForm.do": {
				AppController.updateGrade(request, response);
				break;
			}
			case "/Bao_Phung_P1/retrieveAllGradedForms.do": {
				AppController.retrieveAllGradedForms(request, response);
				break;
			}
			case "/Bao_Phung_P1/denyGradedForm.do": {
				AppController.deleteDeniedForm(request, response);
				break;
			}
			case "/Bao_Phung_P1/approveGradedForm.do": {
				AppController.deletedApprovedForm(request, response);
				break;
			}
			
			default: {
				response.sendError(418, "Default case, project went wrong PepeHands");
				break;
			}
		}
	}
}

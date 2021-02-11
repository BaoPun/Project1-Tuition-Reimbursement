package services;

public interface ApprovalServices {
	
	boolean updateSupervisorApprovalResponse(int empId, int formId, String approval);
	boolean updateDepartmentApprovalResponse(int formId, String approval);
	boolean updateBenefitsApprovalResponse(int formId, String approval);
}

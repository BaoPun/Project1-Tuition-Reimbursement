package repositories;

public interface ApprovalRepo {

	// All this should do is update the approvals for both Supervisor and Department Heads
	boolean updateSupervisorApprovalResponse(int empId, int formId, String approval);
	boolean updateDepartmentApprovalResponse(int formId, String approval);
	boolean updateBenefitCoApprovalResponse(int formId, String approval);
}

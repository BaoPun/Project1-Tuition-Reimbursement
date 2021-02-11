package services;

import repositories.ApprovalRepo;
import repositories.ApprovalRepoImpl;

public class ApprovalServicesImpl implements ApprovalServices {

	private ApprovalRepo ar = new ApprovalRepoImpl();
	
	@Override
	public boolean updateSupervisorApprovalResponse(int empId, int formId, String approval) {
		return ar.updateSupervisorApprovalResponse(empId, formId, approval);
	}

	@Override
	public boolean updateDepartmentApprovalResponse(int formId, String approval) {
		return ar.updateDepartmentApprovalResponse(formId, approval);
	}
	
	@Override
	public boolean updateBenefitsApprovalResponse(int formId, String approval) {
		return ar.updateBenefitCoApprovalResponse(formId, approval);
	}

}

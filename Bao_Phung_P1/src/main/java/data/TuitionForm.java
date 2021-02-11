package data;

public class TuitionForm {
	private int formId, empId, eventId;
	private String eventDate, eventTime, location, description, justification;
	private double cost;
	private int gradeId;
	
	public TuitionForm() {
		this.formId = -1;
		this.empId = -1;
		this.eventId = -1;
		this.eventDate = "";
		this.eventTime = "";
		this.location = "";
		this.description = "";
		this.justification = "";
		this.cost = 0;
		this.gradeId = -1;
	}
	
	
	public TuitionForm(int formId, int empId, int eventId, String eventDate, String eventTime, String location, String description, String justification, double cost, int gradeId) {
		this.formId = formId;
		this.empId = empId;
		this.eventId = eventId;
		this.eventDate = eventDate;
		this.eventTime = eventTime;
		this.location = location;
		this.description = description;
		this.justification = justification;
		this.cost = cost;
		this.gradeId = gradeId;
	}



	/**
	 * @return the formId
	 */
	public int getFormId() {
		return formId;
	}

	/**
	 * @param formId the formId to set
	 */
	public void setFormId(int formId) {
		this.formId = formId;
	}
	
	/**
	 * @return the empId
	 */
	public int getEmpId() {
		return this.empId;
	}
	
	/**
	 * @param empId the empId to set
	 */
	public void setEmpId(int empId) {
		this.empId = empId;
	}

	/**
	 * @return the eventDate
	 */
	public String getEventDate() {
		return eventDate;
	}

	/**
	 * @param eventDate the eventDate to set
	 */
	public void setEventDate(String eventDate) {
		this.eventDate = eventDate;
	}

	/**
	 * @return the eventTime
	 */
	public String getEventTime() {
		return eventTime;
	}

	/**
	 * @param eventTime the eventTime to set
	 */
	public void setEventTime(String eventTime) {
		this.eventTime = eventTime;
	}

	/**
	 * @return the location
	 */
	public String getLocation() {
		return location;
	}

	/**
	 * @param location the location to set
	 */
	public void setLocation(String location) {
		this.location = location;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the justification
	 */
	public String getJustification() {
		return justification;
	}

	/**
	 * @param justification the justification to set
	 */
	public void setJustification(String justification) {
		this.justification = justification;
	}

	/**
	 * @return the cost
	 */
	public double getCost() {
		return cost;
	}

	/**
	 * @param cost the cost to set
	 */
	public void setCost(double cost) {
		this.cost = cost;
	}

	/**
	 * @return the eventId
	 */
	public int getEventId() {
		return eventId;
	}

	/**
	 * @param eventId the eventId to set
	 */
	public void setEventId(int eventId) {
		this.eventId = eventId;
	}
	
	/**
	 * @return the gradeId
	 */
	public int getGradeId() {
		return gradeId;
	}

	/**
	 * @param gradeId the gradeId to set
	 */
	public void setGradeId(int gradeId) {
		this.gradeId = gradeId;
	}


	@Override
	public String toString() {
		return "{\'formId\': " + this.formId + ", \'empId\': " + this.empId + ", \'eventId\': " + this.eventId +  ", \'gradeId\': " + this.gradeId + 
				", \'eventDate\': \'" + this.eventDate + "\', \'eventTime\': " + this.eventTime + "\', \'location\': " + this.location + 
				"\', \'description\': " + this.description + "\', \'justification\': " + this.justification + "\', \'cost\': " + this.cost + "}";
	}
	
	
	
	
	
}

package steps;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;

import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import pages.ProjectPage;
import runners.TestRunner;

public class ProjectLoginStepImpl {
	public static ProjectPage projectMain = TestRunner.projectMain;
	public static WebDriver driver = TestRunner.driver;
	
	@Given("^The User is on the Home Page$")
	public void the_User_is_on_the_home_page() {
	    driver.get("http://localhost:8080/Bao_Phung_P1/home.html");
	    
	}
	
	@When("^The User Email is \"([^\"]*)\" And The User Password is \"([^\"]*)\" and the User Presses Enter$")
	public void the_user_email_is_and_the_user_password_is_and_the_user_presses_enter(String arg1, String arg2) {
		projectMain.emailBox.sendKeys(arg1 + Keys.TAB);
		projectMain.passwordBox.sendKeys(arg2);
		projectMain.submitBox.click();
	}
	
	@Then("^The User Should Be Successfuly Logged In$")
	public void the_user_should_be_successfully_logged_in() {
		
	}
}
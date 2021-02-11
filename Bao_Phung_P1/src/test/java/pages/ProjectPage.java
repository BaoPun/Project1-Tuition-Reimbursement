package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class ProjectPage {

	public WebDriver driver;
	
	@FindBy(css = "div[id=employee-login]")
	public WebElement employeeLogin;
	
	@FindBy (xpath = "//*[@id=\"employee-login\"]/div[1]/input[1]")
	public WebElement emailBox;
	
	@FindBy (xpath = "//*[@id=\"employee-login\"]/div[1]/input[2]")
	public WebElement passwordBox;
	
	// Alternatively, xpath = "/html/body/div[1]/input[4]"
	@FindBy (xpath = "//*[@id=\"employee-login\"]/div[1]/input[4]")
	public WebElement submitBox;
	
	
	public ProjectPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}
}

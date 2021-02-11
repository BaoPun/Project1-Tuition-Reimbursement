package runners;

import java.io.File;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import pages.ProjectPage;

@RunWith(Cucumber.class)
@CucumberOptions(features = "src/test/resources", glue = "steps")
public class TestRunner {

	public static WebDriver driver;
	public static ProjectPage projectMain;
	
	@BeforeClass
	public static void setup() {
		File file = new File("src/test/resources/chromedriver.exe");
		System.setProperty("webdriver.chrome.driver", file.getAbsolutePath());
		driver = new ChromeDriver();
		projectMain = new ProjectPage(driver);
	}
	
	@AfterClass
	public static void complete() {
		driver.quit();
	}
}

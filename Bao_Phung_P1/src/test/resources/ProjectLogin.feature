Feature: Log In Using A Sample Account.

# One scenario only
	Background:
		Given The User is on the Home Page
		
	Scenario Outline: The User Attempts to Log In
		When The User Email is "<email>" And The User Password is "<password>" and the User Presses Enter
		Then The User Should Be Successfuly Logged In
		
	Examples:
		| cucumber@revature.net | revaturepassword  |

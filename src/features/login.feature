Feature: Example Login
  As a user
  I want to be able to access the login page
  So that I can enter my credentials

  Scenario: Navigate to Google
    Given I navigate to "https://www.google.com"
    Then the page title should contain "Google"

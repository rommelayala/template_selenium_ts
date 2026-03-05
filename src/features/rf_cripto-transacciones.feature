@rf_cripto @transacciones
Feature: Rommel Fiscal Cripto Transacciones
  As a user
  I want to be sure each time access to transacciones the page have same elements and the behave does not change

  Background: Home de Rommel Fiscal Cripto
    Given I am on the home page

  Scenario: Navigate to transactions page
    And I navigate to the transactions page
    Then the page title should contain "RF_Cripto"
    Then the property "data-testid" of the element "${transactiones.h2.text}" should be equal to "transactions-title"
    And wait for 3 seconds


  Scenario: Buscar SNX en la tabla de transacciones


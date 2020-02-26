/* Selector function is used for selecting DOM elements */
import { Selector } from "testcafe";

/*  
    Fixture - a group of tests 
    page - Every test in fixture will navigate to specified page before executing test
*/
fixture`Login Page`
  .page("https://www.saucedemo.com/");

/*
    First test - test for successful login with correct username and password
    Steps:
    1. Navigate to login page - taken care of with .page("https://www.saucedemo.com/")
    2. Type in valid username (standard_user)
    3. Type in valid password (secret_sauce)
    4. Expected result: inventory is visible
*/
test("Login with correct username and password", async t => {
  await t
    .typeText(Selector("#user-name"), "standard_user")    // .typeText(target input(Selector), text to type(String))
    .typeText(Selector("#password"), "secret_sauce")
    .click(Selector("[value='LOGIN']"))                   // .click(target element(Selector))
    .expect(Selector("#inventory_container").visible).ok("inventory page should appear"); // assertion
});

/*
    Second test - test for unsuccessful login with incorrect password
    Steps:
    1. Navigate to login page - taken care of with .page("https://www.saucedemo.com/")
    2. Type in valid username (standard_user)
    3. Type in valid password (incorrect_password)
    4. Expected result: error displays correct text
*/
test("Login with incorrect password", async t => {
  await t
    .typeText(Selector("#user-name"), "standard_user")
    .typeText(Selector("#password"), "incorrect_password")
    .click(Selector("[value='LOGIN']"))
    .expect(Selector("[data-test='error']").innerText).contains("Username and password do not match any user in this service")
});

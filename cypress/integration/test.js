/// <reference types="cypress"/>

let username = "standard_user";
let password = "secret_sauce";

let expectedPrice;

describe("Main Scenario test", () => {
  it("Should return same price after by process", () => {
    // login
    cy.visit("https://www.saucedemo.com/");
    cy.get("#user-name").click().type(username);
    cy.get("#password").click().type(password);
    cy.get("[data-test=login-button]").click();

    cy.get(
      ":nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price"
    )
      .invoke("text")
      .then((text) => {
        expectedPrice = text;
      });

    //buy backpack
    cy.get("[data-test=add-to-cart-sauce-labs-backpack]").click();
    cy.get(".shopping_cart_link").click();

    cy.get(".inventory_item_price")
      .invoke("text")
      .then((text) => {
        expect(expectedPrice).to.equal(text);
      });

    // checkout
    cy.get("[data-test=checkout]").click();
    cy.get("[data-test=firstName]").click().type("First");
    cy.get("[data-test=lastName]").click().type("Last");
    cy.get("[data-test=postalCode]").click().type("10000");
    cy.get("[data-test=continue]").click();
    cy.get("[data-test=finish]").click();
  });
});

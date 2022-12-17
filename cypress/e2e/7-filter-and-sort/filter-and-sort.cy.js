import mainPage from "../../page/mainPage";
import loginPage from "../../page/loginPage";



describe("Verify that a user is able to ", () => {
  beforeEach(() => {
    cy.visit("/");
    loginPage.elements.signInBtn().click();
    loginPage.login("duran@user.com", "NewPassword!23");
  });
  it("sort products by price ascending order (low to high)", () => {
    mainPage.elements.sortOptions().select("lowToHigh").invoke("val");
    cy.wait(1000);
    mainPage.getProductList('p.css-0').then((price) => {
      expect(price).to.be.sorted();
    });
  });
  it("select the shirts category", () => {
    mainPage.elements.categoryOptions().select("shirt").invoke("val");
    cy.wait(1000);
    cy.get(".css-1ccau2i").should((products) => {
      products.each((i, product) => {
        expect(product.innerText).to.include("shirt");
      });
    });
  });
  it("clear a filter using the reset button", () => {
    mainPage.elements.categoryOptions().select("shirt").invoke("val");
    cy.wait(1000);
    cy.get(".css-1ccau2i").should((products) => {
      products.each((i, product) => {
        expect(product.innerText).to.include("shirt");
      });
    });
    mainPage.elements.resetBtn().click();
    mainPage.elements.allProductCategories().should("have.length", 22);
  });
});

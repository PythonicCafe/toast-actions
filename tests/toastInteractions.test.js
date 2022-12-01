describe("Simple select interactions", () => {
  test("Toast is being showed after page is loaded with correct title", async () => {
    await page.waitForSelector(".t-header__main");

    // Check if toast is bewing showed by getting toast title
    const results = await page.evaluate(
      () => document.querySelector('.t-header__main').innerText
    );

    // Check title
    expect(results).toBe("Error #1!");
  });

  test("Toast is being showed with correct text", async () => {
    await page.waitForSelector(".t-message");

    // Check if toast is bewing showed by getting toast title
    const results = await page.evaluate(
      () => document.querySelector('.t-message').innerText
    );

    // Check title
    expect(results).toBe("Here goes the error text.");
  });

  test("Close Toast", async () => {
    await page.waitForSelector(".t-close");
    await page.click(".t-close");
    // Wait until animation end and check if element is removed from DOM
    await page.waitForFunction(() => document.querySelector(".toast-container") === null);
  }, 6000);
});

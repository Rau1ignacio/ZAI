import { expect, test } from "@playwright/test";

test.describe("Phase 4 smoke", () => {
  test("public shell renders topbar and footer", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: /empieza gratis/i }).first()).toBeVisible();
    await expect(page.getByText(/inteligencia financiera/i).first()).toBeVisible();
    await expect(page.getByText(/todos los derechos reservados/i)).toBeVisible();
  });

  test("app dashboard renders topbar and collapsible sidebar", async ({ page }) => {
    await page.goto("/app/dashboard");

    await expect(page.getByRole("heading", { name: /control total/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /colapsar sidebar/i })).toBeVisible();

    await page.getByRole("button", { name: /colapsar sidebar/i }).click();
    await expect(page.getByRole("button", { name: /expandir sidebar/i })).toBeVisible();
  });

  test("admin dashboard renders topbar and admin sidebar", async ({ page }) => {
    await page.goto("/admin/dashboard");

    await expect(page.getByRole("heading", { name: /centro de control operativo/i })).toBeVisible();
    await expect(page.getByText(/backoffice/i).first()).toBeVisible();
    await expect(page.getByRole("button", { name: /notificaciones admin/i })).toBeVisible();
  });
});

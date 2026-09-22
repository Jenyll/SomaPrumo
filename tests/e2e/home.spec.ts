import { test, expect } from '@playwright/test'

const widths = [375, 390, 430, 768, 1024, 1280, 1440, 1920]

for (const width of widths) {
  test(`landing, links and images at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Operações\s*com clareza\./)
    await expect(page.locator('body')).not.toContainText(/engenharia|construção|\bobras?\b/i)

    await expect(page.getByRole('link', { name: 'Conheça as soluções' })).toBeVisible()
    await page.getByRole('link', { name: 'Conheça as soluções' }).click()
    await expect(page).toHaveURL(/#solucoes$/)
    await expect(page.locator('#solucoes')).toBeInViewport()

    await page.getByRole('tab', { name: 'MEI' }).click()
    await expect(page.locator('#mei')).toBeVisible()
    await expect(page.locator('#mei')).toContainText('Regularizar meu MEI')

    for (const id of ['o-que-voce-precisa', 'solucoes', 'automacao', 'processo', 'auditoria', 'tecnologia', 'equipe', 'contato']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    }

    await expect.poll(() => page.locator('img').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true)
    await expect(page.locator('#contato')).toContainText('loreimpus')
    expect(await page.locator('a[href^="#"]').evaluateAll(links => links.every(link => document.querySelector(link.getAttribute('href')!)))).toBe(true)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: true, animations: 'disabled' })
    await page.screenshot({ path: testInfo.outputPath(`hero-${width}.png`), animations: 'disabled' })
    expect(errors).toEqual([])
  })
}

test('mobile menu supports keyboard, Escape and destination navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const toggle = page.getByRole('button', { name: 'Menu' })
  const nav = page.getByRole('navigation', { name: 'Navegação principal' })
  await expect(nav).toBeHidden()
  await toggle.focus()
  await page.keyboard.press('Enter')
  await expect(nav).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(nav.getByRole('link', { name: 'Soluções', exact: true })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(nav).toBeHidden()
  await expect(toggle).toBeFocused()
  await toggle.click()
  await nav.getByRole('link', { name: 'Auditoria' }).click()
  await expect(page).toHaveURL(/#auditoria$/)
  await expect(nav).toBeHidden()
  await page.locator('#auditoria').getByRole('button', { name: 'Fale com um especialista' }).click()
})

test('reduced motion, skip link and team carousel are keyboard accessible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 375, height: 844 })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
  await page.locator('#equipe').scrollIntoViewIfNeeded()
  const previous = page.getByRole('button', { name: 'Perfil anterior' })
  const next = page.getByRole('button', { name: 'Próximo perfil' })
  await expect(previous).toBeDisabled()
  await expect(next).toBeEnabled()
  await next.focus()
  await page.keyboard.press('Enter')
  await expect.poll(() => page.locator('#team-track').evaluate(track => track.scrollLeft)).toBeGreaterThan(200)
  await expect(previous).toBeEnabled()
  await next.click()
  await expect(next).toBeDisabled()
  await previous.click()
  await expect(next).toBeEnabled()
})

import { test, expect } from '@playwright/test'
import common_methods from '../Helper methods/helperbase.spec';
import HelperBase from '../Helper methods/helperbase.spec';

let helper;


test.describe('Log in using all roles', () => {
   test('Login using Employee role', async ({ page }) => {
      helper = new HelperBase(page);

      await helper.loginAsEmployee();

   })


   test('Login using HR role', async ({ page }) => {
      helper = new HelperBase(page);

      await helper.loginAsHR();
   })

   test('Login using Manager role', async ({ page }) => {
      helper = new HelperBase(page);

      await helper.loginAsManager();

   })
  
})

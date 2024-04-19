import {test, expect} from '@playwright/test'
import common_methods from '../Helper methods/helperbase.spec';
import HelperBase from '../Helper methods/helperbase.spec';

let helper;

test.describe('Logout functionality', () => {
    test('Logout from the application', async ({ page }) => {
    helper = new HelperBase(page);
    await helper.loginAsEmployee();
    await helper.logout();
    console.log("User is logged out");
    })
    
})

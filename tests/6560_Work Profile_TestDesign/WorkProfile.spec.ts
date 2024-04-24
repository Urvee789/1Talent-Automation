import { test, expect } from '@playwright/test'
import HelperBase from '../Helper methods/helperbase.spec';
import CommonLocators from '../common_locators.spec';
import exp from 'constants';

let helper;
let abtMeText;
let cm_loc;

var exec = require('child_process').execFile;
var upload_script = function(){
   exec('upload.exe', function(err, data) {  
        console.log(err);                 
    });  
}

test.describe('6560_Work Profile_TestDesign', () => {

    test('TS_PR_14 - Validate Add new functionality with valid data in Past Experience section.', async ({ page }) => {
        helper = new HelperBase(page);
        cm_loc = new CommonLocators(page);
        await helper.navigate();
        await helper.loginAsEmployee();

        //------test case steps------

        //click on user profile and navigate to My Profile page
        await helper.userProfile.click();
        await cm_loc.myProfileBtn.click();

        //click on Professional Background tab
        await page.waitForTimeout(2000);
        await page.locator('xpath=//div[contains(text(),"Professional Background")]').click();

        //scroll page
        page.keyboard.press('PageDown');

        //Add Past experience details
        await page.waitForTimeout(2000);
        await page.locator('xpath=(//div[@class="mantine-3xbgk5 mantine-Button-inner"]//span[contains(text(),"Add")])[4]').click();

        //add details in Past Experience form
        await page.locator('xpath=(//input[@placeholder="Enter Company Name"])[1]').fill('Test company name');
        await page.locator('xpath=(//input[@placeholder="Select Date"])[1]').fill('03-01-2019');
        await page.locator('xpath=(//input[@placeholder="Select Date"])[2]').fill('06-07-2020');

        await page.locator('xpath=//input[@placeholder="Enter Job Title"]').fill('Software Tester');

        await page.locator('xpath=//input[@placeholder="Select Country"]').click();
        await page.getByRole('option', { name: 'India', exact: true }).click();
        await page.waitForTimeout(1000);

        await page.locator('xpath=//input[@placeholder="Select State"]').click();
        await page.getByRole('option', { name: 'Gujarat', exact: true }).click();
        await page.waitForTimeout(1000);

        await page.locator('xpath=//input[@placeholder="Select City"]').click();
        await page.getByRole('option', { name: 'Valsad', exact: true }).click();
        await page.waitForTimeout(1000);

        page.keyboard.press('PageDown');

        //choose file to upload
        await page.waitForTimeout(2000);
        await page.locator('xpath=//div[@role="presentation"]').click();
        
        //choose file from explorer
        await page.waitForTimeout(2000);
        upload_script();

        //click on Save button and verify confirmation
        await cm_loc.saveBtn.click();
        await expect(cm_loc.successMsg).toBeVisible();

    })

test('TS_PR_15 - Validate Edit functionality with valid data inPast Experience section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Professional Background tab
    await page.locator('xpath=//div[contains(text(),"Professional Background")]').click();

    //scroll page
    page.keyboard.press('PageDown');

    //Add Past experience details
    await page.waitForTimeout(2000);
    await page.locator('xpath=//button[@id="mantine-rhv-target"]//*[name()="svg"]').click();


})




})

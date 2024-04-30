import { test, expect } from '@playwright/test'
import HelperBase from '../Helper methods/helperbase.spec';
import CommonLocators from '../common_locators.spec';
import exp from 'constants';


let helper;
let cm_loc;

var exec = require('child_process').execFile;
var upload_script = function () {
    exec('upload_past_experience.exe', function (err, data) {
        console.log(err);
    });
}

test.describe('6561_Education Profile_Test Design', () => {
    test('TS_EP_04 - Validate Add new functionality with valid data in Academic Details section.', async ({ page }) => {
        helper = new HelperBase(page);
        cm_loc = new CommonLocators(page);
        await helper.navigate();
        await helper.loginAsEmployee();

        //------test case steps------

        //click on user profile and navigate to My Profile page
        await helper.userProfile.click();
        await cm_loc.myProfileBtn.click();

        //click on Education tab
        await page.locator('xpath=//div[contains(text(),"Education")]').click();

        //Add Academic details 
        await page.waitForTimeout(2000);
        await page.locator('xpath=(//span[contains(text(),"Add")])[7]').click();
        await page.locator('xpath=//input[@placeholder="Select Academic Level"]').click();  //academic level
        await page.getByRole('option', { name: 'Graduate', exact: true }).click();

        await page.locator('xpath=//input[@placeholder="Enter Institute Name"]').fill('Test institute name');   //institute name

        await page.locator('xpath=//input[@placeholder="Enter Board/University Name"]').fill('Test University');  //Board/university name

        await page.locator('xpath=(//input[starts-with(@id,"mantine-r")])[4]').fill('Bacehlors degree');  //Degree title

        await page.locator('xpath=//input[@placeholder="E.g. Business, Technology, Medical"]').fill('Technology'); //Academic discipline

        await page.locator('xpath=//input[@placeholder="E.g. Volleyball, yearly events/shows, running marketing campaign, etc"]').fill('Cricket')

        await page.locator('xpath=(//input[@placeholder="Select Date"])[1]').fill('01-01-2021');  //start date

        await page.locator('xpath=(//input[@placeholder="Select Date"])[2]').fill('04-02-2022'); //end date

        //choose file to upload
        await page.waitForTimeout(2000);
        await page.locator('xpath=//div[@role="presentation"]').click();
        await page.waitForTimeout(1000);
        upload_script();

        //click on Save button and verify confirmation
        await page.waitForTimeout(2000);
        await cm_loc.saveBtn.click();
        await page.waitForTimeout(1000);
        await expect(cm_loc.successMsg).toBeVisible();
        console.log('Information in Academic details section is added');

    })

    test('Validate Edit new functionality with valid data in Academic Details section.', async ({ page }) => {
        helper = new HelperBase(page);
        cm_loc = new CommonLocators(page);
        await helper.navigate();
        await helper.loginAsEmployee();

        //------test case steps------

        //click on user profile and navigate to My Profile page
        await helper.userProfile.click();
        await cm_loc.myProfileBtn.click();

        //click on Education tab
        await page.locator('xpath=//div[contains(text(),"Education")]').click();

        //Edit Academic details 
        await page.locator('xpath=//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"]').click();
        await page.locator('xpath=//div[contains(text(),"Edit")]').click();

        await page.locator('xpath=//input[@placeholder="Select Academic Level"]').click();  //academic level
        await page.getByRole('option', { name: 'Postgraduate', exact: true }).click();

        await page.locator('xpath=//input[@placeholder="Enter Institute Name"]').fill('Test2');   //institute name

        await page.locator('xpath=//input[@placeholder="Enter Board/University Name"]').fill('Test2');  //Board/university name

        await page.locator('xpath=(//input[starts-with(@id,"mantine-r")])[4]').fill('Test2');  //Degree title

        await page.locator('xpath=//input[@placeholder="E.g. Business, Technology, Medical"]').fill('Test2'); //Academic discipline

        await page.locator('xpath=//input[@placeholder="E.g. Volleyball, yearly events/shows, running marketing campaign, etc"]').fill('Test2')

        await page.locator('xpath=(//input[@placeholder="Select Date"])[1]').fill('01-01-2022');  //start date

        await page.locator('xpath=(//input[@placeholder="Select Date"])[2]').fill('04-02-2022'); //end date

        //choose file to upload
        await page.waitForTimeout(2000);
        await page.locator('xpath=//div[@role="presentation"]').click();


        await page.waitForTimeout(1000);
        upload_script();

        //click on Save button and verify confirmation
        page.keyboard.press('PageDown');
        await cm_loc.saveBtn.click();
        await expect(cm_loc.successMsg).toBeVisible();
        console.log('Information in Academic details section is edited');

    })
    
    test('Validate Cancel button functionality when user add/edit their Education details.', async ({ page }) => {
        helper = new HelperBase(page);
        cm_loc = new CommonLocators(page);
        await helper.navigate();
        await helper.loginAsEmployee();

        //------test case steps------

        //click on user profile and navigate to My Profile page
        await helper.userProfile.click();
        await cm_loc.myProfileBtn.click();

        //click on Education tab
        await page.locator('xpath=//div[contains(text(),"Education")]').click();

        //Add Academic details 
        await page.waitForTimeout(2000);
        await page.locator('xpath=(//span[contains(text(),"Add")])[7]').click();
        await page.locator('xpath=//input[@placeholder="Select Academic Level"]').click();  //academic level
        await page.getByRole('option', { name: 'Graduate', exact: true }).click();

        await page.locator('xpath=//input[@placeholder="Enter Institute Name"]').fill('Test institute name');   //institute name

        //click on Cancel button
        await cm_loc.cancelBtn.click();

        //verify cancel confirmation pop-up
        await expect(cm_loc.unsavedPopUp).toBeVisible();
        await cm_loc.noBtn.click();
        await cm_loc.cancelBtn.click();
        await cm_loc.yesBtn.click();

        //again click on edit button
        await page.locator('xpath=//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"]').click();
        await page.locator('xpath=//div[contains(text(),"Edit")]').click();

        await page.locator('xpath=//input[@placeholder="Select Academic Level"]').click();  //academic level
        await page.getByRole('option', { name: 'Postgraduate', exact: true }).click();

        await page.locator('xpath=//input[@placeholder="Enter Institute Name"]').fill('Test2');   //institute name

        //click on Cancel button
        await cm_loc.cancelBtn.click();

        //verify cancel confirmation pop-up
        await expect(cm_loc.unsavedPopUp).toBeVisible();
        await cm_loc.noBtn.click();
        await cm_loc.cancelBtn.click();
        await cm_loc.yesBtn.click();
        console.log('Add/Edit Eductaion Profile action is cancelled')
    })
    
    
})

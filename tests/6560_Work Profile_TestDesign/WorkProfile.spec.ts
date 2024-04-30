import { test, expect } from '@playwright/test'
import HelperBase from '../Helper methods/helperbase.spec';
import CommonLocators from '../common_locators.spec';
import path from 'path';
import exp from 'constants';

let helper;
let cm_loc;

var exec = require('child_process').execFile;
var upload_script = function () {
    exec('upload_past_experience.exe', function (err, data) {
        console.log(err);
    });
}

test.describe('6560_Work Profile_TestDesign', () => {

    test('TS_PR_13 - Validate I am a Fresher button when Past Experience is not added.', async ({ page }) => {
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
        await page.keyboard.press('PageDown');

        //validate Fresher button
        const impInfo = page.locator('xpath=(//span[contains(text(),"Important Information")])[7]');

        if(expect(impInfo.isVisible())){
            await page.locator('xpath=//span[contains(text(),"I am a Fresher")]').click();
            await page.waitForTimeout(1000);
            await expect(page.locator('xpath=//div[contains(text(),"No prior work experience since you are a fresher. ")]')).toBeVisible();
        }
        console.log('Fresher button validated');
    })
    

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
        await page.locator('xpath=(//div[@class="mantine-3xbgk5 mantine-Button-inner"]//span[contains(text(),"Add")])[7]').click();

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


        await page.waitForTimeout(1000);
        upload_script();

        //click on Save button and verify confirmation
        page.keyboard.press('PageDown');
        await cm_loc.saveBtn.click();
        await expect(cm_loc.successMsg).toBeVisible();
        console.log('Past Experience details section is added');
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

        //Edit Past experience details
        await page.waitForTimeout(2000);
        await page.locator('xpath=//*[name()="path" and contains(@d,"M12 12m-1 ")]').click();
        await page.locator('xpath=//div[contains(text(),"Edit")]').click();

        await page.locator('xpath=(//input[@placeholder="Enter Company Name"])[1]').fill('Test company name edited');
        await page.locator('xpath=(//input[@placeholder="Select Date"])[1]').fill('03-01-2020');
        await page.locator('xpath=(//input[@placeholder="Select Date"])[2]').fill('06-07-2021');

        await page.locator('xpath=//input[@placeholder="Enter Job Title"]').fill('Software Quality Assurance Engineer');

        await page.locator('xpath=//input[@placeholder="Select Country"]').click();
        await page.getByRole('option', { name: 'India', exact: true }).click();
        await page.waitForTimeout(1000);

        await page.locator('xpath=//input[@placeholder="Select State"]').click();
        await page.getByRole('option', { name: 'Maharashtra', exact: true }).click();
        await page.waitForTimeout(1000);

        await page.locator('xpath=//input[@placeholder="Select City"]').click();
        await page.getByRole('option', { name: 'Mumbai', exact: true }).click();
        await page.waitForTimeout(1000);

        page.keyboard.press('PageDown');

        //click on Save button and verify confirmation
        page.keyboard.press('PageDown');
        await cm_loc.saveBtn.click();
        await expect(cm_loc.successMsg).toBeVisible();
        console.log('Past Experience details section is updated');

    })

    test('TS_PR_16 - Validate Add new functionality with invalid data in Past Experience section.', async ({ page }) => {
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
        await page.keyboard.press('PageDown');

        //Add Past experience details
        await page.waitForTimeout(2000);
        await page.locator('xpath=(//div[@class="mantine-3xbgk5 mantine-Button-inner"]//span[contains(text(),"Add")])[7]').click();

        //check all fields for blank data
        await cm_loc.saveBtn.click();

        //company name
        const companyNameError = page.locator('xpath=//div[contains(text(),"Please enter the Company Name")]');
        await expect(companyNameError).toContainText('Please enter the Company Name');

        //Start date
        await page.waitForTimeout(1000);
        const startDateError = page.locator('xpath=//div[contains(text(),"Please select a Start Date.")]');
        await expect(startDateError).toContainText('Please select a Start Date.');

        //End date
        await page.waitForTimeout(1000);
        const endDateError = page.locator('xpath=//div[contains(text(),"Please select an End Date.")]');
        await expect(endDateError).toContainText('Please select an End Date.');

        //Job title
        await page.waitForTimeout(1000);
        const jobTitleError = page.locator('xpath=//div[contains(text(),"Please enter the Job Title.")]');
        await expect(jobTitleError).toContainText('Please enter the Job Title.');

        //country
        await page.waitForTimeout(1000);
        const countryError = page.locator('xpath=//div[contains(text(),"Please select the Country.")]');
        await expect(countryError).toContainText('Please select the Country.');

        //state
        await page.waitForTimeout(1000);
        const stateError = page.locator('xpath=//div[contains(text(),"Please select the State.")]');
        await expect(stateError).toContainText('Please select the State.');

        //city
        await page.waitForTimeout(1000);
        const cityError = page.locator('xpath=//div[contains(text(),"Please select the City.")]');
        await expect(cityError).toContainText('Please select the City.');

        //check all fields for invalid data
        //company name
        await page.locator('xpath=(//input[@placeholder="Enter Company Name"])[1]').fill('$^%&^*&*');
        await page.keyboard.press('Tab');
        const companyNameError1 = page.locator('xpath=//div[contains(text(),"The Company Name must contain only alphanumeric characters, hyphens, and apostrophes.")]');
        await expect(companyNameError1).toBeVisible();

        //job title
        await page.locator('xpath=//input[@placeholder="Enter Job Title"]').fill('%^%&^*&*');
        await page.keyboard.press('Tab');
        const jobTitleError1 = page.locator('xpath=//div[contains(text(),"The Job Title must contain only alphanumeric characters, hyphens, and apostrophes.")]');
        await expect(jobTitleError1).toBeVisible();

       console.log('Past Experience details is verified with invalid details');

    })

    test('TS_PR_17 - Validate Edit functionality with invalid data in Past Experience section.', async ({ page }) => {
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

         //Edit Past experience details
         await page.waitForTimeout(2000);
         await page.locator('xpath=//*[name()="path" and contains(@d,"M12 12m-1 ")]').click();
         await page.locator('xpath=//div[contains(text(),"Edit")]').click();

         //check fields with blank data
        //company name
        await page.locator('xpath=//input[@placeholder="Enter Company Name"]').clear();
        await page.locator('xpath=//input[@placeholder="Enter Company Name"]').click();
        await page.keyboard.press('Tab');
        const companyNameError = page.locator('xpath=//div[contains(text(),"Please enter the Company Name.")]');
        await expect(companyNameError).toBeVisible();
        await expect(companyNameError).toContainText('Please enter the Company Name.');

 
        //Job title
        await page.waitForTimeout(1000);
        await page.locator('xpath=//input[@placeholder="Enter Job Title"]').clear();
        await page.locator('xpath=//input[@placeholder="Enter Job Title"]').click();
        await page.keyboard.press('Tab');
        const jobTitleError = page.locator('xpath=//div[contains(text(),"Please enter the Job Title.")]');
        await expect(jobTitleError).toBeVisible();
        await expect(jobTitleError).toContainText('Please enter the Job Title.');

        //check fields for invalid data
        //company name
        await page.locator('xpath=//input[@placeholder="Enter Company Name"]').fill('$^%&^*&*');
        await page.keyboard.press('Tab');
        const companyNameError1 = page.locator('xpath=//div[contains(text(),"The Company Name must contain only alphanumeric characters, hyphens, and apostrophes.")]');
        await expect(companyNameError1).toBeVisible();

        //job title
        await page.locator('xpath=//input[@placeholder="Enter Job Title"]').fill('%^%&^*&*');
        await page.keyboard.press('Tab');
        const jobTitleError1 = page.locator('xpath=//div[contains(text(),"The Job Title must contain only alphanumeric characters, hyphens, and apostrophes.")]');
        await expect(jobTitleError1).toBeVisible();

       console.log('Past Experience details is verified with invalid details');
    })

    test('TS_PR_18 - Validate delete functionality of Past Experience section.', async ({ page }) => {

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

        //Delete Past experience details
        await page.waitForTimeout(2000);
        await page.locator('xpath=//*[name()="path" and contains(@d,"M12 12m-1 ")]').click();
        await page.locator('xpath=//div[contains(text(),"Delete")]').click();

        //verify delete confirmation pop-up
        const deletepopup = page.locator('xpath=//div[contains(text(),"Delete Confirmation")]');
        await expect(deletepopup).toBeVisible();
        await cm_loc.deleteBtn.click();
        await expect(cm_loc.successMsg).toBeVisible();
        console.log('Past experience details are deleted');
    })

    test('TS_PR_19 - Validate Cancel button functionality when user Add/Edit their Work details.', async ({ page }) => {

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

         //Edit Past experience details
         await page.waitForTimeout(2000);
         await page.locator('xpath=//*[name()="path" and contains(@d,"M12 12m-1 ")]').click();
         await page.locator('xpath=//div[contains(text(),"Edit")]').click();

         //edit any one field and click on Cancel button
         await page.locator('xpath=//input[@placeholder="Enter Company Name"]').clear();
         await page.locator('xpath=//input[@placeholder="Enter Company Name"]').fill('Test');

         await cm_loc.cancelBtn.click();
         await expect(cm_loc.unsavedPopUp).toBeVisible();

         await cm_loc.yesBtn.click();
         console.log('Edit past experience details action is cancelled');
    })

})

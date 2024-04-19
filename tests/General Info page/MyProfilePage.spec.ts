import { test, expect } from '@playwright/test'
import common_methods from '../Helper methods/helperbase.spec';
import HelperBase from '../Helper methods/helperbase.spec';
import CommonLocators from '../common_locators.spec';
import exp from 'constants';


let helper;
let abtMeText;
let cm_loc;

test.describe('General Info section on My Profile page', () => {

    test('TS_GI_03 - Validate Add/Edit new functionality of Blood group in Personal Information section.', async ({ page }) => {

        helper = new HelperBase(page);
        cm_loc = new CommonLocators(page);
        await helper.navigate();
        await helper.loginAsEmployee();

        //------test case steps------

        //click on user profile and navigate to My Profile page
        await helper.userProfile.click();
        await cm_loc.myProfileBtn.click();

        //click on edit button of Personal Details section
        await page.locator('xpath=//div[@class="mantine-Paper-root mantine-Card-root mantine-rph89u"]//button[@type="button"]').click();
        await page.waitForTimeout(2000);

        //select blood group & marital status from dropdowns
        const bloodgrpDropdown = page.locator('xpath=//input[@placeholder="Select Blood Group"]');
        await bloodgrpDropdown.click();
        await page.getByRole('option', { name: 'A-' }).click();


        const mStatusDropdown = page.locator('xpath=//input[@placeholder="Choose Marital Status"]');
        await mStatusDropdown.click();
        await page.getByRole('option', { name: 'Unmarried' }).click();


        //click on Save button
        await cm_loc.saveBtn.click();
        console.log('Personal Details section is updated');
    
    })

    test('TS_GI_04 - Validate Add new functionality with valid data in About me section.', async ({ page }) => {
        helper = new HelperBase(page);
        cm_loc = new CommonLocators(page);
        await helper.navigate();
        await helper.loginAsEmployee();

        //------test case steps------

        //click on user profile and navigate to My Profile page
        await helper.userProfile.click();
        await cm_loc.myProfileBtn.click();

        //click on Edit button of About me section
        await page.locator('xpath=(//div[contains(@class,"mantine-Grid-col mantine-hgxo0i")]//div[contains(@class,"mantine-Paper-root mantine-Card-root mantine-3l3l5e")]//span[contains(@class,"mantine-qo1k2 mantine-Button-label")][normalize-space()="Add"])[1]').click();
        await page.waitForTimeout(1000);

        //Edit details in about me textarea box & save it
        await page.locator('xpath=//textarea[@placeholder="Tell everyone who you are"]').fill('Hi this is test user');
        await cm_loc.saveBtn.click();
      
        await expect(cm_loc.successMsg).toBeVisible();
        console.log('About Me section detail is added');
    })
    
    test('TS_GI_05 - Validate Edit new functionality with valid data in About me section.', async ({ page }) => {

        helper = new HelperBase(page);
        cm_loc = new CommonLocators(page);
        await helper.navigate();
        await helper.loginAsEmployee();

        //------test case steps------

        //click on user profile and navigate to My Profile page
        await helper.userProfile.click();
        await cm_loc.myProfileBtn.click();

        //click on Edit button of About me section
        await page.locator('xpath=//div[contains(@class,"mantine-Grid-col mantine-hgxo0i")]//div[contains(@class,"mantine-Paper-root mantine-Card-root mantine-3l3l5e")]//span[contains(@class,"mantine-qo1k2 mantine-Button-label")][normalize-space()="Edit"]').click();
        await page.waitForTimeout(2000);

        //Edit details in about me textarea box & save it
        await page.locator('xpath=//textarea[@placeholder="Tell everyone who you are"]').clear();
        await page.locator('xpath=//textarea[@placeholder="Tell everyone who you are"]').fill('This is edited text for About Me section');
        await cm_loc.saveBtn.click();
      
        await page.waitForTimeout(2000);
        await expect(cm_loc.successMsg).toBeVisible();
        console.log('About Me section is updated');
    })

     
    test('TS_GI_07 - Validate Edit functionality with invalid data in About me section.', async ({ page }) => {

        helper = new HelperBase(page);
        cm_loc = new CommonLocators(page);
        await helper.navigate();
        await helper.loginAsEmployee();
        abtMeText = "As an accountant, I've helped my company manage and optimize its financial operations. My experience and education have enabled me to provide unparalleled insight into the company's fiscal performance, which worked to expand revenue by $560,000 in two years. My affinity for numbers, dedication and attention to detail can help me improve your company's financial performance and enhance your fiscal achievements. As an accountant, I've helped my company manage and optimize its financial operations. My experience and education have enabled me to provide unparalleled insight into the company's fiscal performance, which worked to expand revenue by $560,000 in two years. My affinity for numbers, dedication and attention to detail can help me improve your company's financial performance and enhance your fiscal achievements. As an accountant, I've helped my company manage and optimize its financial operations. My experience and education have enabled me to provide unparalleled insight into the company's fiscal performance, which worked to expand revenue by $560,000 in two years. My affinity for numbers, dedication and attention to detail can help me improve your company's financial performance and enhance your fiscal achievements.";
        //------test case steps------

        //click on user profile and navigate to My Profile page
        await helper.userProfile.click();
        await cm_loc.myProfileBtn.click();

        //click on Edit button of About Me section
        await page.locator('xpath=//div[contains(@class,"mantine-Grid-col mantine-hgxo0i")]//div[contains(@class,"mantine-Paper-root mantine-Card-root mantine-3l3l5e")]//span[contains(@class,"mantine-qo1k2 mantine-Button-label")][normalize-space()="Edit"]').click();
        await page.waitForTimeout(2000);

        //enter invalid length text and verify the validation message displayed
        await page.locator('xpath=//textarea[@placeholder="Tell everyone who you are"]').clear();
        await page.locator('xpath=//textarea[@placeholder="Tell everyone who you are"]').fill(abtMeText);
        await cm_loc.saveBtn.click();
        await page.waitForTimeout(2000);

        const abtMeMsg = await page.locator('xpath=//div[contains(text(),"1000 characters are the most you can use when describing yourself.")]');
        await expect(abtMeMsg).toBeVisible();
        await expect(abtMeMsg).toContainText('1000 characters are the most you can use when describing yourself.');
        await page.waitForTimeout(2000);
        console.log('Test invalid - 1000 characters are the most you can use when describing yourself.');
    })

})

test('TS_GI_08 - Validate Cancel button functionality of About me section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of About Me section
    await page.locator('xpath=//div[contains(@class,"mantine-Grid-col mantine-hgxo0i")]//div[contains(@class,"mantine-Paper-root mantine-Card-root mantine-3l3l5e")]//span[contains(@class,"mantine-qo1k2 mantine-Button-label")][normalize-space()="Edit"]').click();
    await page.waitForTimeout(2000);

    //edit text in About me section
    await page.locator('xpath=//textarea[@placeholder="Tell everyone who you are"]').clear();
    await page.locator('xpath=//textarea[@placeholder="Tell everyone who you are"]').fill('This is edited text for testing');
    await page.waitForTimeout(2000);

    //click on Cancel button of About me section
    await cm_loc.cancelBtn.click();

    //verify confirmation pop up is displayed for unsaved changes
   
    await expect(cm_loc.unsavedPopUp).toBeVisible();
   
    await cm_loc.yesBtn.click();
    console.log('About Me - Confirmation pop-up is visible');

    console.log('About Me section is closed.')
})

test('TS_GI_09 - Validate Add new functionality with valid data in Family Details section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on add button of Family Details ection
    await page.locator('(//div[contains(@class,"mantine-Grid-col mantine-hgxo0i")] //span[contains(text(),"Add")])[1]').click();
    await page.waitForTimeout(3000);

    //add details on Add Family Details form
    const reldrpdwn = page.locator('xpath=//input[@placeholder="Select Relationship"]');
    await reldrpdwn.click();
    await page.getByRole('option', { name: 'Daughter' }).click();

    await page.locator('xpath=//input[@placeholder="Enter Name"]').fill('Test QA');

    await page.locator('xpath=//input[@placeholder="Select Date"]').fill('04/08/2024');

    await page.waitForTimeout(2000);

    await page.locator('xpath=//input[@placeholder="Enter Mobile Number"]').fill('7895520031');
    await cm_loc.saveBtn.click();
    console.log('Family Details section is updated');

})

test('TS_GI_10 - Validate Edit functionality with valid data in Family Details section.', async ({ page }) => {

    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on ellipsis icon of Family details tile
    await page.locator('(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[1]').click();

    await page.locator('.mantine-1eawhj0 >> text=Edit').click();

    //edit details in Edit Family section form
    const reldrpdwn = page.locator('xpath=//input[@placeholder="Select Relationship"]');
    await reldrpdwn.click();
    await page.getByRole('option', { name: 'Father', exact: true }).click();

    await page.locator('xpath=//input[@placeholder="Enter Name"]').fill('Test QA');

    await page.locator('xpath=//input[@placeholder="Select Date"]').fill('04/08/2024');

    await page.locator('xpath=//input[@placeholder="Enter Mobile Number"]').fill('7784599910');
    await cm_loc.saveBtn.click();
    
    await page.waitForTimeout(2000);
    await expect(cm_loc.successMsg).toBeVisible();
    console.log('Family Details section is edited');

})

test('TS_GI_12 - Validate Edit functionality with invalid data in Family Details section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on ellipsis icon of Family details tile
    await page.locator('xpath=(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[1]').click();

    await page.locator('.mantine-1eawhj0 >> text=Edit').click();

    //edit details in Edit Family section form
    const reldrpdwn = page.locator('xpath=//input[@placeholder="Select Relationship"]');
    await reldrpdwn.click();
    await page.getByRole('option', { name: 'Father', exact: true }).click();

    await page.locator('xpath=//input[@placeholder="Enter Name"]').fill('Ke1vin Pate1');
    await page.keyboard.press('Tab');
    const nameErrorMsg = page.locator('xpath=//div[contains(text(),"The Name must contain only letters, hyphens, and apostrophes.")]');
    await expect(nameErrorMsg).toBeVisible();

    await page.locator('xpath=//input[@placeholder="Enter Mobile Number"]').fill('12345');
    await page.keyboard.press('Tab');
    const mobileNoErrorMsg = page.locator('xpath=//div[contains(text(),"The Mobile Number must be 10 digits long.")]');
    await expect(mobileNoErrorMsg).toBeVisible();

  })

test('TS_GI_13 - Validate Delete functionality of Family Details section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page)
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on ellipsis icon of Family details tile
    await page.locator('(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[2]').click();

    //delete the family detail tile
    await page.locator('xpath=//div[contains(text(),"Delete")]').click();
    await page.locator('xpath=//div[@role="dialog"]').isVisible();
    await page.locator('xpath=//span[normalize-space()="Delete"]').click();

    //confirm toast message displayed
    await page.locator('xpath=//div[@class="mantine-Text-root mantine-Notification-title mantine-17zg7pb"]').click();
    console.log('Family Details tile is deleted successfully');

})

test('TS_GI_14 - Validate Cancel button functionality of Family Details section.', async ({ page }) => {

    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on ellipsis icon of Family details tile
    await page.locator('(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[2]').click();
    await page.locator('.mantine-1eawhj0 >> text=Edit').click();

    const reldrpdwn = page.locator('xpath=//input[@placeholder="Select Relationship"]');
    await reldrpdwn.click();
    await page.getByRole('option', { name: 'Spouse', exact: true }).click();

    await page.locator('xpath=//input[@placeholder="Enter Name"]').fill('Test QA');

    await cm_loc.cancelBtn.click();
    await expect(cm_loc.unsavedPopUp).toBeVisible();

    await cm_loc.saveBtn.click();
    console.log('User is redirected to Home page');

})

test('TS_GI_20 - Validate Add new functionality with valid data in Medical History section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on add button of medical history section
    await page.locator('(//div[contains(@class,"mantine-Grid-col mantine-hgxo0i")] //span[contains(text(),"Add")])[2]').click();

    //add details on Medical History form
    await page.getByPlaceholder('Enter Health Ailment Name').fill('Blood pressure');

    await page.getByPlaceholder('Select Current Status').click();
    await page.getByRole('option', { name: 'Fair' }).click();

    await page.locator('xpath=(//input[@placeholder="Select Date"])[1]').fill('04/08/2024');

    await cm_loc.saveBtn.click();
    console.log('Medical History is added');

})

test('TS_GI_21 - Validate Edit functionality with valid data in Medical History section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Medical history section
    await page.locator('(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[4]').click();

    //edit details and click on Save
    await page.locator('.mantine-1eawhj0 >> text=Edit').click();
    await page.getByPlaceholder('Select Current Status').click();
    await page.getByRole('option', { name: 'Treated' }).click();

    await cm_loc.saveBtn.click();
   
    await page.waitForTimeout(2000);
    await expect(cm_loc.successMsg).toBeVisible();

    console.log('Medical History is edited');

})

test('TS_GI_22 - Validate Add new functionality with invalid data in Medical History section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Medical history section
    await page.locator('(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[4]').click();
    await page.locator('.mantine-1eawhj0 >> text=Edit').click();

    //edit details with invalid data and Save
    await page.getByPlaceholder('Enter Health Ailment Name').fill('#%$^&^%&%');
    await page.keyboard.press('Enter');

    const errorHAName = page.locator('xpath=//div[contains(text(),"Health Ailment Name may only contain alphanumeric characters, hyphens and apostrophes.")]');
    await page.waitForTimeout(2000);
    await expect(errorHAName).toBeVisible();
    await page.getByPlaceholder('Enter Health Ailment Name').clear();

    await page.locator('xpath=(//input[@placeholder="Select Date"])[1]').fill('04/08/2024');
    await cm_loc.saveBtn.click();

    const errorHADate = page.locator('//div[contains(text(),"Invalid treatment start date")]');
    await page.waitForTimeout(2000);
    await expect(errorHADate).toBeVisible();
    console.log('Medical History is added');


})

test('TS_GI_23 - Validate Edit functionality with invalid data in Medical History section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Medical history section
    await page.locator('xpath=(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[3]').click();

    //edit details and verify the error message is visible
    await page.locator('.mantine-1eawhj0 >> text=Edit').click();
    await page.getByPlaceholder('Enter Health Ailment Name').fill('#%$^&^%&%');
    await page.keyboard.press('Tab');

    const healthailmentErrorMsg = page.locator('xpath=//div[contains(text(),"Health Ailment Name may only contain alphanumeric characters, hyphens and apostrophes.")]');
    await expect(healthailmentErrorMsg).toBeVisible();
    console.log('Medical History is having invalid data');
})

test('TS_GI_24 - Validate Delete functionality of Medical History section.', async ({ page }) => {

    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Medical history section
    await page.locator('(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[4]').click();
    await page.locator('xpath=//div[contains(text(),"Delete")]').click();

    //verify confirmation pop up is displayed
    const deletepopup = page.locator('xpath=//div[contains(text(),"Delete Confirmation")]');
    await expect(deletepopup).toBeVisible();

    //click on ok button of pop up
    await page.locator('xpath=//span[contains(text(),"Delete")]').click();

    await page.waitForTimeout(2000);
    await expect(cm_loc.successMsg).toBeVisible();
    console.log('Medical History section is deleted');

})

test('TS_GI_25 - Validate Cancel button functionality of Medical History section.', async ({ page }) => {

    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Medical history section
    await page.locator('xpath=(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[3]').click();
    await page.locator('.mantine-1eawhj0 >> text=Edit').click();

    //edit details and click on Cancel button
    await page.getByPlaceholder('Select Current Status').click();
    await page.getByRole('option', { name: 'Good' }).click();

    await cm_loc.cancelBtn.click();
   
    await page.waitForTimeout(2000);
    await expect(cm_loc.unsavedPopUp).toBeVisible();

    await cm_loc.yesBtn.click();
    console.log('Cancel button is clicked in MH section');
})

test('TS_GI_27 - Validate Edit functionality with valid data in Other section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Others section
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Edit")])[5]').click();
    
    //edit details in Others page
    await page.getByPlaceholder('Select Diet Type').click();
    await page.getByRole('option', { name: 'Jain' }).click();

    await page.getByPlaceholder('Select T-shirt Size').click();
    await page.getByRole('option', { name: 'M' }).click();

    await page.getByPlaceholder('Food Allergy').clear();
    await page.getByPlaceholder('Food Allergy').fill('None');
    await page.getByPlaceholder('Hobbies').clear();
    await page.getByPlaceholder('Hobbies').fill('None');

    //click on save
    await cm_loc.saveBtn.click();

    await page.waitForTimeout(2000);
    await expect(cm_loc.successMsg).toBeVisible();
    console.log('Others section is edited');
})

test('TS_GI_28 - Validate Add new functionality with invalid data in Other section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Others section
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Edit")])[5]').click();

    //edit details in Others page
    await page.getByPlaceholder('Food Allergy').clear();
    await page.getByPlaceholder('Food Allergy').fill('^$^&%&');
    await page.keyboard.press('Tab');
    const errorMsg = page.locator('xpath=//div[contains(text(),"Food Allergy must contain only alphanumeric characters and commas.")]');
    await expect(errorMsg).toBeVisible();

    await page.getByPlaceholder('Hobbies').clear();
    await page.getByPlaceholder('Hobbies').fill('^%&^*&%');
    await page.keyboard.press('Tab');
    const errorMsg2 = page.locator('xpath=//div[contains(text(),"Hobbies must contain only alphanumeric characters and commas.")]');
    await expect(errorMsg).toBeVisible();

})

test('TS_GI_30 - Validate Cancel button functionality of Other section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Others section
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Edit")])[5]').click();

    //edit details in any field
    await page.getByPlaceholder('Food Allergy').clear();
    await page.getByPlaceholder('Food Allergy').fill('None');

    //click on Cancel button
    await cm_loc.cancelBtn.click();
    
    await expect(cm_loc.unsavedPopUp).toBeVisible();

    await cm_loc.yesBtn.click();
})


test('TS_GI_32 - Validate Edit functionality with valid data in Skills section.', async ({ page }) => {
  
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Soft skills section
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Edit")])[3]').click();
    await page.locator('xpath=//input[@placeholder="Enter your soft skills"]').clear();
    await page.locator('//input[@placeholder="Enter your soft skills"]').fill('Hardworking, Focused');

    await cm_loc.saveBtn.click();
    await expect(cm_loc.successMsg).toBeVisible();
    console.log('Soft skills section is edited');
})

test('TS_GI_34 - Validate Edit functionality with invalid data in Skills section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Soft skills section
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Edit")])[3]').click();
    await page.locator('xpath=//input[@placeholder="Enter your soft skills"]').clear();
    await page.locator('xpath=//input[@placeholder="Enter your soft skills"]').fill('^&**()))');

    await page.keyboard.press('Tab');
    const softskillsErrorMsg = page.locator('xpath=//div[contains(text(),"Soft Skills must contain only alphanumeric characters and commas.")]');
    await expect(softskillsErrorMsg).toBeVisible();

    console.log('Soft skills section is having invalid data');
})
import { test, expect } from '@playwright/test'
import HelperBase from '../Helper methods/helperbase.spec';
import CommonLocators from '../common_locators.spec';

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
    await page.locator('xpath=(//div[contains(@class,"mantine-Grid-col mantine-hgxo0i")] //span[contains(text(),"Add")])[1]').click();
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
    await page.locator('xpath=(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[1]').click();

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
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"])[5]').click();
    await page.locator('xpath=//input[@placeholder="Enter your soft skills"]').clear();
    await page.locator('xpath=//input[@placeholder="Enter your soft skills"]').fill('Hardworking, Focused');

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
    await page.waitForTimeout(2000);
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Edit")])[3]').click();
    await page.locator('xpath=//input[@placeholder="Enter your soft skills"]').clear();
    await page.locator('xpath=//input[@placeholder="Enter your soft skills"]').fill('^&**()))');

    await page.keyboard.press('Tab');
    const softskillsErrorMsg = page.locator('xpath=//div[contains(text(),"Soft Skills must contain only alphanumeric characters and commas.")]');
    await expect(softskillsErrorMsg).toBeVisible();

    console.log('Soft skills section is having invalid data');
})

test('TS_GI_35 - Validate Cancel button functionality of Skills section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Soft skills section
    await page.waitForTimeout(2000);
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Edit")])[3]').click();
    await page.locator('xpath=//input[@placeholder="Enter your soft skills"]').clear();
    await page.locator('xpath=//input[@placeholder="Enter your soft skills"]').fill('Edited text');

    //click on Cancel button and verify confirmation pop-up
    await cm_loc.cancelBtn.click();
    await expect(cm_loc.unsavedPopUp).toBeVisible();
    await cm_loc.yesBtn.click();
    console.log('Skills update action is cancelled');

})

test('TS_GI_36 - Validate Add new functionality with valid data in Languages section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Add button of Languages section and enter details in fields
    await page.waitForTimeout(2000);
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Add")])[4]').click();
    const selectLang = page.locator('xpath=//input[@placeholder="Select Language"]');
    await selectLang.click();
    await page.getByRole('option', { name: 'Hindi', exact: true}).click();

    const selectProficiency =  page.locator('xpath=//input[@placeholder="Select Proficiency"]');
    await selectProficiency.click();
    await page.getByRole('option',{name: 'Intermediate', exact: true}).click();

    //click on Save button and verify success message
    await cm_loc.saveBtn.click();
    await expect(cm_loc.successMsg).toBeVisible();
    console.log('Languages detail are updated')
})

test('TS_GI_37 - Validate Edit new functionality with valid data in Languages section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Add button of Languages section and enter details in fields
    await page.waitForTimeout(1000);
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Edit")])[4]').click();
    const selectLang = page.locator('xpath=//input[@placeholder="Select Language"]');
    await selectLang.click();
    await page.getByRole('option',{name: 'Gujarati', exact: true}).click();

    const selectProficiency =  page.locator('xpath=//input[@placeholder="Select Proficiency"]');
    await selectProficiency.click();
    await page.getByRole('option',{ name: 'Elementary'}).click();
 

    //click on Save button and verify success message
    await cm_loc.saveBtn.click();
    await expect(cm_loc.successMsg).toBeVisible();
    console.log('Languages detail are updated')
})

test('TS_GI_40 - Validate Delete functionality of Languages section.', async ({ page }) => {
 
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Languages section and delete a record
    await page.waitForTimeout(2000);
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Edit")])[4]').click();
  
    //click on Delete button and verify success message
    await page.locator('xpath=//div[@class="mantine-1rv86hq"]//div[1]//div[3]//button[1]//*[name()="svg"]//*[name()="path" and contains(@d,"M9 7v-3a1 ")]').click();
    await cm_loc.saveBtn.click();
    await page.waitForTimeout(2000);
    await expect(cm_loc.successMsg).toBeVisible();
    console.log('Languages detail are updated')
})

test('TS_GI_41 - Validate Cancel button functionality of Languages section.', async ({ page }) => {
 
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Languages section and delete a record
    await page.waitForTimeout(2000);
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Edit")])[4]').click();

    //click on Cancel button
    await cm_loc.cancelBtn.click();
    console.log('Language section updation is cancelled');

})

test('TS_GI_42 - Validate Add new functionality with valid data in Social Media section.', async ({ page }) => {
  
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Add button of Social media accounts section and add details
    await page.waitForTimeout(2000);
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Add")])[3]').click();

    //fill details on Social media account form
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
    window.scrollBy(0, 100);
    });
    const socialMediaAcc = page.locator('xpath=//input[@placeholder="Select Social Media Platform"]');
    await socialMediaAcc.click();
    await page.waitForTimeout(1000);
    await page.getByRole('option', {name: 'YouTube'}).click();

    await page.locator('xpath=//input[@placeholder="Paste your Social Media Profile URL"]').fill('https://www.youtube.com');

    await page.waitForTimeout(1000);
    await cm_loc.saveBtn.click();
    await expect(cm_loc.successMsg).toBeVisible();

})

test('TS_GI_43 - Validate Edit functionality with valid data in Social Media section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Edit button of Social media accounts section and add details
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
    window.scrollBy(0, 100);
    });
    await page.locator('xpath=(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[4]').click();
    await page.locator('xpath=//div[contains(text(),"Edit")]').click();
  
    
    //fill details on Social media account form
    const socialMediaAcc = page.locator('xpath=//input[@placeholder="Select Social Media Platform"]');
    await socialMediaAcc.click();
    await page.waitForTimeout(1000);
    await page.getByRole('option', {name: 'LinkedIn'}).click();

    await page.locator('xpath=//input[@placeholder="Paste your Social Media Profile URL"]').fill('https://www.linkedin.com');

    await page.waitForTimeout(1000);
    await cm_loc.saveBtn.click();
    await expect(cm_loc.successMsg).toBeVisible();
    console.log('Social Media accounts section is updated');
})

test('TS_GI_44 - Validate Add new functionality with invalid data in Social Media section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

    //click on Add button of Social media accounts section and add details
    await page.waitForTimeout(2000);
    await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Add")])[3]').click();

    //leave the fields blank and verify validation message
    await page.waitForTimeout(2000);
    await page.evaluate(() => {
    window.scrollBy(0, 100);
    });
    const socialMediaAcc = page.locator('xpath=//input[@placeholder="Select Social Media Platform"]');

    await cm_loc.saveBtn.click();

    //verify validations 
    const socialMediaPlatformError = page.locator('xpath=//div[contains(text(),"Please select a Social Media Platform.")]');
    await expect(socialMediaPlatformError).toContainText('Please select a Social Media Platform.');

    const profileURLError = page.locator('xpath=//div[contains(text(),"Please paste a Social Media Profile URL.")]');
    await expect(profileURLError).toContainText('Please paste a Social Media Profile URL.');

    console.log('Invalid data entered on Social Media accounts form');
})

test('TS_GI_46 - Validate Delete functionality of Social Media section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

     //click on Edit button of Social media accounts section and add details
     await page.waitForTimeout(2000);
     await page.evaluate(() => {
     window.scrollBy(0, 100);
     });
     await page.locator('xpath=(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[4]').click();
     
     //click on Delete button and verify confirmatoion message
     await page.locator('xpath=//div[contains(text(),"Delete")]').click();
     const deletepopup = page.locator('xpath=//div[contains(text(),"Delete Confirmation")]');
     await cm_loc.deleteBtn.click();
     await expect(cm_loc.successMsg).toBeVisible();
     console.log('Social Media account is deleted');
})

test('TS_GI_47 - Validate Cancel button functionality of Social Media section.', async ({ page }) => {
    helper = new HelperBase(page);
    cm_loc = new CommonLocators(page);
    await helper.navigate();
    await helper.loginAsEmployee();

    //------test case steps------

    //click on user profile and navigate to My Profile page
    await helper.userProfile.click();
    await cm_loc.myProfileBtn.click();

     //click on Add button of Social media accounts section and add details
     await page.waitForTimeout(2000);
     await page.locator('xpath=(//button[@class="mantine-UnstyledButton-root mantine-Button-root mantine-wmij6j"]//span[contains(text(),"Add")])[3]').click();
 
     //fill details on Social media account form
     await page.waitForTimeout(2000);

     //scroll page
     await page.evaluate(() => {
     window.scrollBy(0, 100);
     });
  
     await cm_loc.cancelBtn.click();
  
     //check cancellation flow in edit detail mode
     await page.locator('xpath=(//*[name()="svg"][@class="tabler-icon tabler-icon-dots-vertical"])[4]').click();
     await page.locator('xpath=//div[contains(text(),"Edit")]').click();
   
     
     //fill details on Social media account form
     const socialMediaAcc1 = page.locator('xpath=//input[@placeholder="Select Social Media Platform"]');
     await socialMediaAcc1.click();
     await page.waitForTimeout(1000);
     await page.getByRole('option', {name: 'LinkedIn'}).click();
 
     await page.locator('xpath=//input[@placeholder="Paste your Social Media Profile URL"]').fill('https://www.linkedin.com');

     await cm_loc.cancelBtn.click();
     await cm_loc.noBtn.click();
     
     await page.waitForTimeout(2000);
     await cm_loc.cancelBtn.click();
     await cm_loc.yesBtn.click();
     console.log('Social media account editing is cancelled');

})

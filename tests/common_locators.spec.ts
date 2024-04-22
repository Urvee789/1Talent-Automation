import { Locator, Page, test } from '@playwright/test'

class CommonLocators{
    page: Page;
    cancelBtn: Locator;
    myProfileBtn: Locator;
    saveBtn: Locator;
    yesBtn: Locator;
    noBtn: Locator;
    successMsg: Locator;
    unsavedPopUp: Locator;
    deleteBtn: Locator;

    constructor(page: Page){
        this.cancelBtn = page.locator('xpath=//span[contains(text(),"Cancel")]');
        this.myProfileBtn = page.locator('.mantine-1eawhj0 >> text=My Profile');
        this.saveBtn = page.locator('xpath=//span[contains(text(),"Save")]');
        this.yesBtn = page.locator('xpath=//span[contains(text(),"Yes")]');
        this.successMsg = page.locator('xpath=//div[contains(text(),"Success")]');
        this.unsavedPopUp =  page.locator('xpath=//div[contains(text(),"Unsaved Changes")]');
        this.deleteBtn = page.locator('xpath=//span[contains(text(),"Delete")]');
        this.noBtn = page.locator('xpath=//span[contains(text(),"No")]');
    }
}
export default CommonLocators;
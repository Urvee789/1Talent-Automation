import {Page, Locator} from '@playwright/test'



class HelperBase{
    page: Page;
    pageURL: string;
    email: Locator;
    password: Locator;
    nextBtn: Locator;
    signIn: Locator;
    userProfile: Locator;
    logoutBtn: Locator;
    aboutMeDesc: string;

    constructor(page: Page){
        this.page = page;
        this.email = page.locator('#i0116');
        this.password = page.locator('#i0118');
        this.nextBtn = page.locator('.win-button >> text=Next');
        this.signIn = page.locator('.win-button >> text=Sign in');
        this.userProfile = page.locator('xpath=//div[@title="User Profile"]');
        this.logoutBtn = page.locator('xpath=//div[normalize-space()="Logout"]');
        this.aboutMeDesc = "As an accountant, I've helped my company manage and optimize its financial operations. My experience and education have enabled me to provide unparalleled insight into the company's fiscal performance, which worked to expand revenue by $560,000 in two years. My affinity for numbers, dedication and attention to detail can help me improve your company's financial performance and enhance your fiscal achievements. As an accountant, I've helped my company manage and optimize its financial operations. My experience and education have enabled me to provide unparalleled insight into the company's fiscal performance, which worked to expand revenue by $560,000 in two years. My affinity for numbers, dedication and attention to detail can help me improve your company's financial performance and enhance your fiscal achievements. As an accountant, I've helped my company manage and optimize its financial operations. My experience and education have enabled me to provide unparalleled insight into the company's fiscal performance, which worked to expand revenue by $560,000 in two years. My affinity for numbers, dedication and attention to detail can help me improve your company's financial performance and enhance your fiscal achievements.";
        
    }
    
    async navigate(){
        // await this.page.goto('https://kind-sea-081d87a00.2.azurestaticapps.net/home'); //QA
        await this.page.goto('https://1talent.1rivet.com/'); //PROD
        
    }
    async loginAsEmployee(){
        await this.navigate();
        await this.email.fill('devanshi.patel@1rivet.com');
        // await this.email.fill('urvi.talekar@1rivet.com');
        await this.nextBtn.click();
        await this.password.fill('2526@Dgp');
        // await this.password.fill('Flax@2023');
        await this.signIn.click();      
        console.log('Employee role is logged in');

    }

    async loginAsHR(){
        await this.navigate();
        await this.email.fill('1talent.hr@1rivet.com');
        await this.nextBtn.click();
        await this.password.fill('fW959#OnSF@EtuUo');
        await this.signIn.click();      
        console.log('HR role is logged in');
    }

    async loginAsManager(){
        await this.navigate();
        await this.email.fill('1talent.mg@1rivet.com');
        await this.nextBtn.click();
        await this.password.fill('j#LM*rg#lm29P2Lr');
        await this.signIn.click();
       
        console.log('Manager role is logged in');
    }

    async logout(){
        await this.userProfile.click();
        this.page.waitForTimeout(1000);
        await this.logoutBtn.click();
    }



}

export default HelperBase;
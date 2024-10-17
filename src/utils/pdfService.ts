import ejs from 'ejs';
import puppeteer from 'puppeteer';
import { logger } from './logger';

interface EJSTemplateReturn {
    htmlString: string;
}

export const renderEjsTemplate = async (templatePath: string, data: any): Promise<EJSTemplateReturn> => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, data, (err, str) => {
            if (err) reject(err);
            else return resolve({ htmlString: str });
        });
    });
};

interface PDFResponse {
    success: boolean;
    error: boolean;
}

// Function to generate PDF
export const generatePDFFromTemplate = async (templatePath: string, data: any, outputPath: string): Promise<PDFResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({
                executablePath: '/usr/bin/google-chrome',
                headless: true,
                ignoreDefaultArgs: ['--disable-extensions'],
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
            const page = await browser.newPage();

            // Render the EJS template
            const { htmlString } = await renderEjsTemplate(templatePath, data);

            // Set the HTML content of the page
            await page.setContent(htmlString);

            // Generate PDF
            await page.pdf({ path: outputPath, format: 'A4' });

            await browser.close();

            return resolve({ success: true, error: false });
        } catch (error: any) {
            logger.error(`generatePDFFromTemplate => ${error.message}`);
            return resolve({ success: false, error: true });
        }
    });
};

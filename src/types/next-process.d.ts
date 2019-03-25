// tslint:disable: no-namespace interface-name
declare namespace NodeJS {
    interface Process {
        // Indicates if the process is running on the server or the browser
        browser: boolean;
    }
}

declare module "*.html" {
    const value: string;
    export default value;
}

declare module "*.txt" {
    const content: string;
    export default content;
}

declare module "*.css";

declare module "*.json" {
    const content: any;
    export default content;
}
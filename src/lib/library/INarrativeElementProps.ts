import { IDeclaration, IDeclarationRef, IModule, IModuleRef, INarrativeElement  } from "../../context/LibraryClient/objects";

export interface INarrativeElementProps extends IExpansionProps {
    children: INarrativeElement;
}

export interface IModuleElementProps extends IExpansionProps {
    children: IModuleRef;
}

export interface IDeclarationElementProps extends IExpansionProps {
    children: IDeclarationRef | IDeclaration;
}


export interface IExpansionProps {
    // tells the parent to start pre-loading an element
    preloadModule(id: string, urgent: boolean): void;

    // tells the parent to start pre-loading a declaration
    preloadDeclaration(id: string, urgen: boolean): void;

    // function to check if an element should be expanded
    isModuleExpanded(id: string): boolean;

    // function to check if a declaration should be expanded
    isDeclarationExpanded(id: string): boolean;

    // function to toggle the expansion of a given element
    toggleModuleExpansion(id: string): void;

    // function to toggle expansion of a given declaration
    toggleDeclarationExpansion(id: string): void;

    // function to retrieve data of a specific module
    getModule(id: string): IModule | undefined;

    // function to retrieve data of a specific declaration
    getDeclaration(id: string): IDeclaration | undefined;
}


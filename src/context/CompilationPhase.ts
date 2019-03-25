/**
 * The compilation phase in which we are
 */
export enum CompilationPhase {
    EXPORT = 0,
    PRODUCTION_BUILD = 1,
    PRODUCTION_SERVER = 2,
    DEVELOPMENT_SERVER = 3,
}

export default CompilationPhase;

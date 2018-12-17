declare module "next-server/dynamic" {
    declare function dynamic<P>(
        options: (AsyncComponent<P> | (() => AsyncComponent<P>)) | NextDynamicOptions<P>
    ): DynamicComponent<P>;

    declare function dynamic<P>(
        asyncModule: AsyncComponent<P> | (() => AsyncComponent<P>),
        options: NextDynamicOptions<P>,
    ): DynamicComponent<P>;
    export { dynamic as default };
}

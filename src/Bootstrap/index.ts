export default async function (configURL?: string) {
    const [
        notice,
        config,
    ] = await Promise.all([
        import("./notice").then(d => d.default),
        import("./config").then(d => d.default),
    ]);

    // log the notice
    notice();

    return config(configURL);
}

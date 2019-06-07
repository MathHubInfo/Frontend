// tslint:disable-next-line:export-name
export async function translations(language: string) {
    const footer = await import(`./${language}/footer.json`);
    const header = await import(`./${language}/header.json`);
    const action = await import (`./${language}/actionheader.json`);
    const library = await import (`./${language}/library.json`);
    const dict = await import (`./${language}/dictionary.json`);

    return {...footer, ...header, ...action, ...library, ...dict};
}


const dictionaries: any = {
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
  ar: () => import('../../dictionaries/ar.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: string) => {

    // Filter out the region code from the locale (e.g., -US in en-US)
    const filteredLocale = locale.split('-')[0];

    // If the filtered locale is not found in dictionaries, default to 'en'
    if (!dictionaries[filteredLocale] || typeof dictionaries[filteredLocale] !== 'function') {
        console.warn(`Locale '${filteredLocale}' not found, defaulting to 'en'`);
        return dictionaries['en']();
    }
    
    return dictionaries[filteredLocale]()
}
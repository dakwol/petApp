export const isPhoneInText = (text:string) => {
    var telephoneNumberRegex = /\b((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}\b/i;
    console.log('=========================================')
    console.log('isPhone: ', telephoneNumberRegex.test(text), 'text: ', text)
    return telephoneNumberRegex.test(text);
}
export const isUrlInText = (text:string) => {
    var urlRegex = /\b(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})\b/i;
    console.log('isUrl: ', urlRegex.test(text), 'text: ', text)
    return urlRegex.test(text);
}
export const isEmailInText = (text:string) => {
    var emailRegex = /\b(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\b/i;
    console.log('isEmail: ', emailRegex.test(text), 'text: ', text)
    return emailRegex.test(text);
}
export const isCardInText = (text:string) => {
    var unionPayCardRegex = /\\b(62\d{2}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?)\b/i;
    var visaCardRegex = /\b4[0-9]{12}(?:[0-9]{3})?\b/i;
    var visaMasterCardRegex = /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})\b/i;
    var masterCardRegex = /\b(5[1-5]\d{2}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?|2(22[1-9](\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?|2[3-9]\d{2}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))\b/i;
    var MIRRegex = /\b2\d{3}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?\d{4}(\s|-)?\b/i;
    console.log('isCard: ', unionPayCardRegex.test(text) || visaCardRegex.test(text) || visaMasterCardRegex.test(text) || masterCardRegex.test(text) || MIRRegex.test(text), 'text: ', text)
    console.log('=========================================')
    return unionPayCardRegex.test(text) || visaCardRegex.test(text) || visaMasterCardRegex.test(text) || masterCardRegex.test(text) || MIRRegex.test(text);
}

export const capitalizeFirstLetter = (str:string) => {
    if(str != null && str.length > 0 && str != undefined) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
        return str;
    }
}

export const filenameFromUrl = (str: string | undefined) => {
    if(str) {
        return str.substring(str.lastIndexOf('/')+1);
    } else {
        return '';
    }
}

export const extensionFromUrl = (str: string | undefined) => {
    if(str) {
        return str.substring(str.lastIndexOf('.')+1);
    } else {
        return '';
    }
}

export const showFirstChars = (str: string, chars: number) => {
    if(str) {
        let output = str;
        if (str.length > chars)
        {
            output = str.substring(0, (chars-2)) + '...';
        }
        return output;
    } else {
        return '';
    }
}

export const getTextReviews = (reviews: number) => {
    return getTextFromNumber(reviews, ' отзыв',' отзыва', ' отзывов')
}

export const getTextFromNumber = (lengthDate: any, text1: string, text2: string, text3: string) => {
    if     (lengthDate == 0) { return lengthDate + text3; }
    if     (lengthDate == 1) { return lengthDate + text1; }
    else if(lengthDate < 5)  { return lengthDate + text2; }

    return lengthDate + text3
}


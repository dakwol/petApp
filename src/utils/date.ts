export const getDateFromText = (myTask:any, lengthDate: any, text1: string, text2: string, text3: string, text4: string, text5: string, text6: string, text7: string) => {
    if(myTask){
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month

        let Ddd = '';
        Ddd = ('0' + month + '0' + date)

        let dateTask = (lengthDate.created_at.split('T')[0]).replace(/-+/g, '').slice(4);

        if(Number(Ddd) != dateTask){
            if(Ddd > dateTask){
                let dateLost = Number(Ddd) - dateTask;
                if(dateLost == 1){
                    return dateLost.toString() + text1;
                } else if(dateLost < 5){
                    return dateLost.toString() + text2;
                } else if(dateLost <= 7){
                    return (dateLost.toString() + text3)
                } else if(dateLost < 14){
                    return text4
                } else if(dateLost < 21){
                    return text5
                } else if(dateLost < 31){
                    return text6
                } else {
                    return text7
                }
            }
        }
        else {
            return lengthDate.created_at.split('T')[0]
        }
    } else {
        return 'сегодня'
    }
}

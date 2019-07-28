import Vue from 'vue'
// 时间戳长度统一为 13的数字类型
const $_setTimeLength = (time)=>{
    if(!time){
        return
    }
    return   time.toString().length!==13?Number(time*1000):Number(time)
}
/**
 *  日期时间类
 * */
export default class Funs {
    /**
     * 获取日期 : 默认为当前日期  YYYY-MM-DD
     *      参数会与当前时间相计算
     * */
    static getNowDate(year,month,day){
        let date = new Date()
        if(year){
            date.setFullYear(date.getFullYear() + year);
        }
        if(month){
            date.setMonth(date.getMonth() + month);
        }
        if(day){
            date.setDate(date.getDate() + day);
        }

        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
    }

    /**
     * 根据时间戳获取天数
     *  startTime : 开始时间戳
     *  endTime   : 结束时间戳
     * */
    static timestampGetDay(startTime, endTime){

        return `${($_setTimeLength(endTime) - $_setTimeLength(startTime)) / (24 * 3600)/1000}天`
    }
    /**
     * 根据 yyyy-mm-dd 获取天数
     *  startTime : 开始时间戳
     *  endTime   : 结束时间戳
     * */
    static getDays(date1, date2){
        let date1Str = date1.split("-");//将日期字符串分隔为数组,数组元素分别为年.月.日
        //根据年 . 月 . 日的值创建Date对象
        let date1Obj = new Date(date1Str[0], (date1Str[1] - 1), date1Str[2]);
        let date2Str = date2.split("-");
        let date2Obj = new Date(date2Str[0], (date2Str[1] - 1), date2Str[2]);
        let t1 = date1Obj.getTime();
        let t2 = date2Obj.getTime();
        let dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数
        let minusDays = Math.floor(((t2 - t1) / dateTime));//计算出两个日期的天数差
        let days = Math.abs(minusDays);//取绝对值
        return days;
    }
    /**
     * 根据时间戳转换yyyy-mm-dd
     *  Time : 时间戳
     * */
    static getFormattingTime(time){
        return new Date($_setTimeLength(time)).toLocaleDateString().replace(/\//g, '-',)
    }
    


}

Vue.prototype.$funs = Funs;
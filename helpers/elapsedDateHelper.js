const moment=require('moment')
const elapsed=(startdate)=>{
    // let time=elapsed("20220910") //!call function like this
    const elapesdList=[]
    const duration=moment().diff(moment(startdate))/1000
    const periodInterval={
        days:{label:'d',value:Math.floor(duration/(24*3600))},
        hours:{label:'h',value:Math.floor((duration%(24*3600))/3600)},
        minutes:{label:'m',value:Math.floor((duration%(24*3600*3600))/60)},
        seconds:{label:'s',value:Math.floor((duration%(24*3600*3600*60))/60)}
    }
  for(const period of Object.keys(periodInterval)){
    if(periodInterval[period].value > 0){
        elapesdList.push(
          periodInterval[period].value + periodInterval[period].label
        );
    }
  }
    return elapesdList.join(" ")
}

module.exports={elapsed}
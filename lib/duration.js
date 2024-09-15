export function duration(seconds){
    let minutes = Math.floor(seconds / 60)
    if(minutes >= 60){
      let hour = Math.floor(minutes / 60)
      let minutesFormat = Math.floor(seconds % 60)
      const array =  [hour,minutesFormat,Math.floor(seconds%60)]
      return array.join(':')
    }else{
      let secondFormat = Math.floor(seconds % 60)
      const array = [minutes,secondFormat]
      return array.join(':')
    }
    
  }
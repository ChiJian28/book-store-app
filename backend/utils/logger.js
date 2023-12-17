const logger = {
    info: (...params) => {    //...params 把参数打包成一个数组
      console.log(...params);
    },
    error: (...params) => {
      console.error(...params);
    },
  };
  
  export default logger;
  
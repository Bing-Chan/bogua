/**
 * 
 * @param {*} item
 * @description 将字符串中的大写数字替换成小写数字 
 * @returns 
 */
 export function replaceUpToLo(item: any) {
    const strArr = item.split('');
    const str:any = [];
    strArr.forEach((e: any) => {
      switch (e) {
        case '零':
          str.push(0);
          break;
        case '〇':
          str.push(0);
          break;
        case '一':
          str.push(1);
          break;
        case '二':
          str.push(2);
          break;
        case '三':
          str.push(3);
          break;
        case '四':
          str.push(4);
          break;
        case '五':
          str.push(5);
          break;
        case '六':
          str.push(6);
          break;
        case '七':
          str.push(7);
          break;
        case '八':
          str.push(8);
          break;
        case '九':
          str.push(9);
          break;
        default:
          str.push(e);
          break;
      }
    });
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '十') {
        if (isNumber(str[i - 1]) && isNumber(str[i + 1])) {
          str.splice(i, 1);
        } else if (isNumber(str[i - 1])) {
          str[i] = 0;
        } else if (isNumber(str[i + 1])) {
          str[i] = 1;
        } else {
          str[i] = 10;
        }
      }
    }    
    return str.join('')
}
/**
 * 判断数字
 */
 export function isNumber(value: any) {
    const reg = /^[0-9]+(.[0-9]+)?$/
    return reg.test(value)
  }
  /**
 * 数字加千分号
 */
export function addSemicolon(n: any) {
    if(!n) return n;
    const str: string = n.split('.');
    const re: any = /\d{1,3}(?=(\d{3})+$)/g;
    const n1: any = str[0].replace(re, "$&,");
    return str.length > 1 && str[1] ? `${n1}.${str[1]}` : `${n1}.00`;
  }
  /**
   * 数字去千分号
   */
   export function delSemicolon(num: any) {
    if(!num) return num;
    num = num.toString();
    num = num.replace(/,/gi, '');
    return num;
  }
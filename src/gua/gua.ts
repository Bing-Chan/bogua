/***
 * title:文王喊你来卜卦
 * author:Bing.Chen
 * By 2021.04.26
 *  */ 

import {GuaChart, GuaNumber,guaDictUp,guaDictDown} from './config'

export default class Gua {
	  // 字段
	state:any
	constructor() {
	  this.state = {
		angles: [0, 0, 0],
		flipDisabled: '',
		guas: [],
		flipDeg: 4320,
		result:null
	  };
	}
	start(){
		while(this.state.guas.length<7)
		{
			this.radom()
			this.handleGua()
		}
		return this.state.result;
	}
	radom(){
		this.state.angles=[0,0,0]; //重置随机位
		let angles :number[]=[];
		this.state.angles.forEach((value, index) => {
			const rnd = Math.random();
			const totalDeg = value + this.state.flipDeg + (rnd > 0.5 ? 180 : 0);
			angles[index] = totalDeg;
		  });
		this.state.angles=angles;
	}
	handleGua(){
		//开始摇卦
		console.log('玛尼玛尼哄: ');
		const self = this;
		const guas = self.state.guas;
		self.state.guas.push(self.getGua());
		if (self.state.guas.length < 6) {
		// 卦还没出全，继续出
		this.state.flipDisabled='';
		} else {
			// 卦已出完，需得出卦的结果。 那个卦，有哪几个变卦。
			this.state.result = self.getResult();
		}
	}

	getResult() {
	  const self = this;
	  const changeGuas :number[]= [];
	  const guas = self.state.guas;
	  if (guas.length < 6) {
		return null;
	  }
	  guas.forEach((val, idx, array) => {
		if (val === 0 || val === 3) {
			changeGuas.push(idx);
		  }
	})
	console.log('change guas: ' + changeGuas);
  
	// 计算卦的索引，111对应乾卦。000对应坤卦，索引转为10进制。
	const upGuaIndex = (guas[5] > 1 ? 4 : 0) + (guas[4] > 1 ? 2 : 0) + (guas[3] > 1 ? 1 : 0);
	const downGuaIndex = (guas[2] > 1 ? 4 : 0) + (guas[1] > 1 ? 2 : 0) + (guas[0] > 1 ? 1 : 0);
  
	const guaIndex = GuaNumber[upGuaIndex][downGuaIndex];
	const guaName = GuaChart[guaIndex - 1];
  
	let guaName2;
	if (upGuaIndex === downGuaIndex) {
		// 上下卦相同，格式为X为X
		guaName2 = guaDictUp[upGuaIndex] + '为' + guaDictDown[upGuaIndex];
	} else {
		guaName2 = guaDictDown[upGuaIndex] + guaDictDown[downGuaIndex] + guaName;
	}
  
	console.log('upGuaIndex: ' + upGuaIndex + ', downGuaIndex: ' + downGuaIndex);
	const guaDiscription = guaDictUp[upGuaIndex] + '上' + guaDictUp[downGuaIndex] + '下';
	const guaDiscription2 = '上' + guaDictUp[upGuaIndex] + '下' + guaDictUp[downGuaIndex];
	console.log(guaDiscription + ' 变卦: ' + changeGuas);
	  return {
		index: guaIndex,
		name: guaName,
		name2: guaName2,
		gua: guaDiscription,
		gua2: guaDiscription2,
		change: changeGuas
	  };
	}
  
	getGua() {
	  const self = this;
	  let yangNum = 0;
	  /* eslint no-unused-vars: ["error", { "args": "none" }] */
	  self.state.angles.forEach((value, index) => {
		// eslint unused:false
		yangNum += (value % 360) > 0 ? 0 : 1;
	  });
	  return yangNum;
	}
  }


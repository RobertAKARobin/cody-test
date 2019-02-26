const style = {
	highlight: 'background-color:#ffff00; font-weight:bold',
	test: 'font-weight:bold',
	pass: '',
	fail: 'color:#f00; font-weight:bold'
}

const _test = function(description, suite){
	console.log(`%c${description}:`, style.highlight)

	const count = {
		total: 0,
		pass: 0,
		fail: 0
	}
	const _ = function(aInput, test, bInput){
		count.total += 1

		const aLog = (aInput instanceof Function ? stripFunctionText(aInput) : aInput)
		const bLog = (bInput instanceof Function ? stripFunctionText(bInput) : bInput)
		const testLog = stripFunctionText(test)
			.replace(/\ba\b/g, aLog)
			.replace(/\bb\b/g, bLog)

		let aValue, bValue, didPass, fatalError, logStyle
		try{
			aValue = (aInput instanceof Function ? aInput() : aInput)
			bValue = (bInput instanceof Function ? bInput() : bInput)
			if(test(aValue, bValue)){
				didPass = true
			}else{
				throw 'fail'
			}
		}catch(e){
			didPass = false
			if(e.message !== 'fail'){
				fatalError = e
			}
		}finally{
			if(didPass){
				count.pass += 1
				console.log(`%c${count.total}.) ${testLog}`, style.pass)
			}else{
				count.fail += 1
				console.log(`%c${count.total}.) ${testLog}`, style.fail)
				if (aInput instanceof Function || bInput instanceof Function) {
					console.log(aInput instanceof Function ? `\t${aLog}: ${aValue}` : `\t${aValue}`)
					console.log(bInput instanceof Function ? `\t${bLog}: ${bValue}` : `\t${bValue}`)
				}
			}
		}
	}

	suite(_)
	console.log(`%cFAILS: ${count.fail}`, style.fail)
	console.log(`TOTAL: ${count.total}`)
}

const stripFunctionText = function(inputFunction){
	return inputFunction
		.toString()
		.replace(/^(async )?function.*?\{/, '')
		.replace(/^.*?=>\s*\{?/, '')
		.replace(/\}$/, '')
		.trim()
}
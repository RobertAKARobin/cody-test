const style = {
	highlight: 'background-color:#ffff00',
	test: 'font-weight:bold',
	pass: 'background-color:#00ff00',
	fail: 'background-color:#ff0000; color:#ffffff'
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
		
		console.log(`%c${count.total}.) ${testLog}`, style.test)

		let aValue, bValue, testResult
		try{
			aValue = (aInput instanceof Function ? aInput() : aInput)
			bValue = (bInput instanceof Function ? bInput() : bInput)
			testResult = test(aValue, bValue)
			if(testResult === true){
				count.pass += 1
			}else{
				throw new Error()
			}
		}catch(e){
			count.fail += 1
			console.log(`\t%cFAIL`, style.fail)
			if(aInput instanceof Function || bInput instanceof Function){
				console.log(aInput instanceof Function ? `\t${aLog}: ${aValue}` : `\t${aValue}`)
				console.log(bInput instanceof Function ? `\t${bLog}: ${bValue}` : `\t${bValue}`)
			}
		}
	}

	suite(_)
	console.log(`%cTOTAL PASS: ${count.pass}`, style.pass)
	if(count.fail > 0){
		console.log(`%cTOTAL FAIL: ${count.fail} / ${count.total}`, style.fail)
	}
}

const stripFunctionText = function(inputFunction){
	return inputFunction
		.toString()
		.replace(/^(async )?function.*?\{/, '')
		.replace(/^.*?=>\s*\{?/, '')
		.replace(/\}$/, '')
		.trim()
}
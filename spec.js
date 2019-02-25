_test('3 equals 4', (_) => {
	const myA = 3
	const myB = 4
	_(()=>myA, (a, b) => a === b, ()=>myB)
	_(() => myA, (a, b) => a !== b, () => myB)
})
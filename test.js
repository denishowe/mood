const api = require('./api')

const get = re =>
	expect(api({method: 'GET'}))
		.toMatch(re)

const post = (body, re) =>
	expect(api({method: 'POST', body: body}))
		.toMatch(re)

test('API loads',	() => { expect(api).toBeDefined() })

test('OK',			() => { post({mood: 2, feeling: 'happy'},	/^OK$/)})

test('Comment',		() => { post({mood: 6, feeling: 'bored', comment: 'Mind: lost'},
								 								/^OK$/)})

test('No mood',		() => { post({},							/^mood should be/)})

test('Bad mood',	() => { post({mood: 42},					/^mood should be/)})

test('No feeling',	() => { post({mood: 2},						/^Missing feeling$/)})

test('Bad feeling', () => { post({mood: 2, feeling: 'odd'},		/^Bad feeling$/)})

const xs = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
test('Bad comment', () => { post({mood: 2, feeling: 'happy',
								  comment: xs+xs},				/^Comment >/)})

test('GET',			() => { get(								/\[\{.*mood.*\}\]/) })

const api = require('./api')

const post = (body, re) =>
	expect(api({method: 'POST', body: body}))
		.toMatch(re)

const sleep = ms => {
	const t = (new Date).getTime() + ms
	while ((new Date).getTime() < t) { }
}

test('API loads',	() => { expect(api).toBeDefined() })

const randomMood = Math.floor(1 + 7 * Math.random())
const feelings = ['depressed', 'optimistic', 'bored', 'happy']
const randomFeel = feelings[Math.floor(4 * Math.random())]
const ciNC = { mood: randomMood, feeling: randomFeel }
test('No comment',	() => { post(ciNC,			/^OK$/)})

const ciCO = { mood: 6, feeling: 'bored', comment: 'Mind: lost' }
test('Comment',		() => { post(ciCO,			/^OK$/)})

test('No mood',		() => { post({},			/^Missing mood$/)})

test('Bad mood',	() => { post({mood: 42},	/^mood should be/)})

test('No feeling',	() => { post({mood: 2},		/^Missing feeling$/)})

const ciBF = { mood: 2, feeling: 'odd' }
test('Bad feeling', () => { post(ciBF,			/^Bad feeling$/)})

const xs = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
const ciBC = { mood: 2, feeling: 'happy', comment: xs+xs }
test('Bad comment', () => { post(ciBC,			/^Comment >/)})

// Search the store for the mood we posted above

const store = api({ method: 'GET' })
test('GET',			() => { expect(store).toContainEqual(ciNC) })

// everything in /api should be considered user code; we can consider
// providing a middleware for registering apis, too that abstracts away the
// event calls, but for now we should probably just provide a guideline.
import { handleApiRequests } from './api'

import { handleStaticRequests, handleNotFound } from './static'

// This is optional; we want to encourage people to play with their
// responses if they so choose bc that's a unique feature, but it's
// completely unnecessary.
function modifyStaticResponse(response) {
	// do something with the response
	return response
}

// handleStaticRequests should deal with getting stuff out of KV
// should not require that the user declare "routing", since
// the asset manifest will have that encapsulated.
// the response handler should be optional
const myStaticHandler = handleStaticRequests(modifyStaticResponse)

let myNotFound = handleNotFound(eventHandler)

let middlewares = [
	handleApiRequests,
	myStaticHandler,
	handleNotFound,
]

// here is the larger "Router". maybe this is 8track, maybe it is our template router,
// maybe it is a thing that just adds event listeners under the hood.
// it would be great for it to be this easy.
// perhaps `handleNotFound` could be absorbed into "handleStaticRequests",
// or abstracted away into a flag that determines what to do on exceptions
// and/or cache/asset misses.
registerMiddlewares(middlewares)

function registerMiddlewares(middlewares) {
	middlewares.forEach((handler) => {
		addEventListener('fetch', handler);
	})
}

#!/usr/bin/env node
import server from "./app.mjs"

// which port to listen for HTTP(S) requests
const port = process.env.SERVER_PORT
// const port = 3000

// call a function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
  listener.close()
}

export default close;
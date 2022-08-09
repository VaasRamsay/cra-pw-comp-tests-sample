import { createServer, Response } from "miragejs";
import("./bootstrap");


// Following a similar approach to Cypress to forward requests to the proxy fn

// If your app makes requests to domains other than / (the current domain), add them
// here so that they are also proxied from your app to the handleFromCypress function.
// For example: let otherDomains = ["https://my-backend.herokuapp.com/"]
let otherDomains: string[] = [];
let methods = ["get", "put", "patch", "post", "delete"];
createServer({
    environment: "test",
    routes() {
        for (const domain of ["/", ...otherDomains]) {
            for (const method of methods) {
                // @ts-ignore
                this[method](`${domain}*`, async (schema: any, request: any) => {
                    // @ts-ignore
                    let [status, headers, body] = await window.handleFromPW(
                        request
                    )
                    return new Response(status, headers, body)
                })
            }
        }
        // If your central server has any calls to passthrough(), you'll need to duplicate them here
        // this.passthrough('https://analytics.google.com')
    },
})

export { };
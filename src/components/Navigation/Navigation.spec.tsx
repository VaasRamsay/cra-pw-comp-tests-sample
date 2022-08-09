import { test, expect } from '@playwright/experimental-ct-react';
import Navigation from '.';
import { fakeServer } from '../../api/fakes/server';
import { type Server } from 'miragejs';

let server: Server;

test.beforeEach(async ({ context }) => {
    server = fakeServer({ environment: 'test' });
    server.createList('organisation', 5);
    await context.addInitScript(() => {
        //@ts-ignore
        window.handleFromPW = function (request) {
            return fetch(request.url, {
            method: request.method,
            headers: request.requestHeaders,
            body: request.requestBody,
            }).then((res) => {
                //@ts-ignore
            let content = res.headers.get("content-type").includes("application/json")
                ? res.json()
                : res.text()
            return new Promise((resolve) => {
                content.then((body) => resolve([res.status, res.headers, body]))
            })
            })
        };
    });
});


test.afterEach(async () => {
    server.shutdown();
});

test("it renders", async ({ mount, page }) => {
    const component = await mount(<Navigation
        setSearchValues={() => {}}
        showDropDownMenu={false}
        setshowDropDownMenu={() => {}}
    />);
    await expect(component).toContainText('Audit log');
})

test("dropdown expanded", async ({ mount, page }) => {
    const component = await mount(<Navigation
        setSearchValues={() => {}}
        showDropDownMenu={true}
        setshowDropDownMenu={() => {}}
    />);
    await expect(component).toContainText('Audit log');
})
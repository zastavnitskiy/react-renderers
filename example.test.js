import React from "react";
import Button from "./Button";
import Input from "./Input"
import { render, mount, shallow } from "enzyme";

import toJson from "enzyme-to-json";
import TestRenderer from "react-test-renderer";
import ReactDOMServer from 'react-dom/server';
import prettier from "prettier";

const tests = [
    {
        name: "enzyme-static-renderer",
        render: render,
        serialize: wrapper => wrapper.html()
    },
    {
        name: "enzyme-mount-renderer",
        render: mount,
        serialize: wrapper => wrapper.html()
    },
    {
        name: "enzyme-shallow-renderer",
        render: shallow,
        serialize: wrapper => wrapper.html()
    },
    {
        name: "enzyme-static-renderer enzyme-to-json",
        render: render,
        serialize: wrapper => toJson(wrapper, { mode: "deep" })
    },
    {
        name: "enzyme-mount-renderer enzyme-to-json",
        render: mount,
        serialize: wrapper => toJson(wrapper, { mode: "deep" })
    },
    {
        name: "enzyme-shallow-renderer enzyme-to-json",
        render: shallow,
        serialize: wrapper => toJson(wrapper, { mode: "deep" })
    },
    {
        name: "react-test-renderer",
        render: TestRenderer.create,
        serialize: wrapper => wrapper
    },
    {
        name: "react-test-renderer toJSON",
        render: TestRenderer.create,
        serialize: wrapper => wrapper.toJSON()
    },
    {
        name: "react-test-renderer toTree",
        render: TestRenderer.create,
        serialize: wrapper => wrapper.toTree()
    },
    {
        name: "reactDOMServer.renderToStaticMarkup",
        render: ReactDOMServer.renderToStaticMarkup,
        serialize: wrapper => wrapper
    },
    {
        name: "reactDOMServer.renderToStaticMarkup + prettier",
        render: ReactDOMServer.renderToStaticMarkup,
        serialize: wrapper => prettier.format(wrapper)
    },
];

const examples = [
    {
        exampleName: "button",
        content: <Button>Hello</Button>
    },
    {
        exampleName: "input",
        content: (
            <div className="b-container">
                <Input defaultValue="Type here" buttonText="Send" />
            </div>
        )
    }
];

examples.forEach(({ exampleName, content }) => {
    tests.forEach(({ name, render, serialize }) => {
        test(`${exampleName} - ${name}`, () => {
            expect(serialize(render(content))).toMatchSnapshot();
        });
    });
});

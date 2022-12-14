import React from "react";
import { createRoot } from "react-dom/client";
import ReactDom from "react-dom";
import {App} from "./App";

const homeContailer = document.getElementById("root");
ReactDom.hydrate(<App tab='name'/>,homeContailer);
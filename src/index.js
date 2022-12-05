import React from "react";
import { createRoot } from "react-dom/client";
import {App} from "./App";

const homeContailer = document.getElementById("root");
const root = createRoot(homeContailer);

root.render(<App tab='name'/>)
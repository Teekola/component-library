import { createGlobalStyle } from "styled-components";
import defaultResets from "./defaultResets";
import text from "./text";

const GlobalStyle = createGlobalStyle`
	${defaultResets}
	${text}
`;

export default GlobalStyle;

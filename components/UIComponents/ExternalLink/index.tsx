import { ComponentProps, PropsWithChildren } from "react";
import styles from "./a.module.css";

interface Props extends ComponentProps<"a"> {}

const ExternalLink = ({ children, ...props }: PropsWithChildren<Props>) => (
   <a className={styles.a} {...props}>
      {children}
   </a>
);
export default ExternalLink;

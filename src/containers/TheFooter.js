import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a
          href="https://www.webhopers.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Webhopers
        </a>
        <span className="ml-1">&copy; 2020 All rights reserved.</span>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);

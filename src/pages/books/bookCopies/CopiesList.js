import React from "react";
import { PanelGroup } from "rsuite";
import CopiesCard from "./CopiesCard";
import { useCopies } from "./CopiesProvider";

const CopiesList = () => {
   const { copies } = useCopies();
   return (
      <div>
         <PanelGroup accordion bordered defaultActiveKey={1} className="m-1">
            {copies &&
               copies.map((copy, index) => (
                  <CopiesCard key={index} copy={copy} index={index} />
               ))}
         </PanelGroup>
      </div>
   );
};

export default CopiesList;

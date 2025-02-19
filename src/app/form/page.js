import React from "react";
import PriceCalculation from "./priceCalculation";
import TabService from "./serviceTab";

const page = () => {
  return (
    <div>
      {/* <PriceCalculation />
       */}
      <TabService serviceTypeId={"5f1b17ac-1bb6-4bda-b747-a6b1fab95287"} />
    </div>
  );
};

export default page;

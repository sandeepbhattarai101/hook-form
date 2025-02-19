"use client";

import React, { useEffect, useState } from "react";

import { useGetRequest } from "../(app)/components/common/services/globalSetting";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import PriceCalculation from "./priceCalculation";

const TabService = ({ serviceBody = null, serviceTypeId }) => {
  const [activeTab, setActiveTab] = useState("generalInformation");
  const [serviceDataResponse, setServiceDataResponse] = useState({});

  const router = useRouter();

  const searchParams = useSearchParams();
  const serviceId = "77ea6290-3e73-467b-b05c-3f58a9b4011c";

  console.log("yaha id ayo", serviceId);

  const {
    data: serviceData,
    isLoading: isServiceLoading,
    refetch: refetchService,
  } = useGetRequest(
    `service-type/${serviceTypeId}/service/${
      serviceDataResponse?.id || serviceId
    }`,
    `service-${serviceId || serviceDataResponse?.id}`
    // false
  );

  const {
    data: calculationList,
    isError: isCalculationListError,
    isLoading: isCalculationListLoading,
    refetch: refetchCalculationList,
  } = useGetRequest(
    `/service/${serviceId ? serviceId : serviceDataResponse?.id}/calculation`,
    `calculations-${serviceId ? serviceId : serviceDataResponse?.id}`,
    false
  );

  console.log("serviceData ", serviceDataResponse);
  useEffect(() => {
    if (serviceId) {
      refetchService();
      setServiceDataResponse(serviceData?.data?.data);
    }
    if (serviceBody?.id || serviceId) {
      refetchCalculationList();
    }
  }, [serviceId, serviceBody?.id]);

  const RenderPriceAndCalculation = () => {
    if (serviceBody?.id) {
      return (
        <>
          {isCalculationListError ? (
            <p>error</p>
          ) : isCalculationListLoading ? (
            <div className="my-4 flex flex-col gap-6">load</div>
          ) : (
            <>
              {console.log("where is it")}
              <PriceCalculation
                serviceId={serviceId}
                calculationList={calculationList?.data?.data}
                serviceBody={serviceBody}
                refetchCalculationList={refetchCalculationList}
              />
            </>
          )}
        </>
      );
    }
    return (
      // FOR ADDING

      <PriceCalculation
        serviceId={serviceId}
        calculationList={calculationList?.data?.data}
        serviceDataResponse={serviceDataResponse}
        refetchCalculationList={refetchCalculationList}
      />
    );
  };
  console.log("servicedata", serviceData?.data);
  return (
    <div className="border border-gray-200  overflow-y-auto custom-scrollbar  bg-white rounded-md flex flex-col">
      {isServiceLoading ? (
        <div className="my-4 flex flex-col gap-6">
          service load bhai rako cha hai
        </div>
      ) : (
        <PriceCalculation
          serviceId={serviceId}
          calculationList={calculationList?.data?.data}
          serviceBody={serviceBody}
          refetchCalculationList={refetchCalculationList}
        />
      )}

      {activeTab === "priceCalculation" && (
        <RenderPriceAndCalculation serviceId={serviceId} />
      )}
    </div>
  );
};

export default TabService;

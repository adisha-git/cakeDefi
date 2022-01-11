import React, { useContext, useEffect, useState } from "react";
import { ActiveMasterNodesContext } from "../../contexts/activeMasterNodes-context";
import "./HomePage.scss";
import assets from "../../common/Assets";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { fetchData } from "../../utils/axiosService";
import PieChart from "../../components/PieChart";

export const HomePage = () => {
  const assetsResult = useContext<any>(ActiveMasterNodesContext);
  // const [assetsData, setAssetsData] = useState(assetsResult);
  const [chartData, setChartData] = useState<any>([]);
  const [allDefiAssets, setAllDefiAssets] = useState<number>(0);
  const [allDashAssets, setDashAssets] = useState<number>(0);
  const [activeDefiDashNodes, setActiveDefiDashNodes] = useState<any>({});

  useEffect(() => {
    if (assetsResult && assetsResult?.activeMasterNode?.length > 0) {
      setAssetsData();
    }
  }, [assetsResult]);

  const setAssetsData = () => {
    let assestsDeFiAmountSum = 0;
    let assestsDashDataSum = 0;
    assetsResult?.activeMasterNode.forEach((assestsNode: any) => {
      if (assestsNode.status === "ACTIVE") {
        if (assestsNode.coin === "DeFi") {
          assestsDeFiAmountSum +=
            20000 + parseFloat(assestsNode?.lastReward?.amount?.amount);
        } else if (assestsNode.coin === "Dash") {
          assestsDashDataSum +=
            10000 + parseFloat(assestsNode?.lastReward?.amount?.amount);
        }
      }
    });
    const numberofActiveDashNodes = assetsResult?.activeMasterNode.reduce(
      function (count: { defi: 0; dash: 0 }, node: any) {
        if (node.status == "ACTIVE" && node.coin === "DeFi") {
          count["defi"]++;
        } else if (node.status == "ACTIVE" && node.coin === "Dash") {
          count["dash"]++;
        }
        return count;
      },
      { defi: 0, dash: 0 }
    );
    setActiveDefiDashNodes(numberofActiveDashNodes);
    console.log("numberofActiveDashNodes", activeDefiDashNodes);
    setUsdValueDefiDash(assestsDeFiAmountSum, assestsDashDataSum);
  };

  const setUsdValueDefiDash = async (
    assestsDeFiAmountSum: number,
    assestsDashDataSum: number
  ) => {
    setChartData([assestsDeFiAmountSum, assestsDashDataSum]);
    setAllDefiAssets(assestsDeFiAmountSum);
    setDashAssets(assestsDashDataSum);
    const assestsDeFiDataSumUSD = await fetchData({
      type: "GET",
      url: "",
      payload: {},
    });
    const assestsDashDataSumUSD = await fetchData({
      type: "GET",
      url: "",
      payload: {},
    });
  };

  // console.log(chartData, "chartData");

  return (
    <div className="homeWrapper">
      <div className="main">
        {/* Banner Wrapper */}
        <div className="bannerWrapper">
          <div className="bannerContainer">
            <div className="bannerCaption">
              <div className="bannerHeading">
                Masternode assets under management.
              </div>
              <p className="bannerCaptionText">
                See the USD value of all active Dash assets & DeFiChain assets.
              </p>
              <p className="bannerCaptionText">
                Compare the value of Dash and DeFiChain AUM
              </p>
              <div className="browseCoinsBtn">
                <Button btnText={"Browse Coins"} />
              </div>
            </div>
            <div className="">
              <img
                src={assets.bannerImage}
                alt="bannerImage"
                className="bannerImage"
              />
            </div>
          </div>
        </div>
        {/* End of banner wrapper */}

        <div className="usdValuesWrapper">
          <div className="usdValuesContainer">
            <div className="headingDefi">USD Values of DeFi & Dash Coins</div>
            <div className="usdValDefiDash">
              <div className="defiUsdValDiv">
                <Card>
                  <div className="defiContentWrapper">
                    <div className="dfiNameContainer">
                      <div className="dfiName">
                        DeFi<span className="dfi">DFI</span>
                      </div>
                      <img src={assets.defiIcon} alt="defiIcon" />
                    </div>
                    <div className="usdValueText">
                      USD value of all active DeFiChain assets
                    </div>
                    <div className="usdValue">{allDefiAssets}</div>
                    <div className="usdValueText">Active DeFi nodes</div>
                    <div className="usdValue">
                      {activeDefiDashNodes.defi}{" "}
                      <span className="activeIcon"></span>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="dashUsdValDiv">
                <Card>
                  <div className="defiContentWrapper">
                    <div className="dfiNameContainer">
                      <div className="dfiName">
                        Dash<span className="dfi">Dash</span>
                      </div>
                      <img src={assets.dashIcon} alt="defiIcon" />
                    </div>
                    <div className="usdValueText">
                      USD value of all active Dash assets
                    </div>
                    <div className="usdValue">{allDashAssets}</div>
                    <div className="usdValueText">Active Dash nodes</div>
                    <div className="usdValue">
                      {activeDefiDashNodes.dash}{" "}
                      <span className="activeIcon"></span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="totalAssetsAumWrapper">
              <Card>
                <div className="totalAssetsAumContainer">
                  <div className="usdValueText">
                    Total Active Assets Under Management
                  </div>
                  <div className="usdValue">
                    {activeDefiDashNodes.defi + activeDefiDashNodes.dash}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="pieChartWrapper">
            <div className="headingDefi">DeFi vs Dash</div>
            <div className="pieChartConatiner">
              <PieChart data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import HeroLayout1 from "../../ui-components/HeroLayout1";
import HeroLayout2 from "../../ui-components/HeroLayout2";
import Features2x2 from "../../ui-components/Features2x2";
import MarketingPricing from "../../ui-components/MarketingPricing";
import MarketingFooterBrand from "../../ui-components/MarketingFooterBrand";
import { useState, useEffect } from "react";
import { Analytics } from "aws-amplify";
import { Storage } from "aws-amplify";
import heroImg from "../../assets/isometric-idea-for-business-success-1.gif";

export function Home() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    setStartTime(new Date());
    return () => setEndTime(new Date());
  }, []);

  useEffect(() => {
    if (startTime && endTime) {
      const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
      Analytics.record({
        name: "timeOnHomePage",
        attributes: { timeOnPage: seconds },
      });
    }

    Analytics.autoTrack("session", {
      enable: true,
      attributes: {
        page: "Home",
      },
    });

    Analytics.autoTrack("pageView", {
      enable: true,
      eventName: "pageView",
      type: "singlePageApp",
      provider: "AWSPinpoint",
      getUrl: () => {
        return window.location.origin + window.location.pathname;
      },
    });
  }, [endTime]);

  const [heroGif, setHeroGif] = useState(null);

  useEffect(() => {
    Storage.get("6091df4d8c560993596787ef0278551d2d87b362.png", {
      level: "public",
    })
      .then((result) => {
        setHeroGif(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <HeroLayout1 width={"100%"} heroGif={heroImg} />
      <HeroLayout2 width={"100%"} />
      <Features2x2 width={"100%"} />
      <MarketingPricing width={"100%"} />
      <MarketingFooterBrand width={"100%"} />
    </View>
  );
}

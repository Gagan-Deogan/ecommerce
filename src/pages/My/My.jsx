import { Routes, Route } from "react-router-dom";
import { BetterRoute } from "common-components/BetterRoute";
import { Hidden } from "common-components/Hidden";
import { Profile } from "./Profile";
import { Sidebar } from "./Sidebar";
import { Orders } from "./Orders";
import { Addresses } from "./Addresses";
import { PageNotFound } from "pages/PageNotFound";
export const My = () => {
  return (
    <>
      <section className="row sm-column align-start justify-center w12 padding-16 padding-t-32">
        <Hidden hideAt="sm-down">
          <Sidebar />
        </Hidden>
        <Routes>
          <BetterRoute type="PROTECTED" path="/" element={<Profile />} />
          <BetterRoute type="PROTECTED" path="/orders" element={<Orders />} />
          <BetterRoute
            type="PROTECTED"
            path="/addresses"
            element={<Addresses />}
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </section>
    </>
  );
};

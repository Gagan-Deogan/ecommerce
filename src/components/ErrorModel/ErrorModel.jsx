import { useState } from "react";
import { Model } from "../Model";
export const ErrorModel = () => {
  return (
    <Model isOpenModel={true} className="justify-center align-center">
      <div className="model sm-w9 md-w5 w4 bor-rad-4 box-shd">
        <h3>Something went worng,</h3>
        <p>Please try Again Later</p>
        <div className="row justify-end align-end">
          <button className="sm-btn-pry-fil margin-t-32">Retry</button>
        </div>
      </div>
    </Model>
  );
};

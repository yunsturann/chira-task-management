import React from "react";

const PageLoading = () => {
  return (
    <div className="absolute inset-0 h-screen w-screen bg-black/20 flex items-center justify-center ">
      <div className="w-20 h-20 rounded-full animate-spin border-2 border-solid border-blue-500 border-t-transparent"></div>
    </div>
  );
};

export default PageLoading;

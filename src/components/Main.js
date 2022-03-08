import React from "react";
import RouteMenu from "./RouteMenu";

export default function Main(props) {
  return (
      <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <RouteMenu/>
          </div>
      </main>
  );
}
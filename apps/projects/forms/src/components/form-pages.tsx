import { Outlet } from "react-router-dom";

import { BasketOptions } from "./basket-options";

export function FormPages() {
  return (
    <>
      <Outlet />
      <BasketOptions />
    </>
  );
}

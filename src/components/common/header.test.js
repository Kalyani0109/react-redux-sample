import React from "react";
import Header from "./Header";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

it("contains 3 navlinks in header component", () => {
  const navLinks = shallow(<Header />).find("NavLink").length;
  expect(navLinks).toBe(3);
});

//mount actually using JSDOM to render component converting Navlink to anchor tags in dom
it("Contains  2 anchors tag via mount", () => {
  const anchor = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;
  expect(anchor).toBe(3);
});

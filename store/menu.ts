import { defineStore } from "pinia";
import HubIcon from "/images/svg/header/home.svg";
import InsightsIcon from "/images/svg/header/insights.svg";
import CommsIcon from "/images/svg/header/comms.svg";
import ControlPanelIcon from "/images/svg/header/panel.svg";

export const useMenuStore = defineStore("menu", () => {
  const menuitems = [
    {
      id: 1,
      label: "Hub",
      icon: HubIcon,
      link: "/",
    },
    {
      id: 2,
      label: "Control Panel",
      icon: ControlPanelIcon,
      link: "/",
      sub_menu: [
        {
          id: 1,
          label: "Profiles",
          description:
            "Create and manage lead and member profiles.  ",
          link: "/members",
        },
        {
          id: 2,
          label: "Schedule",
          description:
            "Plan and manage classes and events, including timings, capacity and staff allocation.  ",
          link: "/",
        },
        {
          id: 3,
          label: "Classes",
          description:
            "Create and manage class and event categories and types, including descriptions and timings.  ",
          link: "/classes",
        },
        {
          id: 4,
          label: "Memberships",
          description:
            "Create and manage membership packages and plans, including pricing, duration and promotions.",
          link: "/packages",
        },
        {
          id: 5,
          label: "Roles",
          description:
            "Create and manage staff roles and their access levels within ProFit Connect.",
          link: "/roles",
        },
        {
          id: 6,
          label: "Spaces",
          description:
            "Create and manage spaces, including categories, capacity and availability.",
          link: "/spaces",
        },
        {
          id: 7,
          label: "Store",
          description:
            "Create and manage store items such as merchandise and F&B, including pricing, promotions and in-house sales processing.  ",
          link: "/store",
        },
        {
          id: 8,
          label: "Facility",
          description:
            "Create and manage facility features, including timings, location, staff, forms and tags.",
          link: "/facility",
        },
        {
          id: 9,
          label: "Access Levels",
          description:
            "Manage role access levels to ProFit Connect features in the dashboard and Admin App.",
          link: "/access-level",
        },
      ],
    },
    {
      id: 3,
      label: "Comms",
      icon: CommsIcon,
      link: "/",
      sub_menu: [
        {
          id: 1,
          label: "Notifications",
          description:
            "Manage Clients, Leads & Staff Profiles including schedule and availability.",
          link: "/",
        },
        {
          id: 2,
          label: "Emails",
          description:
            "Schedule and manage classes, workshops, and events with an interactive calendar view.",
          link: "/",
        },
        {
          id: 3,
          label: "Journey",
          description:
            "Create and manage various membership plans, including pricing, duration, and access levels.",
          link: "/",
        },
        {
          id: 4,
          label: "Title",
          description:
            "Description goes here. About the page link and other features for the page.",
          link: "/",
        },
        {
          id: 5,
          label: "Wellness Corner",
          description:
            "Create and manage store items. Also process in-store purchases.",
          link: "/wellness-corner",
        },
        {
          id: 6,
          label: "Title",
          description:
            "Description goes here. About the page link and other features for the page",
          link: "/",
        },
      ],
    },
    {
      id: 4,
      label: "Insights",
      icon: InsightsIcon,
      link: "/",
      sub_menu: [
        {
          id: 1,
          label: "Sales",
          description: "",
          link: "/",
        },
        {
          id: 2,
          label: "Membership",
          description: "",
          link: "/",
        },
        {
          id: 3,
          label: "Attendance",
          description: "",
          link: "/",
        },
        {
          id: 4,
          label: "Performance",
          description: "",
          link: "/",
        },
        {
          id: 5,
          label: "Other",
          description: "",
          link: "/",
        },
      ],
    },
  ];
  return {
    menuitems,
  };
});

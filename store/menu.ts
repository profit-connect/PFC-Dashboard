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
            "Manage Clients, Leads & Staff Profiles including schedule and availability.",
          link: "/members",
        },
        {
          id: 2,
          label: "Schedule",
          description:
            "Schedule and manage classes, workshops, and events with an interactive calendar view.",
          link: "/",
        },
        {
          id: 3,
          label: "Classes",
          description:
            "Manage various class types, including descriptions, and prerequisites.",
          link: "/classes",
        },
        {
          id: 4,
          label: "Memberships",
          description:
            "Create and manage various membership plans, including pricing, duration, and access levels.",
          link: "/packages",
        },
        {
          id: 5,
          label: "Role",
          description:
            "Create and Manage staff roles and assign access level to roles.",
          link: "/",
        },
        {
          id: 6,
          label: "Spaces",
          description:
            "Manage various spaces, including it's capacity, and attributes.",
          link: "/spaces",
        },
        {
          id: 7,
          label: "Store",
          description:
            "Create and manage store items. Also process in-store purchases.",
          link: "/store",
        },
        {
          id: 8,
          label: "Facility",
          description:
            "Manage facility specific features and settings including timing, forms, payments and taxes.",
          link: "/facility",
        },
        {
          id: 9,
          label: "Access Levels",
          description:
            "Manage access level for specified features and dashboard pages.",
          link: "/",
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
          link: "/",
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

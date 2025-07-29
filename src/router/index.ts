import { createRouter, createWebHistory } from "vue-router";
import Layout from "../Layout/Layout.vue";

import { ActiveFilePage, ArchiveFilePage, EventLogPage, FileDetailsPage, SettingsPage, ReportPage } from "../pages";


const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/events",
    children: [
      {
        path: "/events",
        name: "events",
        component: EventLogPage,
        meta: {
          title: "Журнал событий",
          menuKey: "home",
        },
      },
      {
        path: "/active-files",
        name: "active-files",
        component: ActiveFilePage,
        meta: {
          menuKey: "active-files",
        },
      },
      {
        path: "/archive",
        name: "archive",
        component: ArchiveFilePage,
        meta: {
          menuKey: "archive",
        },
      },
      {
        path: "/details",
        name: "details",
        component: FileDetailsPage,
        meta: {
          menuKey: "details",
        },
      },
      {
        path: "/report-list",
        name: "report-list",
        component: ReportPage,
        meta: {
          menuKey: "report-list",
        }
      },
      {
        path: "/settings",
        name: "settings",
        component: SettingsPage,
        meta: {
          menuKey: "settings",
        }
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

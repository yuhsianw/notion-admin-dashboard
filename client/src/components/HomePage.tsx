import { Link, Typography } from '@mui/material';
import React from 'react';

export default function HomePage() {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Notion Admin Dashboard is a demo application for workspace and user
        management. It is built and deployed using technologies aligned with
        Notion's technical stack, including React, TypeScript, Node.js,
        Postgres, and Heroku. The aim of this personal project is to demonstrate
        my capabilities in design and coding, while providing insight into my
        work approach. The source code for this project is available on&nbsp;
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://github.com/yuhsianw/notion-admin-dashboard">
          GitHub.
        </Link>
      </Typography>
      <Typography variant="h6" component="h2" mt={4} gutterBottom>
        Features Overview:
      </Typography>
      <Typography variant="body1">
        <ul>
          <li>Table views of workspaces and users and their attributes.</li>
          <li>Add, update, and delete workspaces and users. </li>
          <li>Assign or remove members from and to workspaces.</li>
          <li>
            Tables features include sorting, filtering, pagination, and
            resetting to default rows.
          </li>
          <li>Switch between dark/light mode for the dashboard.</li>
        </ul>
      </Typography>
    </>
  );
}

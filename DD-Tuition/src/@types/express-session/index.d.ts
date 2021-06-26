import express from 'express';
import Employee from '../../models/employee';

declare module 'express-session' {
  interface SessionData {
    user: Employee;
  }

  interface Session {
    isLoggedIn: boolean = false;
  }
}

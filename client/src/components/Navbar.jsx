import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {

  return (
    <>
      <p>Navbar</p>
      <Link to="/login" className="text-sm text-blue-600 hover:underline">
        Login
      </Link>
      <Link to="/signup" className="text-sm text-blue-600 hover:underline">
        Signup
      </Link>
    </>
  );
}

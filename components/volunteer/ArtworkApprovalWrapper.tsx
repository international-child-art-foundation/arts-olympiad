"use client";
import React, { useState, useEffect } from "react";
import { ArtworkApproval } from "./ArtworkApproval";
import { getVolunteerAuthStatus } from "@/utils/api-user";
import { limiter } from "@/utils/api-rate-limit";

export const ArtworkApprovalWrapper = () => {
  const [volunteerAuthenticated, setVolunteerAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await limiter.schedule(() => getVolunteerAuthStatus());
        setVolunteerAuthenticated(response.success);
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setVolunteerAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading... Please wait.</p>
        <p>If you've arrived here by mistake, please return to the <a href="/">homepage</a>.</p>
      </div>
    );
  }

  if (volunteerAuthenticated === false) {
    return (
      <div>
        <h2>Authentication Failed</h2>
        <p>You are not authenticated as a volunteer. Please log in or contact an administrator.</p>
        <p>Return to the <a href="/">homepage</a>.</p>
      </div>
    );
  }

  return (
    <ArtworkApproval/>
  );
};
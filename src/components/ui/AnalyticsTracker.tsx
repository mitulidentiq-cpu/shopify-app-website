import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

// Helper to safely hash email addresses to comply with Google's strict No-PII policy
export function getAnonymousUserId(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return 'merchant_' + Math.abs(hash).toString(16);
}

const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Initialize GA4 if Measurement ID is configured
if (gaId && gaId !== 'G-XXXXXXXXXX') {
  ReactGA.initialize(gaId);
}

export const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (gaId && gaId !== 'G-XXXXXXXXXX') {
      // Send page view with URL path and query parameters
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname + location.search,
        title: document.title,
      });
    }
  }, [location]);

  return null;
};

/**
 * Tracks custom user interactions/clicks.
 */
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (gaId && gaId !== 'G-XXXXXXXXXX') {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  } else {
    console.log(`[GA4 Mock Event]: Category: ${category}, Action: ${action}, Label: ${label}`);
  }
};

/**
 * Tracks Outbound clicks to the Shopify App Store.
 */
export const trackAppInstallClick = (appName: string, sectionPosition: string) => {
  trackEvent('Outbound Link', 'Click Install App', `${appName} - ${sectionPosition}`);
};

/**
 * Logs Google and Email authentication status.
 */
export const trackAuthAction = (actionType: 'login' | 'sign_up' | 'logout', method: 'google' | 'email') => {
  trackEvent('Authentication', actionType, method);
};

/**
 * Tracks merchant linking their Shopify URL.
 */
export const trackStoreConnection = (shopName: string, success: boolean) => {
  trackEvent('Shopify Integration', success ? 'Connection Success' : 'Connection Failure', shopName);
};

/**
 * Sets authenticated user properties inside GA4 securely (no raw emails/names).
 */
export const setAnalyticsUserContext = (email: string, name: string) => {
  if (gaId && gaId !== 'G-XXXXXXXXXX') {
    const anonymousId = getAnonymousUserId(email);
    
    // Set system user_id parameter
    ReactGA.gtag('config', gaId, {
      user_id: anonymousId,
    });

    // Set non-PII user properties
    ReactGA.gtag('set', 'user_properties', {
      user_cohort: 'verified_merchant',
      name_length_bucket: name.length > 10 ? 'long_name' : 'short_name',
    });
  }
};

/**
 * Clears user context inside GA4 on logout.
 */
export const clearAnalyticsUserContext = () => {
  if (gaId && gaId !== 'G-XXXXXXXXXX') {
    ReactGA.gtag('config', gaId, {
      user_id: null,
    });
  }
};

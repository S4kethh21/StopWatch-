import React from 'react';
import { Wifi, BatteryMedium } from 'lucide-react';

export default function PhoneFrame({
  children,
  headerLabel = 'STOPWATCH',
  className = '',
  statusTime = '09:41',
  variant = 'default',
}) {
  return (
    <div className={`phone-mockup-wrapper ${className} variant-${variant}`}>
      {/* Outer Phone Shell */}
      <div className="phone-device-frame">
        {/* Antenna / Edge highlights */}
        <div className="phone-antenna antenna-left" aria-hidden="true" />
        <div className="phone-antenna antenna-right" aria-hidden="true" />

        {/* Screen Display */}
        <div className="phone-screen">
          {/* iOS / Modern Status Bar */}
          <div className="phone-status-bar" aria-hidden="true">
            <span className="status-clock">{statusTime}</span>
            <div className="dynamic-notch">
              <span className="camera-lens" />
              <span className="speaker-earpiece" />
            </div>
            <div className="status-icons">
              <span className="cellular-signal">
                <span className="bar bar-1" />
                <span className="bar bar-2" />
                <span className="bar bar-3" />
                <span className="bar bar-4" />
              </span>
              <Wifi size={13} className="status-icon" />
              <BatteryMedium size={14} className="status-icon battery" />
            </div>
          </div>

          {/* Minimal Screen Header Label if provided */}
          {headerLabel && (
            <div className="phone-screen-header">
              <span className="phone-header-label">{headerLabel}</span>
            </div>
          )}

          {/* Screen Body */}
          <div className="phone-screen-body">{children}</div>

          {/* Bottom Home Gesture Bar */}
          <div className="phone-home-indicator" aria-hidden="true">
            <div className="home-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}

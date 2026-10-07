import React, { useEffect } from 'react';
import { X, Volume2, VolumeX, Timer, Eye, Palette } from 'lucide-react';
import { soundEffects } from '../utils/sound';

export default function SettingsModal({
  isOpen,
  settings,
  onUpdateSettings,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCountdownChange = (val) => {
    onUpdateSettings({ countdown: val });
  };

  const handleSoundToggle = (val) => {
    onUpdateSettings({ sound: val });
    if (val) {
      soundEffects.start(true);
    }
  };

  const handleMotionChange = (val) => {
    onUpdateSettings({ reducedMotion: val });
  };

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="dialog-box-editorial settings-modal-box"
        role="dialog"
        aria-modal="true"
        aria-label="Application Settings"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="settings-header">
          <div className="settings-title-group">
            <span className="settings-pretitle">PREFERENCES</span>
            <h3 className="settings-title">SETTINGS</h3>
          </div>
          <button
            type="button"
            className="btn-dialog-close"
            onClick={onClose}
            aria-label="Close settings dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* Settings Body */}
        <div className="settings-body">
          {/* Setting 1: Start Countdown */}
          <div className="setting-row">
            <div className="setting-meta">
              <div className="setting-label-icon">
                <Timer size={16} className="text-yellow" />
                <span className="setting-label">START COUNTDOWN</span>
              </div>
              <p className="setting-description">
                Lead-in countdown before the stopwatch timer starts ticking.
              </p>
            </div>
            <div className="segmented-control" role="radiogroup" aria-label="Start countdown options">
              <button
                type="button"
                className={`segment-btn ${settings.countdown === 'off' ? 'is-active' : ''}`}
                onClick={() => handleCountdownChange('off')}
              >
                OFF
              </button>
              <button
                type="button"
                className={`segment-btn ${settings.countdown === '3' ? 'is-active' : ''}`}
                onClick={() => handleCountdownChange('3')}
              >
                3 SEC
              </button>
              <button
                type="button"
                className={`segment-btn ${settings.countdown === '5' ? 'is-active' : ''}`}
                onClick={() => handleCountdownChange('5')}
              >
                5 SEC
              </button>
            </div>
          </div>

          {/* Setting 2: Sound Feedback */}
          <div className="setting-row">
            <div className="setting-meta">
              <div className="setting-label-icon">
                {settings.sound ? (
                  <Volume2 size={16} className="text-yellow" />
                ) : (
                  <VolumeX size={16} className="text-muted" />
                )}
                <span className="setting-label">AUDIO FEEDBACK</span>
              </div>
              <p className="setting-description">
                Gentle acoustic beeps for start, pause, lap splits, and countdown.
              </p>
            </div>
            <div className="segmented-control" role="radiogroup" aria-label="Audio feedback options">
              <button
                type="button"
                className={`segment-btn ${!settings.sound ? 'is-active' : ''}`}
                onClick={() => handleSoundToggle(false)}
              >
                OFF
              </button>
              <button
                type="button"
                className={`segment-btn ${settings.sound ? 'is-active' : ''}`}
                onClick={() => handleSoundToggle(true)}
              >
                ON
              </button>
            </div>
          </div>

          {/* Setting 3: Reduced Motion */}
          <div className="setting-row">
            <div className="setting-meta">
              <div className="setting-label-icon">
                <Eye size={16} className="text-yellow" />
                <span className="setting-label">REDUCED MOTION</span>
              </div>
              <p className="setting-description">
                Minimize transition animations and rotating dial motion.
              </p>
            </div>
            <div className="segmented-control" role="radiogroup" aria-label="Reduced motion options">
              <button
                type="button"
                className={`segment-btn ${settings.reducedMotion === 'auto' ? 'is-active' : ''}`}
                onClick={() => handleMotionChange('auto')}
              >
                AUTO
              </button>
              <button
                type="button"
                className={`segment-btn ${settings.reducedMotion === 'on' ? 'is-active' : ''}`}
                onClick={() => handleMotionChange('on')}
              >
                ON
              </button>
              <button
                type="button"
                className={`segment-btn ${settings.reducedMotion === 'off' ? 'is-active' : ''}`}
                onClick={() => handleMotionChange('off')}
              >
                OFF
              </button>
            </div>
          </div>

          {/* Setting 4: Theme (Single Fixed Product Theme) */}
          <div className="setting-row setting-row-theme">
            <div className="setting-meta">
              <div className="setting-label-icon">
                <Palette size={16} className="text-yellow" />
                <span className="setting-label">THEME</span>
              </div>
              <p className="setting-description">
                Signature high-contrast editorial dark aesthetic.
              </p>
            </div>
            <div className="theme-badge-pill">
              <span className="theme-swatch-dot" />
              <span>MIDNIGHT YELLOW</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="settings-footer">
          <span className="settings-auto-saved">PREFERENCES PERSISTED AUTOMATICALLY</span>
          <button
            type="button"
            className="btn-dialog-confirm-yellow"
            onClick={onClose}
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}

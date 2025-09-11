import React from 'react';
import { Exporter } from './types';

interface ExporterEventsTabProps {
  exporter: Exporter;
}

const ExporterEventsTab: React.FC<ExporterEventsTabProps> = ({ exporter }) => {
  // Mock events data
  const events = [
    {
      id: 1,
      type: 'Leased',
      resource: 'Exporter',
      resourceName: exporter.metadata.name,
      namespace: exporter.metadata.namespace,
      timestamp: 'Sep 11, 2025, 3:45 PM',
      source: 'jumpstarter-controller',
      message: '"majopela" leased this exporter for 1d',
      count: 1,
      severity: 'info'
    },
    {
      id: 2,
      type: 'Released',
      resource: 'Exporter',
      resourceName: exporter.metadata.name,
      namespace: exporter.metadata.namespace,
      timestamp: 'Sep 11, 2025, 12:30 PM',
      source: 'jumpstarter-controller',
      message: '"majopela" released this exporter after 3h',
      count: 1,
      severity: 'info'
    },
    {
      id: 3,
      type: 'Warning',
      resource: 'Exporter',
      resourceName: exporter.metadata.name,
      namespace: exporter.metadata.namespace,
      timestamp: 'Sep 11, 2025, 10:15 AM',
      source: 'jumpstarter-controller',
      message: '"benny" reported an issue with this exporter: uboot fails to boot',
      count: 1,
      severity: 'warning'
    },
    {
      id: 4,
      type: 'Leased',
      resource: 'Exporter',
      resourceName: exporter.metadata.name,
      namespace: exporter.metadata.namespace,
      timestamp: 'Sep 11, 2025, 8:00 AM',
      source: 'jumpstarter-controller',
      message: '"test-ci" leased this exporter for 2h',
      count: 1,
      severity: 'info'
    },
    {
      id: 5,
      type: 'Released',
      resource: 'Exporter',
      resourceName: exporter.metadata.name,
      namespace: exporter.metadata.namespace,
      timestamp: 'Sep 11, 2025, 9:57 AM',
      source: 'jumpstarter-controller',
      message: '"test-ci" released this exporter after 57 minutes',
      count: 1,
      severity: 'info'
    },
    {
      id: 6,
      type: 'Maintenance',
      resource: 'Exporter',
      resourceName: exporter.metadata.name,
      namespace: exporter.metadata.namespace,
      timestamp: 'Sep 10, 2025, 11:30 PM',
      source: 'jumpstarter-controller',
      message: 'Exporter placed in maintenance mode for firmware update',
      count: 1,
      severity: 'warning'
    },
    {
      id: 7,
      type: 'Available',
      resource: 'Exporter',
      resourceName: exporter.metadata.name,
      namespace: exporter.metadata.namespace,
      timestamp: 'Sep 10, 2025, 11:45 PM',
      source: 'jumpstarter-controller',
      message: 'Exporter maintenance completed, now available for lease',
      count: 1,
      severity: 'info'
    },
    {
      id: 8,
      type: 'Error',
      resource: 'Exporter',
      resourceName: exporter.metadata.name,
      namespace: exporter.metadata.namespace,
      timestamp: 'Sep 10, 2025, 2:20 PM',
      source: 'jumpstarter-controller',
      message: 'Power cycle failed: device did not respond to reset command',
      count: 3,
      severity: 'error'
    },
    {
      id: 9,
      type: 'Recovered',
      resource: 'Exporter',
      resourceName: exporter.metadata.name,
      namespace: exporter.metadata.namespace,
      timestamp: 'Sep 10, 2025, 2:25 PM',
      source: 'jumpstarter-controller',
      message: 'Device recovered after manual intervention',
      count: 1,
      severity: 'info'
    },
    {
      id: 10,
      type: 'Leased',
      resource: 'Exporter',
      resourceName: exporter.metadata.name,
      namespace: exporter.metadata.namespace,
      timestamp: 'Sep 9, 2025, 4:15 PM',
      source: 'jumpstarter-controller',
      message: '"alice" leased this exporter for 4h',
      count: 1,
      severity: 'info'
      },
      {
        id: 11,
        type: 'FirmwareUpdate',
        resource: 'Exporter',
        resourceName: exporter.metadata.name,
        namespace: exporter.metadata.namespace,
        timestamp: 'Sep 9, 2025, 1:30 PM',
        source: 'jumpstarter-controller',
        message: 'Firmware updated to version 2.1.3 - improved boot reliability',
        count: 1,
        severity: 'info'
      },
      {
        id: 12,
        type: 'HealthCheck',
        resource: 'Exporter',
        resourceName: exporter.metadata.name,
        namespace: exporter.metadata.namespace,
        timestamp: 'Sep 8, 2025, 6:00 PM',
        source: 'jumpstarter-controller',
        message: 'Scheduled health check passed - all systems operational',
        count: 1,
        severity: 'info'
      }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Leased':
        return '🔒';
      case 'Released':
        return '🔓';
      case 'Warning':
        return '⚠️';
      case 'Error':
        return '❌';
      case 'Maintenance':
        return '🔧';
      case 'Available':
        return '✅';
      case 'Recovered':
        return '🔄';
      case 'FirmwareUpdate':
        return '📱';
      case 'HealthCheck':
        return '💚';
      default:
        return '📋';
    }
  };

  const getEventColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return '#c9190b';
      case 'warning':
        return '#f0ab00';
      case 'info':
      default:
        return '#06c';
    }
  };

  return (
    <div className="co-sysevent-stream">
      <div className="co-sysevent-stream__status">
        <div className="co-sysevent-stream__timeline__btn-text">
          <span>Streaming events...</span>
        </div>
        <div className="co-sysevent-stream__totals text-secondary" data-test="event-totals">
          Showing {events.length} events
        </div>
      </div>
      
      <div className="co-sysevent-stream__timeline">
        <button 
          aria-disabled="false" 
          aria-label="Pause event streaming" 
          className="pf-v5-c-button pf-m-plain opp-toggle-play co-sysevent-stream__timeline__btn opp-toggle-play--active" 
          type="button"
        >
          <svg className="pf-v5-svg" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" role="img" width="1em" height="1em">
            <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c0 0 48-21.5 48-48z"></path>
          </svg>
        </button>
        <div className="co-sysevent-stream__timeline__end-message">Older events are not stored.</div>
      </div>
      
      <div className="co-sysevent-list">
        {events.map((event) => (
          <div key={event.id} className="co-sysevent--transition" role="row">
            <div className="slide-entered slide-enter-done">
              <div className={`co-sysevent ${event.severity === 'warning' ? 'co-sysevent--warning' : ''}`} data-test="event">
                <div className="co-sysevent__icon-box">
                  <i className="co-sysevent-icon" title={`${event.type} (${event.resource})`} style={{ fontSize: '16px' }}>
                    {getEventIcon(event.type)}
                  </i>
                  <div className="co-sysevent__icon-line"></div>
                </div>
                <div className="co-sysevent__box" role="gridcell">
                  <div className="co-sysevent__header">
                    <div className="co-sysevent__subheader">
                      <span className="co-resource-item co-sysevent__resourcelink">
                        <span className="pf-v5-u-screen-reader">{event.resource}</span>
                        <span className="co-m-resource-icon co-m-resource-exporter" title={event.resource} style={{ backgroundColor: getEventColor(event.severity) }}>
                          EX
                        </span>
                        <a className="co-resource-item__resource-name" data-test-id={event.resourceName} data-test={event.resourceName} href="#">
                          {event.resourceName}
                        </a>
                      </span>
                      <span className="co-resource-item co-sysevent__resourcelink hidden-xs">
                        <span className="pf-v5-u-screen-reader">Namespace</span>
                        <span className="co-m-resource-icon co-m-resource-namespace" title="Namespace">NS</span>
                        <a className="co-resource-item__resource-name" data-test-id={event.namespace} data-test={event.namespace} href="#">
                          {event.namespace}
                        </a>
                      </span>
                      <div className="co-timestamp co-icon-and-text co-sysevent__timestamp">
                        <svg className="pf-v5-svg co-icon-and-text__icon" viewBox="0 0 496 512" fill="currentColor" aria-hidden="true" role="img" width="1em" height="1em">
                          <path d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm82.29 357.6c-3.9 3.88-7.99 7.95-11.31 11.28-2.99 3-5.1 6.7-6.17 10.71-1.51 5.66-2.73 11.38-4.77 16.87l-17.39 46.85c-13.76 3-28 4.69-42.65 4.69v-27.38c1.69-12.62-7.64-36.26-22.63-51.25-6-6-9.37-14.14-9.37-22.63v-32.01c0-11.64-6.27-22.34-16.46-27.97-14.37-7.95-34.81-19.06-48.81-26.11-11.48-5.78-22.1-13.14-31.65-21.75l-.8-.72a114.792 114.792 0 0 1-18.06-20.74c-9.38-13.77-24.66-36.42-34.59-51.14 20.47-45.5 57.36-82.04 103.2-101.89l24.01 12.01C203.48 89.74 216 82.01 216 70.11v-11.3c7.99-1.29 16.12-2.11 24.39-2.42l28.3 28.3c6.25 6.25 6.25 16.38 0 22.63L264 112l-10.34 10.34c-3.12 3.12-3.12 8.19 0 11.31l4.69 4.69c3.12 3.12 3.12 8.19 0 11.31l-8 8a8.008 8.008 0 0 1-5.66 2.34h-8.99c-2.08 0-4.08.81-5.58 2.27l-9.92 9.65a8.008 8.008 0 0 0-1.58 9.31l15.59 31.19c2.66 5.32-1.21 11.58-7.15 11.58h-5.64c-1.93 0-3.79-.7-5.24-1.96l-9.28-8.06a16.017 16.017 0 0 0-15.55-3.1l-31.17 10.39a11.95 11.95 0 0 0-8.17 11.34c0 4.53 2.56 8.66 6.61 10.69l11.08 5.54c9.41 4.71 19.79 7.16 30.31 7.16s22.59 27.29 32 32h66.75c8.49 0 16.62 3.37 22.63 9.37l13.69 13.69a30.503 30.503 0 0 1 8.93 21.57 46.536 46.536 0 0 1-13.72 32.98zM417 274.25c-5.79-1.45-10.84-5-14.15-9.97l-17.98-26.97a23.97 23.97 0 0 1 0-26.62l19.59-29.38c2.32-3.47 5.5-6.29 9.24-8.15l12.98-6.49C440.2 193.59 448 223.87 448 256c0 8.67-.74 17.16-1.82 25.54L417 274.25z"></path>
                        </svg>
                        <div style={{ display: 'contents' }}>
                          <span data-test="timestamp">{event.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="co-sysevent__details">
                      <small className="co-sysevent__source">Generated from {event.source}</small>
                      {event.count > 1 && (
                        <small className="co-sysevent__count text-secondary">
                          {event.count} times in the last 0 minutes
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="co-sysevent__message">{event.message}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExporterEventsTab;

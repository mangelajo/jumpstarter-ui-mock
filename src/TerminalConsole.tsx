import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';

interface TerminalConsoleProps {
  exporterName: string;
  leaseId?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onData?: (data: string) => void;
  onSend?: (data: string) => void;
}

const TerminalConsole: React.FC<TerminalConsoleProps> = ({
  exporterName,
  leaseId,
  onConnect,
  onDisconnect,
  onData,
  onSend
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstanceRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const isInitializedRef = useRef<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Prevent duplicate initialization
    if (isInitializedRef.current) {
      return;
    }

    // Ensure the container has dimensions before initializing
    const container = terminalRef.current;
    if (container.offsetWidth === 0 || container.offsetHeight === 0) {
      // Wait for the container to have dimensions
      const checkDimensions = () => {
        if (container.offsetWidth > 0 && container.offsetHeight > 0) {
          initializeTerminal();
        } else {
          setTimeout(checkDimensions, 50);
        }
      };
      checkDimensions();
      return;
    }

    initializeTerminal();

    function initializeTerminal() {

    // Create terminal instance
    const terminal = new Terminal({
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#e5e5e5'
      },
      fontSize: 14,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 1000,
      tabStopWidth: 4
    });

    // Create fit addon
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    // Mount terminal
    if (terminalRef.current) {
      terminal.open(terminalRef.current);
    }
    
    // Store references
    terminalInstanceRef.current = terminal;
    fitAddonRef.current = fitAddon;
    isInitializedRef.current = true;

    // Fit terminal after a short delay to ensure DOM is ready
    const fitTerminal = () => {
      try {
        if (fitAddon && terminalRef.current) {
          fitAddon.fit();
        }
      } catch (error) {
        console.warn('Failed to fit terminal:', error);
      }
    };

    // Fit immediately and after a short delay
    setTimeout(fitTerminal, 0);
    setTimeout(fitTerminal, 100);
    setTimeout(fitTerminal, 500);

    // Use ResizeObserver to fit when container size changes
    let resizeObserver: ResizeObserver | null = null;
    if (terminalRef.current && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        setTimeout(fitTerminal, 10);
      });
      resizeObserver.observe(terminalRef.current as HTMLElement);
    }

    // Set up event handlers
    terminal.onData((data) => {
      if (onData) {
        onData(data);
      }
      // Echo the character back to simulate terminal behavior
      terminal.write(data);
    });

    // Simulate connection
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      if (onConnect) {
        onConnect();
      }
      
      // Display shell content as specified
      const shellCommand = leaseId ? `jmp shell --lease ${leaseId}` : `jmp shell -l device=${exporterName}`;
      terminal.write('\r\n\x1b[33m$ ' + shellCommand + '\x1b[0m\r\n');
      terminal.write('\r\n\x1b[33m~ ⚡remote ➤ j\x1b[0m\r\n');
      terminal.write('Usage: j [OPTIONS] COMMAND [ARGS]...\r\n');
      terminal.write('\r\n  Generic composite device\r\n');
      terminal.write('\r\nOptions:\r\n');
      terminal.write('  --help  Show this message and exit.\r\n');
      terminal.write('\r\nCommands:\r\n');
      terminal.write('  acm             Serial port client\r\n');
      terminal.write('  fw-maintenance  Shell command executor\r\n');
      terminal.write('  power           Generic power\r\n');
      terminal.write('  power-external  SNMP power control commands\r\n');
      terminal.write('  serial          Serial port client\r\n');
      terminal.write('  ssh             Generic Network Connection\r\n');
      terminal.write('  storage\r\n');
      terminal.write('\r\n\x1b[33m~ ⚡remote ➤\x1b[0m ');
    }, 1000);

    // Handle window resize
    const handleResize = () => {
      try {
        if (fitAddon && terminalRef.current) {
          fitAddon.fit();
        }
      } catch (error) {
        console.warn('Failed to resize terminal:', error);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      terminal.dispose();
      setIsConnected(false);
      isInitializedRef.current = false;
      if (onDisconnect) {
        onDisconnect();
      }
    };
    }
  }, []); // Empty dependency array to run only once

  const handleConnect = () => {
    if (terminalInstanceRef.current && !isConnected) {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnected(true);
        setIsConnecting(false);
        if (onConnect) {
          onConnect();
        }
        const shellCommand = leaseId ? `jmp shell --lease ${leaseId}` : `jmp shell -l device=${exporterName}`;
        terminalInstanceRef.current?.write('\r\n\x1b[33m$ ' + shellCommand + '\x1b[0m\r\n');
        terminalInstanceRef.current?.write('[09/10/2025 17:17:21] INFO     INFO:jumpstarter.client.lease:Created lease request for selector device=' + exporterName + ' for duration 0:30:00                                                                lease.py:60\r\n');
        terminalInstanceRef.current?.write('\r\n\x1b[33m~ ⚡remote ➤ j\x1b[0m\r\n');
        terminalInstanceRef.current?.write('Usage: j [OPTIONS] COMMAND [ARGS]...\r\n');
        terminalInstanceRef.current?.write('\r\n  Generic composite device\r\n');
        terminalInstanceRef.current?.write('\r\nOptions:\r\n');
        terminalInstanceRef.current?.write('  --help  Show this message and exit.\r\n');
        terminalInstanceRef.current?.write('\r\nCommands:\r\n');
        terminalInstanceRef.current?.write('  acm             Serial port client\r\n');
        terminalInstanceRef.current?.write('  fw-maintenance  Shell command executor\r\n');
        terminalInstanceRef.current?.write('  power           Generic power\r\n');
        terminalInstanceRef.current?.write('  power-external  SNMP power control commands\r\n');
        terminalInstanceRef.current?.write('  serial          Serial port client\r\n');
        terminalInstanceRef.current?.write('  ssh             Generic Network Connection\r\n');
        terminalInstanceRef.current?.write('  storage\r\n');
        terminalInstanceRef.current?.write('\r\n\x1b[33m~ ⚡remote ➤\x1b[0m ');
      }, 500);
    }
  };

  const handleDisconnect = () => {
    if (terminalInstanceRef.current && isConnected) {
      terminalInstanceRef.current.write('\r\n\x1b[31mDisconnected from exporter: ' + exporterName + '\x1b[0m\r\n');
      setIsConnected(false);
      if (onDisconnect) {
        onDisconnect();
      }
    }
  };

  const handleSendCommand = (command: string) => {
    if (terminalInstanceRef.current && isConnected) {
      terminalInstanceRef.current.write(command + '\r\n');
      if (onSend) {
        onSend(command);
      }
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Terminal Toolbar */}
      <div style={{ 
        padding: '0.5rem', 
        backgroundColor: '#2d2d2d', 
        borderBottom: '1px solid #444',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isConnected ? '#0dbc79' : isConnecting ? '#e5e510' : '#cd3131'
          }} />
          <span style={{ color: '#d4d4d4', fontSize: '12px' }}>
            {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Disconnected'} to {exporterName}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleConnect}
            disabled={isConnected || isConnecting}
            style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: isConnected || isConnecting ? '#444' : '#0dbc79',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: isConnected || isConnecting ? 'not-allowed' : 'pointer',
              fontSize: '12px'
            }}
          >
            Connect
          </button>
          <button
            onClick={handleDisconnect}
            disabled={!isConnected}
            style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: !isConnected ? '#444' : '#cd3131',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: !isConnected ? 'not-allowed' : 'pointer',
              fontSize: '12px'
            }}
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Terminal Container */}
      <div 
        ref={terminalRef} 
        style={{ 
          flex: 1,
          backgroundColor: '#1e1e1e',
          minHeight: '400px'
        }} 
      />

      {/* Quick Commands */}
      <div style={{ 
        padding: '0.5rem', 
        backgroundColor: '#2d2d2d', 
        borderTop: '1px solid #444',
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <span style={{ color: '#d4d4d4', fontSize: '12px', marginRight: '0.5rem' }}>Quick commands:</span>
        {['j', 'j storage flash','jmp get leases'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleSendCommand(cmd)}
            disabled={!isConnected}
            style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: !isConnected ? '#444' : '#2472c8',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: !isConnected ? 'not-allowed' : 'pointer',
              fontSize: '11px'
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TerminalConsole;

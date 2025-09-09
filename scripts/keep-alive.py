#!/usr/bin/env python3

import os
import time
import requests
from datetime import datetime
import signal
import sys

# Configuration
WEBSITE_URL = os.getenv('WEBSITE_URL', 'https://your-app-name.onrender.com')
PING_INTERVAL = int(os.getenv('PING_INTERVAL', '14'))  # minutes
HEALTH_ENDPOINT = '/api/classes'  # Use existing API endpoint

class KeepAlive:
    def __init__(self):
        self.running = True
        signal.signal(signal.SIGINT, self.shutdown)
        signal.signal(signal.SIGTERM, self.shutdown)
    
    def shutdown(self, signum, frame):
        print("\n🛑 Keep-alive stopped")
        self.running = False
        sys.exit(0)
    
    def ping_website(self):
        url = f"{WEBSITE_URL}{HEALTH_ENDPOINT}"
        timestamp = datetime.now().isoformat()
        
        try:
            start_time = time.time()
            response = requests.get(url, timeout=30)
            duration = int((time.time() - start_time) * 1000)
            
            if 200 <= response.status_code < 300:
                print(f"✅ {timestamp} - Ping successful ({response.status_code}) - {duration}ms")
            else:
                print(f"⚠️ {timestamp} - Ping returned {response.status_code} - {duration}ms")
                
        except requests.exceptions.Timeout:
            print(f"⏰ {timestamp} - Ping timeout after 30 seconds")
        except requests.exceptions.RequestException as e:
            print(f"❌ {timestamp} - Ping failed: {str(e)}")
    
    def start(self):
        print(f"🚀 Starting keep-alive for {WEBSITE_URL}")
        print(f"📡 Pinging every {PING_INTERVAL} minutes")
        print(f"🎯 Health endpoint: {HEALTH_ENDPOINT}")
        print("---")
        
        # Initial ping
        self.ping_website()
        
        # Main loop
        while self.running:
            time.sleep(PING_INTERVAL * 60)  # Convert minutes to seconds
            if self.running:
                self.ping_website()

if __name__ == "__main__":
    keep_alive = KeepAlive()
    keep_alive.start()
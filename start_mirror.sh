#!/bin/bash
# Git pull
#cd /home/pi/Documents/Smart-Mirror/ && git pull &&
#cd /var/www/html/ && git pull &&

# start the servers
cd /home/pi/Documents/Smart-Mirror/back/ && npm run start &
sudo systemctl restart lighttpd &


# start chromium in kiosk mode
xset s noblank
xset s off
xset -dpms

unclutter -idle 0.5 -root &

/usr/bin/chromium-browser --noerrdialogs --disable-infobars --kiosk http://localhost:4200/ &


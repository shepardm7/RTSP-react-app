#### Steps to follow before running the app (the below steps are done on a Windows machine using WAMP):
1. Download [ffmpeg](https://www.ffmpeg.org/download.html), extract it and add it to PATH
2. Install WAMP Server, create a folder called 'live' in the 'www' directory
3. To prevent CORS issue with WAMP you must add *Header set Access-Control-Allow-Origin "\*"* in the *httpd-vhosts
.conf* file and make sure the *headers-module" is installed.
4. Now create a batch file with the following lines and save it
    ```shell script
   cd c:\wamp64\www\live
   set VIDSOURCE="rtsp://url" &:: put your url here  
   set AUDIO_OPTS=-c:a aac -b:a 160000 -ac 2  
   set VIDEO_OPTS=-s 854x480 -c:v libx264 -b:v 800000  
   set OUTPUT_HLS=-hls_time 10 -hls_list_size 10 -start_number 1  
   ffmpeg -i %VIDSOURCE% -y %AUDIO_OPTS% %VIDEO_OPTS% %OUTPUT_HLS% mystream.m3u8  
   PAUSE```
 5. Run the batch file. If successfully done you should see some output in the command prompt and streaming files will
  begin getting created in the *C:\wamp64\www\live* directory.
 6. Now you can run the app.


#!/usr/bin/python
# -*- coding:utf-8 -*-
import sys
import os
import time
import struct
import smbus
import logging
import traceback
import datetime

from gpiozero import CPUTemperature
#from microdotphat import set_pixel, clear, write_string, show, WIDTH, HEIGHT, set_decimal

picdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'pic')
libdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'lib')
if os.path.exists(libdir):
    sys.path.append(libdir)


from waveshare_epd import epd2in13_V2
from PIL import Image,ImageDraw,ImageFont
    
logging.basicConfig(level=logging.DEBUG)

def cpuTemp():
        temp = CPUTemperature()
        temp= (temp.temperature * 1.8)+32
        return temp

def readVoltage(bus):

     address = 0x36
     read = bus.read_word_data(address, 2)
     swapped = struct.unpack("<H", struct.pack(">H", read))[0]
     voltage = swapped * 1.25 /1000/16
     return voltage


def readCapacity(bus):

     address = 0x36
     read = bus.read_word_data(address, 4)
     swapped = struct.unpack("<H", struct.pack(">H", read))[0]
     capacity = swapped/256
     return capacity

bus = smbus.SMBus(1) # 0 = /dev/i2c-0 (port I2C0), 1 = /dev/i2c-1 (port I2C1)

try:
    epd = epd2in13_V2.EPD()
#    logging.info("init and Clear")
    epd.init(epd.FULL_UPDATE)
    epd.Clear(0xFF)
    font20 = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), 20)
    font13 = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), 13)
    
    # # partial update
 #   logging.info("4.show time...")
    time_image = Image.new('1', (epd.height, epd.width), 255)
    time_draw = ImageDraw.Draw(time_image)

    epd.init(epd.FULL_UPDATE)
    epd.displayPartBaseImage(epd.getbuffer(time_image))    
    epd.init(epd.PART_UPDATE)
        
    bmp = Image.open(os.path.join(picdir, 'msg_eink.jpg'))

    i = 0
    while (True):
        temp = cpuTemp()
        currentTime = time.strftime('%H:%M')
        voltage = "%5.2fV" % readVoltage(bus)
        battery = "%5i%%" % readCapacity(bus)
        
 ###       clear()
        #set_pixel(0, 0, 1)

        #num = int(input("Enter a number: "))

##        t = datetime.datetime.now()
##        if t.second % 2 == 0:
##            set_decimal(2, 1)
##            set_decimal(4, 1)
##        else:
##            set_decimal(2, 0)
##            set_decimal(4, 0)
##        write_string(t.strftime('%H%M%S'), kerning=False)
##        show()
#        time.sleep(0.05)
##        if (i % 2) == 0:
###        write_string( '=LAB=', kerning=0 )
##        else:
##            write_string( '_-.-_', kerning=0 )
###        show()
        time_image.paste(bmp, (18,15))    

        #epd.displayPartBaseImage(epd.getbuffer(einkImage))    
        #epd.init(epd.PART_UPDATE)

        time_draw.rectangle((10, 90, 250, 105), fill = 255)
        time_draw.text((10, 90),  "RPi  %dF   | %s  | %s      |      %s" % (temp, battery, voltage, currentTime), font = font13, fill = 0)
        epd.displayPartial(epd.getbuffer(time_image))
        
#        einkDraw.rectangle((10, 100, 250, 105), fill = 255)
#        einkDraw.text((10, 100), "RPi Temp: %d F     |     %s" % (temp, currentTime), font = font14, fill = 0)
      
##        draw.rectangle((170, 100, 250, 105), fill = 255)
##        draw.text((170, 100), time.strftime('%H:%M'), font = font20, fill = 0)
#        epd.displayPartial(epd.getbuffer(einkImage))

        i= i+1
#        print(i)
        if i == 30:
            epd.init(epd.FULL_UPDATE)
            epd.Clear(0xFF)
            epd.init(epd.FULL_UPDATE)
            epd.displayPartBaseImage(epd.getbuffer(time_image))    
            epd.init(epd.PART_UPDATE)
            i=0
        time.sleep(20) 
        
except IOError as e:
    logging.info(e)
    
except KeyboardInterrupt:    
    logging.info("ctrl + c:")
    epd2in13_V2.epdconfig.module_exit()
    exit()

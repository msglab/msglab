from bbq10keyboard import BBQ10Keyboard, STATE_PRESS, STATE_RELEASE, STATE_LONG_PRESS
from adafruit_stmpe610 import Adafruit_STMPE610_SPI
import adafruit_ili9341
import adafruit_sdcard
import digitalio
import displayio
import neopixel
import storage
import board
import time
import os
import busio
import time

import adafruit_rfm9x

from analogio import AnalogIn
from adafruit_display_text.label import Label
from adafruit_display_shapes.rect import Rect

import terminalio
import gc

# spotsu lora unit

# Optional Qwiic test
try:
    import adafruit_pct2075
except Exception as e:
    print('Skipping Qwiic test,', e)

all_passed = True

# ui dimensions
header = 16
margin = 0
border = 0

# Release any resources currently in use for the displays
displayio.release_displays()

spi = board.SPI()
tft_cs = board.D9
tft_dc = board.D10
touch_cs = board.D6
sd_cs = board.D5
neopix_pin = board.D11

display_bus = displayio.FourWire(spi, command=tft_dc, chip_select=tft_cs)
display = adafruit_ili9341.ILI9341(display_bus, width=320, height=240)


#battery voltage reader
vbat_voltage = AnalogIn(board.VOLTAGE_MONITOR)

# Define radio parameters.
RADIO_FREQ_MHZ = 915.0  # Frequency of the radio in Mhz. Must match your
# module! Can be a value like 915.0, 433.0, etc.

# Define pins connected to the chip, use these if wiring up the breakout according to the guide:
CS = digitalio.DigitalInOut(board.D13)
RESET = digitalio.DigitalInOut(board.D12)

# Initialze RFM radio
rfm9x = adafruit_rfm9x.RFM9x(spi, CS, RESET, RADIO_FREQ_MHZ)

# Note that the radio is configured in LoRa mode so you can't control sync
# word, encryption, frequency deviation, or other settings!

# You can however adjust the transmit power (in dB).  The default is 13 dB but
# high power radios like the RFM95 can go up to 23 dB:
rfm9x.tx_power = 23

# Send a packet.  Note you can only send a packet up to 252 bytes in length.
# This is a limitation of the radio packet size, so if you need to send larger
# amounts of data you will need to break it into smaller send calls.  Each send
# call will wait for the previous one to finish before continuing.

i2c = board.I2C()
kbd = BBQ10Keyboard(i2c)

splash = displayio.Group(max_size=25)
display.show(splash)

# background


def bg_stripe(x, color):
    width = display.width
    color_bitmap = displayio.Bitmap(width, 240, 1)
    color_palette = displayio.Palette(1)
    color_palette[0] = color
    bg_sprite = displayio.TileGrid(
        color_bitmap, x=x*width, y=0, pixel_shader=color_palette)
    splash.append(bg_sprite)


bg_stripe(0, 0x000000)

# output rect
output_rect = Rect(margin, margin, display.width-margin*2, display.height -
                   margin*2-header-margin, fill=0x000000, outline=0x000000)
splash.append(output_rect)

# output header
header_rect = Rect(margin + border, margin+border,
                   display.width-(margin+border)*2+10, header, fill=0xe5065c)
splash.append(header_rect)


def get_voltage(pin):
    return (pin.value * 3.3) / 65536 * 2


battery_voltage = get_voltage(vbat_voltage)
battery_level = "{:.2f}".format(battery_voltage)

header_text = Label(terminalio.FONT, text="  spotsu lora                               Bat:" + battery_level,
                    x=margin * 2+border, y=int(margin+border+header/2), color=0xFFFFFF)
splash.append(header_text)

# output text
p = displayio.Palette(2)
p.make_transparent(0)
p[1] = 0xFFFFFF

w, h = terminalio.FONT.get_bounding_box()
tilegrid = displayio.TileGrid(terminalio.FONT.bitmap, pixel_shader=p, x=margin*2+border, y=int(
    margin+border+header+margin/2), width=48, height=15, tile_width=w, tile_height=h)
term = terminalio.Terminal(tilegrid, terminalio.FONT)
splash.append(tilegrid)

# input textarea
input_rect = Rect(margin, display.height-header-3,
                  display.width, header, fill=0x000000, outline=0x000000)
splash.append(input_rect)

# input text
input_text = Label(terminalio.FONT, text='', x=margin*2+border,
                   y=int(display.height-margin-border-header*0.7), color=0xFFFFFF, max_glyphs=50)
splash.append(input_text)

# carret
carret = Rect(input_text.x + input_text.bounding_box[2] + 1, int(
    display.height-margin-header/2-header/4), 1, header//2, fill=0xFFFFFF)
splash.append(carret)

rfm9x.send(bytes("spotsu online - commlink open\r\n", "utf-8"))
term.write("spotsu online - commlink open\r\n")


carret_blink_time = time.monotonic()
carret_blink_state = True

bat_refresh_time = time.monotonic()
bat_refresh_state = True

pixels = neopixel.NeoPixel(neopix_pin, 1)

run = 1

while True:
    packet = None
    packet = rfm9x.receive()
    pixels[0] = [0, 0, 0]

    if packet is None:
        pixels[0] = [0, 0, 0]
        kbd.backlight = 0.5
    else:
        # Received a packet!
        pixels[0] = 0xe5065c
        pixels.brightness = 0.05
        # Print out the raw bytes of the packet:
        #print("Received (raw bytes): {0}".format(packet))
        # And decode to ASCII text and print it too.  Note that you always
        # receive raw bytes and need to convert to a text format like ASCII
        # if you intend to do string processing on your data.  Make sure the
        # sending side is sending ASCII data before you try to decode!
        try:
            packet_text = str(packet, "ascii")
        except:
            packet_text = "incoming non-ascii message"
        rssi = rfm9x.last_rssi

        term.write("{0}".format(
            packet_text) + "\n \r".format(rssi))

        if packet_text == "hello":
            print("hello")

        # Also read the RSSI (signal strength) of the last received message and
        # print it.

        # Carret blink animation
    if time.monotonic() - carret_blink_time >= 0.01:
        if carret_blink_state:
            splash.remove(carret)
        else:
            splash.append(carret)

        carret_blink_state = not carret_blink_state
        carret_blink_time = time.monotonic()

    # Process keyboard
    while kbd.key_count > 0:
        k = kbd.key
        if k[0] == STATE_PRESS:
            if k[1] == '\x06':
                term.write('L1 pressed')
            if k[1] == '\x08':  # Backspace
                if len(input_text.text) > 0:
                    input_text.text = input_text.text[:-1]
            elif k[1] == '\n':
                text = 'spotsu:' + input_text.text
                rfm9x.send(bytes(text, "utf-8"))
                term.write(text.encode('utf-8') + '\n \r')

                input_text.text = ''
            else:  # Anything else, we add to the text field
                input_text.text += k[1]

            carret.x = input_text.x + input_text.bounding_box[2] + 1

    if time.monotonic() - bat_refresh_time >= 10:
        if bat_refresh_state:
            battery_voltage = get_voltage(vbat_voltage)
            battery_level = "{:.2f}".format(battery_voltage)
            header_text.text = str(
                "  spotsu lora                               Bat:" + battery_level)
        bat_refresh_state = not bat_refresh_state
        bat_refresh_time = time.monotonic()

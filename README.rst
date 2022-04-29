MSG Lab
=============
.. image:: https://nars-bucket.s3.amazonaws.com/msg_dark_3efdec5da7.png

`msglab.co <https://msglab.co>`__ \| `MSG Cyberdeck <#msg-cyberdeck>`__ \|
`LoRa MSG <#lora-msg>`__

Intro
------------------
Thanks for checking my Git!
I am a DIY hobbyist assembling cyberdecks and electronics on my spare time.
I do most of my project loogging on my site: <https://www.msglab.co>, but I plan on using this Git to share code I
use to power some of my creations.


**Warning**
------------------
The code is provided as is, it is not of any quality and it consists mainly of mash ups of the examples provided by the part vendors.
Use it as your own risk. Also, I am only providing the files I modified. You will need to download all the dependencies and libraries
from the pages of the vendors.

MSG Cyberdeck
------------------

The MSG Cyberdeck `https://www.msglab.co/project/msg-cyberdeck-v2 <https://www.msglab.co/project/msg-cyberdeck-v2>`_ is a deck with enough tricks under the hood to be your daily driver for computing,
hacking, learning and experimenting. Since it is a 3D printed DIY build, repairs and upgrades are core
to the MSG capabilities.

The MSG uses some Python to run the eInk screen, which displays the logo on top and a few stats on the bottom: Pi temperature, battery level, voltage and time.
It also uses a bit of code to run the MicroDot Phat. All the code can be found in the `MSG Cyberdeck folder <https://github.com/msglab/msglab/tree/main/MSG-Cyberdeck>`__ of this repo.

LoRa MSG
------------------

LoRa MSG information page: `https://www.msglab.co/project/lo-ra-msg <https://www.msglab.co/project/lo-ra-msg>`_. 
Since I learned about LoRa I was curious about getting a communicator. I always liked walkie-talkies, and given that
I go camping a few times a year, having the ability to communicate in remote areas with people nearby would be handy. With that as my motivation I started to explore
the ways to leverage LoRa devices to put together a communicator tool.

The current version of the LoRa MSG uses CircuitPython, I am working on an Arduino version that should be more capable. In the meantime, the code can be found in the `LoRa MSG folder 
<https://github.com/msglab/msglab/tree/main/LoRA-MSG>`__ of this repo.


`Back to Top <#msg-lab>`__

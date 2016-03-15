import serpent
from pyethapp import pyethereump
from sha3 import sha3_256
import sys
import struct
import binascii
import pytest

serpent_code = "lottery.se"

s = tester.state()
c = s.abi_contract(serpent_code)


tobytearr = lambda n, L: [] if L == 0 else tobytearr(n / 256, L - 1)+[n % 256]
